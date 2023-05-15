const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  providerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Provider',
    required: true
  },
  service: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  status: {
    type: String,
    default: 'Booked'
  },
},
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
