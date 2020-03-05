const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgressSchema = new Schema({
    goal: {
        type: Schema.Types.ObjectId,
        ref: "goal"
    },
    title: {
        type: String,
        required: true
    },
    time: {
        
    }
})

module.exports = mongoose.model("progress", ProgressSchema);