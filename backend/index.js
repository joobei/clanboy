require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const Strategy = require("@qgisk/passport-discord").Strategy;
const app = express();

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_CALLBACK, LISTEN_PORT, SESSION_SECRET } = process.env;

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

const scopes = ["identify","email","guilds"];
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
      callbackURL: DISCORD_CALLBACK,
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
app.get(
  "/auth/discord",
  passport.authenticate("discord", { scope: scopes, prompt: prompt })
);

app.get("/auth/discord/callback",passport.authenticate("discord", { failureRedirect: "/" }),
  (_req, res) => {
    res.send(_req.user)
    // res.redirect("/info");
  }
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/info", checkAuth, (req, res) => {
  // console.log(req.user)
  res.json(req.user);
});

app.listen(LISTEN_PORT, (err) => {
  if (err) return console.log(err);

  console.log(`Listening at port ${LISTEN_PORT}`);
});
