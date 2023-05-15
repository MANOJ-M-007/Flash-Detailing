const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../util/generateToken')
const Service = require('../models/serviceModel')
const { cloudinary } = require('../config/cloudinaryConfig')
const Provider = require('../models/providerModel')
const Location = require('../models/locationModel')
const Order = require('../models/orderModel')

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const admin = await User.findOne({ email: email })
  if (admin && (await admin.matchPassword(password))) {
    if (admin.isAdmin) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile,
        token: generateToken(admin._id),
      })
    } else {
      res.status(400)
      throw new Error('User')
    }
  } else {
    res.status(400)
    throw new Error('Invalid email or password!')
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: false, role: 'user' });
  res.json(users);
})

const BlockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.isBlocked = req.body.isBlocked;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      isAdmin: updatedUser.isAdmin,
      isBlocked: updatedUser.isBlocked,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
})

const addService = asyncHandler(async (req, res) => {
  const { name, details, image } = req.body;
  const result = await cloudinary.uploader.upload(image, {
    folder: "services",
  });
  const service = new Service({
    serviceName: name,
    serviceDetails: details,
    image: {
      public_id: result.public_id,
      url: result.secure_url
    }
  })
  await service.save()
  res.json({
    name: Service.serviceName,
    details: Service.serviceDetails,
    image: Service.image
  })
})

const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find();
  res.json(services)
})

const blockService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (service) {
    service.isBlocked = req.body.isBlocked;
    const updateService = await service.save();
    res.json({
      _id: updateService._id,
      serviceName: updateService.serviceName,
      serviceDetails: updateService.serviceDetails,
      isBlocked: updateService.isBlocked
    })
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }

})

const providerDetails = asyncHandler(async (req, res) => {
  const userData = await User.find({ role: 'verify' })
  const providerData = await Provider.find()
  const combinedData = userData.map(user => {
    const provider = providerData.find(provider => provider.user.toString() === user._id.toString())
    if (provider) {
      return { ...user.toObject(), ...provider.toObject() }
    }
  })

  res.json(combinedData);
})

const providerDetailsIndividual = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  const provider = await Provider.findOne({ user: userId });
  const combinedData = provider
    ? { ...user.toObject(), ...provider.toObject() }
    : user.toObject();
  res.json(combinedData);
})

const providerAcceptReject = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  user.role = (req.body.action == 1 ? 'provider' : 'user');
  await user.save();
  return res.status(200).json({ success: true });
})

const providersList = asyncHandler(async (req, res) => {
  const userData = await User.find({ role: 'provider' })
  const providerData = await Provider.find()
  const combinedData = userData.map(user => {
    const provider = providerData.find(provider => provider.user.toString() === user._id.toString())
    if (provider) {
      return { ...user.toObject(), ...provider.toObject() }
    }
  })
  res.json(combinedData);
})

const blockProvider = asyncHandler(async (req, res) => {
  const provider = await User.findById(req.params.id);
  if (provider) {
    provider.isBlocked = req.body.isBlocked;
    const updatedProvider = await provider.save();
    res.json({
      _id: updatedProvider._id,
      name: updatedProvider.name,
      email: updatedProvider.email,
      mobile: updatedProvider.mobile,
      isAdmin: updatedProvider.isAdmin,
      isBlocked: updatedProvider.isBlocked,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
})

const addLocations = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const location = new Location({
    location: name,
  })
  await location.save()
  res.json({
    location: Location.location,
  })
})

const listLocations = asyncHandler(async (req, res) => {
  const Data = await Location.find();
  res.json(Data)
})

const ordersList = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate({
      path: 'userId',
      select: 'name email mobile location address.addressName address.city address.state address.pin address.country',
      model: 'User'
    }) // Populate user details with only 'name' field from User model
    .populate({
      path: 'providerId', // Update the path to 'providerId'
      select: 'name profile experience', // Select only the 'name' field from User model
      populate: { // Populate the 'userId' field in the Provider model
        path: 'user',
        select: 'name email mobile location address.addressName address.city address.state address.pin address.country',
        model: 'User'
      },
      model: 'Provider' // Specify the Provider model
    })
    .select('-__v') // Exclude the '__v' field
    .sort({ createdAt: -1 })
    .exec();

  res.json(orders);
});

const adminInfo = asyncHandler(async (req, res) => {
  const Data = await User.findById({ _id: req.admin._id });
  const userCount = await User.countDocuments({ role: "user" });
  const providerCount = await User.countDocuments({ role: "provider" });
  const serviceCount = await Service.countDocuments({ isBlocked: false });
  const pendingOrders = await Order.countDocuments({status:"Booked"})
  const completedOrders = await Order.countDocuments({status:'completed'})
  const providerRequests = await User.countDocuments({role:'verify'})
  res.json({ Data, userCount, providerCount, serviceCount,pendingOrders, completedOrders,providerRequests })
})

const ordersGraph = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}, { date: 1, total: 1 })
    const data = orders.reduce((acc, order) => {
      const index = acc.findIndex(item => item.date === order.date);
      if (index === -1) {
        acc.push({ date: order.date, total: order.total });
      } else {
        acc[index].total += order.total;
      }
      return acc;
    }, []);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
})

const serviceGraph = asyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    
    {
      $group: {
        _id: '$service',
        count: { $sum: 1 },
        total: { $sum: '$total' },
      },
    },
  ]);
  res.json(orders);
})

module.exports = {
  authAdmin,
  getUsers,
  BlockUser,
  addService,
  getServices,
  blockService,
  providerDetails,
  providerAcceptReject,
  providersList,
  blockProvider,
  providerDetailsIndividual,
  addLocations,
  listLocations,
  ordersList,
  adminInfo,
  ordersGraph,
  serviceGraph
}