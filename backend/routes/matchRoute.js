var express = require("express");
var router = express.Router();
var matchController = require("../controllers/matchController");
var auth = require("../middleware/auth")();
router.get("/matches", auth.authenticate(), matchController.get_matches);

module.exports = router;