const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgressSchema = new Schema({
    goal: {
        type: Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: true
    },
    time: {
        // in minutes to hours
    }
})

module.exports = mongoose.model("Progress", ProgressSchema);