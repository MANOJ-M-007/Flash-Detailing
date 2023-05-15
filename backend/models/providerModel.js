const mongoose = require('mongoose')

const providerSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        experience: {
            type: String,
            require: true,
        },
        suv: {
            type: Number,
            required: true,
        },
        sedan: {
            type: Number,
            required: true,
        },
        hatchback: {
            type: Number,
            required: true,
        },
        aadhar: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        },
        profile: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        },
        comments: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            content: String,
            createdAt: {
                type: Date,
                immutable: true,
                default: () => Date.now()
            }
        }]
    },
    {
        timestamps: true,
    }
)
const Provider = mongoose.model('Provider', providerSchema)
module.exports = Provider;