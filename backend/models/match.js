const mongoose = require("mongoose")

const matchSchema = new mongoose.Schema({
    _id: String,
    vs: String,
    map: String,
    date: Date,
    slots: Number,
    players: [String],
    side: String,
    outcome: Boolean
});

module.exports = mongoose.model("Match", matchSchema);