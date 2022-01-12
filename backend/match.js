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

var express = require("express");
var router = express.Router();
var matchController = require("./matchController");
var auth = require("../middleware/auth")();
router.get("/matches", auth.authenticate(), matchController.get_matches);

const Match = require("./match")

exports.get_matches = async function (req, res) {
  res.send(await Match.find());
};

module.exports = router;