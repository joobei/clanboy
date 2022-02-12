const mongoose = require("mongoose")
var userSchema = new mongoose.Schema({
  discordId: String,
  discordUsername: String,
  displayUsername: String,
  discordAccessToken: String,
  discordAvatar: String,
  discordDiscriminator: String,
  discordGuildRole: String,
  fetchedAt: Date
});

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
module.exports = mongoose.model("User", userSchema);