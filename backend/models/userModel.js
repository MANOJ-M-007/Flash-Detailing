const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    mobile: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    address: {
      addressName: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pin: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    serviceType: {
      type: String,
    },
    income: {
      type: Number,
      default: 0,
    },
    hold: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  },
)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}


const User = mongoose.model('User', userSchema)
module.exports = User;
