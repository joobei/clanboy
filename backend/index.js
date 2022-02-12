require("dotenv").config();

const express = require("express"),
  session = require("express-session"),
  passport = require("passport"),
  Strategy = require("@qgisk/passport-discord").Strategy,
  app = express(),
  bodyParser = require('body-parser')

let userModel = require("./user.js")
let Match = require("./match")

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());

app.use(function (req, res, next) {
  req.socket.on("error", function () {

  });
  res.socket.on("error", function () {

  });
  next()
})

//these will need to be configured in .env
const {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
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

app.get("/auth/discord/callback", passport.authenticate("discord"),
  (_req, res) => {
    const in_discord = _req.user.guilds.find(x => x.name === MY_CLAN_NAME)
    // console.log("In discord" + in_discord)
    if (in_discord) {
      console.log("User is in our discord.");
      let user = {
        discordId: _req.user.id,
        discordUsername: _req.user.username,
        discordAccessToken: _req.user.accessToken,
        discordAvatar: _req.user.avatar,
        discordDiscriminator: _req.user.discriminator,
        discordGuildRole: "Democrat", //todo read actual role!
        fetchedAt: _req.user.fetchedAt
      }
      userModel.findOneAndUpdate({ discordId: _req.user.id }, user, {
        upsert: true,
        new: true
      }, (err, doc) => {
        if (err) {
          console.log(err)
        }
        else {
          console.log("Updated User : ", doc);
          res.status(200).json({
            username: doc.discordUsername + '#' + doc.discordDiscriminator,
            discord_id: doc.discordId,
            token: doc.discordAccessToken
          });
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
)

const checkAuth = (req, res, next) => {
  // console.log(req.headers.authorization)
  const header = req.headers.authorization.split(" ")[1]
  let found = userModel.findOne({ discordAccessToken: header })
  if (found) {
    next();
  }
  else {
    return res.status(403).json({ error: 'No credentials sent!' });
  }
};

app.get("/matches", (req, res) => {
  Match.find({}, (error, result) => {
    res.json(result)
  })
})

app.post('/signup', checkAuth, (req, res) => {
  const match_id = req.body.match_id
  Match.findById(match_id, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else {
      // console.log("Result : ", docs.players.find);
      if (docs.players.includes(req.body.discord_id)) {
        res.status(200).json({ 'response': 'already' })
      }
      else {
        docs.players.push(req.body.discord_id)
        Match.findByIdAndUpdate(match_id, docs, function (err, newdoc) {
          if (err) {
            console.log(err);
          }
          else {
            console.log(newdoc)
          }
        })

        res.status(200).json({ 'response': 'signed_up' })
      }
    }
  });
})

app.listen(LISTEN_PORT, (err) => {
  if (err) return console.log(err);

  console.log(`Listening at port ${LISTEN_PORT}`);
});
