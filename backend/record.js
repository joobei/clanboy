const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();
const dbo = require("./conn.js");
// This section will help you get a list of all the documents.
recordRoutes.route("/matches").get(async function (req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("matches")
        .find({}).limit(50)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching matches!");
            } else {
                res.json(result);
            }
        });
});

// This section will help you create a new record.
recordRoutes.route("/listings/recordSwipe").post(function (req, res) {
    // Insert swipe informations
});

// This section will help you update a record by id.
recordRoutes.route("/listings/updateLike").post(function (req, res) {
    // Update likes
});

// This section will help you delete a record
recordRoutes.route("/listings/delete").delete((req, res) => {
    // Delete documents
});

module.exports = recordRoutes;
