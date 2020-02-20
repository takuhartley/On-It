const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goalSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  hours: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Goal', goalSchema);