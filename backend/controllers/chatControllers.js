const Chat = require('../models/chatModel')
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Provider = require('../models/providerModel');

const createChat = asyncHandler(async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;
  let chat = await Chat.findOne({
    $and: [
      { members: { $elemMatch: { $eq: senderId } } },
      { members: { $elemMatch: { $eq: receiverId } } }
    ]
  });
  if (chat) {
    // If a chat already exists, return the existing chat object
    return res.status(200).json(chat);
  }
  // If a chat doesn't exist, create a new one
  const newChat = new Chat({
    members: [senderId, receiverId]
  });
  const result = await newChat.save();
  res.status(200).json(result);
});


const userChat = asyncHandler(async (req, res) => {
  const { id, receiverId } = req.params;
  try {
    const chat = await Chat.find({
      members: [id, receiverId].sort()
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
})

const findChat = asyncHandler(async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] }
    })
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
})


const getUsers = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const provider = await Provider.findOne({ user: req.params.id });
    const combinedData = provider ? { ...user.toObject(), ...provider.toObject() } : user.toObject();
    res.status(200).json(combinedData)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = {
  createChat,
  userChat,
  findChat,
  getUsers
}