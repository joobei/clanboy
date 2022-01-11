const express = require("express"),
  app = express(),
  oauthRoute = require("./routes/oauthRoute"),
  authRoute = require("./routes/authRoute"),
  matchRoute = require("./routes/matchRoute"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  express_session = require("express-session");

require("./models/user");

const Strategy = require('@qgisk/passport-discord').Strategy;

const scopes = ["identify"];
const prompt = "consent";

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new Strategy({
    clientID: '919917579844349952',
    clientSecret: '44c9c57c84fc42d78ac4cac393f4e79a06df6ae55980da1b024202430abf5523',
    callbackURL: 'https://localhost:8080/discord',
    scope: scopes,
    prompt: prompt,
},
(accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ discordId: profile.id }, (err, user) => {
        return cb(err, user);
    });
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var fs = require('fs');
const connectionString = fs.readFileSync("backend/key.txt", 'utf8');
const cors = require('cors');

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(auth.initialize());
// Passport Config
// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use(oauthRoute);
app.use(authRoute);
app.use(matchRoute);
app.use(passport.initialize());
app.use(passport.session());
app.use(express_session({
  resave: false,
  saveUninitialized: true,
  secret: 's3t3c4$7r0n0my'
}));

app.listen(5000, () => {
  console.log("Server Started at 5000");
});