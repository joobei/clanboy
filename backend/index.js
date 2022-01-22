require("dotenv").config();

const express = require("express"),
  session = require("express-session"),
  passport = require("passport"),
  Strategy = require("@qgisk/passport-discord").Strategy,
  app = express()

let userModel = require("./user.js")

app.use(function (req, res, next) {
  req.socket.on("error", function () {

  });
  res.socket.on("error", function () {

  });
  next()
})

const {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  VUE_APP_BASE_URL,
  VUE_APP_API_BASE_URL,
  LISTEN_PORT,
  SESSION_SECRET,
  MY_CLAN_NAME
} = process.env;

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

const scopes = ["identify", "email", "guilds"];
const prompt = "consent";

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.send("not logged in :(");
};

passport.use(
  new Strategy(
    {
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: VUE_APP_API_BASE_URL + '/auth/discord',
      scope: scopes,
      prompt: prompt,
    },
    function (_accessToken, _refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Find user in database
//if not, create him


app.get("/auth/discord/callback", passport.authenticate("discord"),
  (_req, res) => {
    const in_discord = _req.user.guilds.find(x => x.name === MY_CLAN_NAME)
    // console.log("In discord" + in_discord)
    if (in_discord) {
      console.log("User is in our discord.");
      const user = new userModel({
        discordId: _req.user.id,
        discordUsername: _req.user.name,
        discordAccessToken: _req.user.accessToken,
        discordAvatar: _req.user.avatar,
        discordDiscriminator: _req.user.discriminator,
        discordGuildRole: null,
        fetchedAt: _req.user.fetchedAt
      })
      userModel.findOneAndUpdate(user, { upsert: true, new:true }, (err, docs) => {
        if (err) {
          console.log(err)
        }
        else {
          console.log("Updated User : ", docs);
          res.status(200).json(docs);
        }
      })
      return;
    }
    else {
      res.status(200).json({ 'response': 'not my user' });
      console.log("Not my user!!");
      return;
    }
  }
);


app.listen(LISTEN_PORT, (err) => {
  if (err) return console.log(err);

  console.log(`Listening at port ${LISTEN_PORT}`);
});
