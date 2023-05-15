const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema(
    {
        serviceName: {
            type: String,
            required: true,
        },
        serviceDetails: {
            type: String,
            required: true,
        },
        image: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        },
        isBlocked: {
            type: Boolean,
            required: true,
            default: false,
        }
    }
)

const Service = mongoose.model('Service', serviceSchema)
module.exports = Service
