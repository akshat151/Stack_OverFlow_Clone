const uuid = require("uuid");
const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuid.v4(),
    },
    comment: {
      type: String,
    },
    comment_by: {
      type: String,
    },
    comment_date_time: {
      type: Date,
      default: () => new Date(),
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", commentsSchema);
