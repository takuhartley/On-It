const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
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
  time: {
    type: String,
    required: true
  },
  from: {},
  to: {},
  completed: false
});

module.exports = mongoose.model("post", PostSchema);
