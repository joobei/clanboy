const express = require("express"),
  app = express(),
  authRoute = require("./routes/authRoute"),
  matchRoute = require("./routes/matchRoute"),
  auth = require('./middleware/auth.js')(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  User = require("./models/user"),
  bodyParser = require("body-parser");
const express_session = require("express-session");

app.use(express_session({
  resave: false,
  saveUninitialized: true,
  secret: 's3t3c4$7r0n0my'
}));
var fs = require('fs');
const connectionString = fs.readFileSync("backend/key.txt", 'utf8');
const cors = require('cors');

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.initialize());
// Passport Config
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRoute);
app.use(matchRoute);


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
if (process.env.VUE_APP_API_BASE_URL !== 'production') {
  app.use(cors({
    credentials: true,
  }));
}

app.listen(5000, () => {
  console.log("Server Started at 5000");
});