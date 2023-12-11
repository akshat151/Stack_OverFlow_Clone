// Answer Document Schema

const uuid = require('uuid')
const mongoose = require('mongoose')


// Schema to store all answers

const answersSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuid.v4(),
        },
        text: {
            type: String,
            required: true,
        },
        ans_by: {
            type: String,
            required: true,
        },
        ans_date_time: {
            type: Date,
            default: () => new Date()
        },
        comments: [
            {
                type: String,
            },
        ],
        votes: {
            type: Number,
            default: 0,
        },
        voteType: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('answer', answersSchema);