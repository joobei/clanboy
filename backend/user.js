const mongoose = require("mongoose")
var userSchema = new mongoose.Schema({
  discord_id: String,
  display_username: String, //actual username if user in discord
  fetched_at: Date, 
  discord_username: String,
  discord_discriminator: String,
  discord_access_token: String,
  discord_avatar: String,
  discord_guild_roles: [String],
  joined_at: Date  //when did this user join Deemos
});

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
module.exports = mongoose.model("User", userSchema);