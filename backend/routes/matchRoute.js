var express = require("express");
var router = express.Router();
var postController = require("../controllers/matchController");
var auth = require("../middleware/auth")();
router.get("/matches", auth.authenticate(), postController.get_post);

module.exports = router;