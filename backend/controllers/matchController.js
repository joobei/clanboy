const Match = require("../models/match")

exports.get_matches = async function (req, res) {
  res.send(await Match.find());
};