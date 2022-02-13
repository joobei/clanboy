require("dotenv").config();

const express = require("express"),
  session = require("express-session"),
  passport = require("passport"),
  Strategy = require("@qgisk/passport-discord").Strategy,
  app = express(),
  bodyParser = require('body-parser')

let userModel = require("./user.js")
let Match = require("./match");
const { default: axios } = require("axios");

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
  (_req, _res) => {
    const in_discord = _req.user.guilds.find(x => x.name === MY_CLAN_NAME)
    // console.log("In discord" + in_discord)
    if (in_discord) {
      //first fetch nickaname he uses in the guild
      return axios.get(`https://discord.com/api/users/@me/guilds/911623996682932254/member`,
        { headers: { "Authorization": `Bearer ${_req.user.accessToken}` } }
      ).then(res => {
//         koc : 912032854987403264
// supreme court member: 912032986294255646
// legislator: 912033087255380008
// democrat: 912034805762363473
// aspiring: 931870587599601735
// friend: 912035056166527026
        console.log(res.data.roles)
        const is_democrat = res.data.roles.find(role => role === '912034805762363473')
        if (is_democrat) {
          // console.log(res)
          let user = {
            discord_id: _req.user.id,
            display_username: res.data.nick,
            discord_username: _req.user.username,
            discord_access_token: _req.user.accessToken,
            discord_avatar: _req.user.avatar,
            discord_discriminator: _req.user.discriminator,
            discord_guild_roles: res.data.roles,
            fetched_at: _req.user.fetchedAt,
            joined_at: res.data.joined_at
          }
          userModel.findOneAndUpdate({ discord_id: _req.user.id }, user, {
            upsert: true,
            new: true
          }, (err, doc) => {
            if (err) {
              console.log(err)
            }
            else {
              console.log("Updated User : ", doc);
              _res.status(200).json({
                username: doc.display_username,
                discord_id: doc.discord_id,
                token: doc.discord_access_token
              });
            }
          })
          return
        }
        else {
          return _res.status(401).json({ 'message': 'You are not a "Democrat"' })
        }
      }
      ).catch(err => console.log(err)) //axios user guild object 
    }
    else {
      return _res.status(401).json({ 'message': 'You are not a member of Deemos Discord' })
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
        res.status(200).json({ 'response': 'You are already signed up for this match!' })
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

        res.status(200).json({ 'response': 'Thank you for signing up!' })
      }
    }
  });
})

app.listen(LISTEN_PORT, (err) => {
  if (err) return console.log(err);

  console.log(`Listening at port ${LISTEN_PORT}`);
});
