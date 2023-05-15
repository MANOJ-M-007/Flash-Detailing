const mongoose = require('mongoose')
const locationSchema = mongoose.Schema(
    {
        location: {
            type: String,
            required: true,
        },
        isBlocked: {
            type: Boolean,
            required: true,
            default: false,
        }
    }
)
const Location = mongoose.model('Location', locationSchema)
module.exports = Location
