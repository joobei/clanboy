const mongoose = require("mongoose")
var userSchema = new mongoose.Schema({
  discordId: String,
  discordUsername: String,
  discordAccessToken: String,
  discordAvatar: String,
  discordDiscriminator: String,
  discordGuildRole: String,
  fetchedAt: Date
});

mongoose.connect('mongodb://127.0.0.1:27017/deemos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
module.exports = mongoose.model("User", userSchema);