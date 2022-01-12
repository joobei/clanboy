const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
  discordId: String,
  discordName: String
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);