const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  // Reference to user model
  creator: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  dura: {
    type: String,
    required: true
  },
  from: {
    type: Date
  },
  to: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  },
  progress: [
    {
      text: {
        type: String,
        required: true
      },
      summary: {
        type: String,
        required: true
      },
      hours: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      creator: {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ]
});

module.exports = Post = mongoose.model("post", PostSchema);
