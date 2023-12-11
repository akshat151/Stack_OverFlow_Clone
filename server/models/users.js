// User document Schema

const uuid = require('uuid')
const mongoose = require('mongoose')

// schema to store all users

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuid.v4(),
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        reputation: {
            type: Number,
            required: true,
            default: 0,
        },
        registration_date_time: {
            type: Date,
          },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Users', userSchema)