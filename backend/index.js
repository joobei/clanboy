require("dotenv").config();

//these will need to be configured in .env
const {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  VUE_APP_API_BASE_URL,
  LISTEN_PORT,
  SESSION_SECRET,
  MY_CLAN_NAME,
  CORS_ALLOW_FROM
} = process.env;

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
  res.header("Access-Control-Allow-Headers", "authorization, Origin, X-Requested-With, Content-Type, Accept")
  console.log(req.headers.origin)
  console.log("CORS_ALLOW_FROM variable : "+CORS_ALLOW_FROM)
  res.header("Access-Control-Allow-Origin", CORS_ALLOW_FROM)
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

// koc : 912032854987403264
// supreme court member: 912032986294255646
// legislator: 912033087255380008
// democrat: 912034805762363473
// aspiring: 931870587599601735
// friend: 912035056166527026
const DEMOCRAT_ROLE = '912034805762363473'
const ASPIRING_DEMOCRAT_ROLE = '931870587599601735'
const MY_GUILD_ID = '911623996682932254' //move to env variable


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
      return axios.get(`https://discord.com/api/users/@me/guilds/${MY_GUILD_ID}/member`,
        { headers: { "Authorization": `Bearer ${_req.user.accessToken}` } }
      ).then(res => {

        console.log(res.data.roles)
        const is_democrat = res.data.roles.find(role => (role === DEMOCRAT_ROLE || role === ASPIRING_DEMOCRAT_ROLE))
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
  const header = req.headers.authorization.split(" ")[1]

  userModel.findOne({ discord_access_token: header }, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else {
      req.current_user = docs
      next()
    }
  })
}

const check_permissions = (req, res, next) => {
  const has_role = req.current_user.discord_guild_roles.find(role => (role === DEMOCRAT_ROLE || role === ASPIRING_DEMOCRAT_ROLE))
  if (has_role) {
    next()
  }
  else {
    return res.status(401).json({ 'error': 'Only Democrat or Aspiring Democrat can sign up for matches' })
  }
}

app.get("/matches", (req, res) => {
  Match.find({}, (error, result) => {
    res.json(result)
  })
})


app.post('/signup', checkAuth, check_permissions, (req, res) => {
  const match_id = req.body.match_id
  Match.findById(match_id, function (err, docs) {
    if (err) {
      console.log(err);
    }
    else {
      if (docs.players.includes(req.body.discord_id)) {
        docs.players.pop(req.body.discord_id)
        Match.findByIdAndUpdate(match_id, docs, function (err) {
          if (err) {
            console.log(err);
          }
          res.status(200).json({ 'response': 'Fucking crybaby!' })
        })
      }
      else {
        docs.players.push(req.body.discord_id)
        Match.findByIdAndUpdate(match_id, docs, function (err) {
          if (err) {
            console.log(err);
          }
          res.status(200).json({ 'response': 'Welcome on board Soldier!' })
        })
      }
    }
  });
})

app.listen(LISTEN_PORT, (err) => {
  if (err) return console.log(err);

  console.log(`Listening at port ${LISTEN_PORT}`);
});
