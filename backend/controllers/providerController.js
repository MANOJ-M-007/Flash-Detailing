const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Provider = require('../models/providerModel')
const Order = require('../models/orderModel')

const { cloudinary } = require('../config/cloudinaryConfig')

const toVerify = asyncHandler(async (req, res) => {
    uid = req.user.toString();
    const {
        location,
        address,
        city,
        state,
        pin,
        country,
        washMethod,
        describe,
        suv,
        sedan,
        hatchback,
        aadhar,
        profile
    } = req.body

    const image1 = await cloudinary.uploader.upload(aadhar, {
        folder: "aadhar",
    });
    const image2 = await cloudinary.uploader.upload(profile, {
        folder: "profile pic",
    });
    const user = await User.findById(uid)
    if (user.role === 'user') {
        user.location = location;
        user.serviceType = washMethod; // Update the user's location field
        user.address.addressName = address;
        user.address.city = city;
        user.address.state = state;
        user.address.pin = pin;
        user.address.country = country;
        await user.save(); // Save the updated user object
        const providerReq = new Provider({
            user: uid,
            experience: describe,
            suv: suv,
            sedan: sedan,
            hatchback: hatchback,
            aadhar: {
                public_id: image1.public_id,
                url: image1.secure_url
            },
            profile: {
                public_id: image2.public_id,
                url: image2.secure_url
            },
        })
        await providerReq.save();
        await User.findByIdAndUpdate(uid, { role: 'verify' })
        res.json({
            id: providerReq.user,
            location: providerReq.location
        })
    } else {
        res.status(404);
        throw new Error("Not a User!");
    }
})

const profileDatas = asyncHandler(async (req, res) => {
    const userId = req.user.toString();
    const user = await User.findById(userId)
    const provider = await Provider.findOne({ user: userId });

    const combinedData = provider
        ? { ...user.toObject(), ...provider.toObject() }
        : user.toObject();
    res.json(combinedData);
})

const orderList = asyncHandler(async (req, res) => {
    const provider = await Provider.findOne({ user: req.user });
    const orders = await Order.find({ providerId: provider._id })
        .populate({
            path: 'userId',
            select: 'name email mobile location address.addressName address.city address.state address.pin address.country',
            model: 'User'
        }) // Populate user details with only 'username' field from User model
        .populate({
            path: 'providerId',
            select: 'user profile', // Include the 'profile' field in the select statement
            populate: {
                path: 'user',
                select: 'name',
                model: 'User'
            },
            model: 'Provider'
        })
        .select('-__v')
        .sort({ createdAt: -1 })
        .exec();
    res.json(orders);
});

const orderComplete = asyncHandler(async (req, res) => {
    const orderStatus = await Order.findByIdAndUpdate(req.body.Oid, { status: "completed" })
    const admin = await User.findOne({ isAdmin: true });
    const order = await Order.findById({ _id: req.body.Oid });
    const OrderTotal = order.total;
    const adminPayment = OrderTotal * 0.05
    const providerPayment = OrderTotal - adminPayment;
    await User.findByIdAndUpdate(admin._id, { $inc: { income: adminPayment, hold: -OrderTotal } });
    await User.findByIdAndUpdate(req.user, { $inc: { income: providerPayment } });
    res.json(orderStatus)
})

const ordersGraph = asyncHandler(async (req, res) => {
    try {
        const provider = await Provider.findOne({ user: req.user });
        const orders = await Order.find({ providerId: provider._id }, { date: 1, total: 1 })
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
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = {
    toVerify,
    profileDatas,
    orderList,
    orderComplete,
    ordersGraph
}