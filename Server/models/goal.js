const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  hours: { 
    type: String, 
    required: true 
  },
  user: { 
    type: mongoose.Types.ObjectId, required: true 
  }
});

module.exports = mongoose.model("Goal", GoalSchema);
