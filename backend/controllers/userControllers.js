const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../util/generateToken')
const Service = require('../models/serviceModel')
const Location = require('../models/locationModel')
const Provider = require('../models/providerModel')
const Order = require('../models/orderModel')
const stripe = require('stripe')('sk_test_51Mx3EVSGyTtRFghzERyozdiJU6B2CDC0S2Jx7I2trUsCuDiPou9CaLuTgMdb87xUis8areUSN0n6xpSqITpvBnH1002ofXglXf');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('user Already Exists')
  }
  const user = await User.create({
    name,
    email,
    mobile,
    password,
  })
  if (user) {
    res.status(201).json({
      name,
      email,
      mobile,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Eror('Error Occured!')
  }
})

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    if (user.isAdmin === false) {
      if (user.isBlocked == false) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        })
      } else {
        res.status(400)
        throw new Error('Blocked by Admin!')
      }
    } else {
      res.status(400)
      throw new Error('You Are Admin!')
    }
  } else {
    res.status(400)
    throw new Error('Invalid email or password!')
  }
})

const listServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ isBlocked: false });
  res.json(services)
})

const listLocations = asyncHandler(async (req, res) => {
  const locations = await Location.find({ isBlocked: false });
  res.json(locations)
})

const userLocationServices = asyncHandler(async (req, res) => {
  const selectedLocation = req.params.selectedLocation;

  if (selectedLocation != 'null') {
    const providerServices = await User.find({ role: 'provider', location: selectedLocation }).distinct("serviceType");
    const services = await Service.find({ serviceName: { $in: providerServices } });
    res.json(services)
  } else {
    const services = await Service.find({ isBlocked: false })
    res.json(services)
  }
})

const bookingProvidersList = asyncHandler(async (req, res) => {
  const selectedLocation = req.params.selectedLocation;

  if (selectedLocation != 'null') {
    const userData = await User.find({ role: 'provider', location: selectedLocation });
    const providerData = await Provider.find().populate({
      path: 'comments.user',
      select: 'name',
    });
    const orderData = await Order.find();

    const combinedData = userData.map(user => {
      const provider = providerData.find(provider => provider.user.toString() === user._id.toString());
      if (provider) {
        const orders = orderData.filter(order => order.providerId.toString() === provider._id.toString());
        return { ...user.toObject(), ...provider.toObject(), orders };
      }
    });
    res.json(combinedData);
  } else {
    const userData = await User.find({ role: 'provider' });
    const providerData = await Provider.find().populate({
      path: 'comments.user',
      select: 'name',
    });
    const orderData = await Order.find();

    const combinedData = userData.map(user => {
      const provider = providerData.find(provider => provider.user.toString() === user._id.toString());
      if (provider) {
        const orders = orderData.filter(order => order.providerId.toString() === provider._id.toString());
        return { ...user.toObject(), ...provider.toObject(), orders };
      }
    });
    res.json(combinedData);
  }
});


const userDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.toString())
  res.json(user)
})

const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.toString())
  const Data = req.body
  if (user) {
    user.address.addressName = Data.addressName;
    user.address.city = Data.city;
    user.address.state = Data.state;
    user.address.pin = Data.pin;
    user.address.country = Data.country;
    const updatedUser = await user.save();
    res.json(updatedUser)
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
})

const editProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.toString())
  const Data = req.body
  if (user) {
    user.name = Data.name2 || user.name
    user.email = Data.email2 || user.email
    user.mobile = Data.mobile2 || user.mobile
    if (Data.password2) {
      user.password = Data.password2;
    }
    // user.location = Data.location||user.location
    user.address.addressName = Data.addressName2 || user.address.addressName;
    user.address.city = Data.city2 || user.address.city;
    user.address.state = Data.state2 || user.address.state;
    user.address.pin = Data.pin2 || user.address.pin;
    user.address.country = Data.country2 || user.address.country;
    const updatedUser = await user.save();
    res.json(updatedUser)
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
})

const searchBanner = asyncHandler(async (req, res) => {
  const selectedService = req.body.test;
  const selectedLocation = req.body.selectedLocation;
  if (selectedLocation != 'null') {
    const userData = await User.find({ role: 'provider', location: selectedLocation, serviceType: selectedService })
    const providerData = await Provider.find().populate({
      path: 'comments.user',
      select: 'username',
    });
    const orderData = await Order.find();
    const combinedData = userData.map(user => {
      const provider = providerData.find(provider => provider.user.toString() === user._id.toString())
      if (provider) {
        const orders = orderData.filter(order => order.providerId.toString() === provider._id.toString());
        return { ...user.toObject(), ...provider.toObject(), orders };
      }
    })
    res.json(combinedData);
  } else {
    const userData = await User.find({ role: 'provider', serviceType: selectedService })
    const providerData = await Provider.find().populate({
      path: 'comments.user',
      select: 'username',
    });
    const orderData = await Order.find();
    const combinedData = userData.map(user => {
      const provider = providerData.find(provider => provider.user.toString() === user._id.toString())
      if (provider) {
        const orders = orderData.filter(order => order.providerId.toString() === provider._id.toString());
        return { ...user.toObject(), ...provider.toObject(), orders };
      }
    })
    res.json(combinedData);
  }
})


const paymentRequest = asyncHandler(async (req, res) => {
  const total = req.body.amount
  const payment = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: 'inr'
  })
  res.status(201).send({
    clientSecret: payment.client_secret,
  })
})

const createOrder = asyncHandler(async (req, res) => {
  const Data = req.body;
  const { userId, providerId, service, vehicle, date, time, total } = req.body
  const orderData = new Order({
    userId: userId,
    providerId: providerId,
    service: service,
    vehicleType: vehicle,
    date: date,
    time: time,
    total: total
  })
  await orderData.save()
  const admin = await User.findOne({ isAdmin: true })
  admin.hold += total;
  await admin.save();
  res.json({

  })
})

const listOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user })
    .populate({
      path: 'userId',
      select: 'name ',
      model: 'User'
    }) // Populate user details with only 'username' field from User model
    .populate({
      path: 'providerId',
      select: 'user profile experience comments', // Include the 'profile' field in the select statement
      populate: {
        path: 'user',
        select: 'name email mobile location address.addressName address.city address.state address.pin address.country',
        model: 'User'
      },
      model: 'Provider'
    })
    .select('-__v') // Exclude the '__v' field
    .sort({ createdAt: -1 })
    .exec();
  res.json(orders)
})

const addComment = asyncHandler(async (req, res) => {
  const userId = req.user
  const providerId = req.body.provider
  const comment = req.body.comment

  // Check if user has already written a comment for the provider
  const provider = await Provider.findOne({
    _id: providerId,
    'comments.user': userId,
  });

  if (provider) {
    return res.status(200).send({
      message: 'User has already written a comment for this provider',
    });
  }

  // Find the provider by ID and update the comments array
  const updatedProvider = await Provider.findByIdAndUpdate(providerId, {
    $push: {
      comments: {
        user: userId,
        content: comment,
      },
    },
  })
  res.status(201).send({
    messageSuccess: 'success'
  })

})

module.exports = {
  registerUser,
  authUser,
  listServices,
  listLocations,
  userLocationServices,
  bookingProvidersList,
  userDetails,
  addAddress,
  editProfile,
  searchBanner,
  paymentRequest,
  createOrder,
  listOrder,
  addComment
}
