var Match = require("../models/match")

exports.get_matches = async function (req, res) {
  const matches = await Match.find();
  res.send(matches);
};