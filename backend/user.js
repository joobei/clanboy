const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
  discordId: String,
  discordUsername: String,
  discordAccessToken: String,
  discordAvatar: String,
  discordDiscriminator: String,
  fetchedAt: Date
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);