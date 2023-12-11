const mongoose = require("mongoose");
const uuid = require("uuid");

const questionsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuid.v4(),
    },
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    askedBy: {
      type: String,
    },
    ask_date_time: {
      type: Date,
      default: () => new Date(),
    },
    answers: [
      {
        type: String,
      },
    ],
    comments: [
      {
        type: String,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    votes: {
      type: Number,
      default: 0,
    },
    last_answer_time: {
      type: Date,
    },
    pinAnswerId: {
      type: String,
    },
    voteType: {
      type: String,
      default:"",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("questions", questionsSchema);
