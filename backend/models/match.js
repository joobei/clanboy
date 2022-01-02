const mongoose = require("mongoose")

var matchSchema = new mongoose.Schema({
    _id: String,
    vs: String,
    map: String,
    date: Date,
    slots: Number,
    players: [String],
    side: String,
    outcome: String
});

module.exports = mongoose.model("Match", matchSchema);