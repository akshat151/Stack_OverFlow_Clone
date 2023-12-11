// Tag Document Schema

const uuid = require('uuid')
const mongoose = require('mongoose')


// Schema to store all tags
const tagsSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: () => uuid.v4(),
      },
      name: {
        type: String,
        required: true,
      },
      tag_added_by: {
        type: String,
      },
      tag_date_time: {
        type: Date,
        default: () => Date(),
      }
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model('tags', tagsSchema);