const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  // Reference to user model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String
  },
  interests: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instragram: {
      type: String
    }
  },
  date: {
      type: Date,
      default: Date.now
  }
});