var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/auth/discord', passport.authenticate('discord'))
router.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/dashboard') // Successful auth
});

module.exports = router