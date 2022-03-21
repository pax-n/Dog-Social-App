var express = require("express");
var router = express.Router();

const database = require("../database-functions");

/* GET home page. */

router.get("/", function (req, res, next) {
  console.log("Barks loaded.");
  let userID = 1;
  database.getPostsFromFriends(userID).then((barks) => {
    res.json(barks);
  });
});

router.get("/friends", (req, res) => {
  const userID = 1;
  database.getFriends(userID).then((barks) => {
    res.json(barks);
  });
});

router.post("/barks", (req, res) => {
  //Posting a word post (review description variable)
  const dog_id = 1;
  const caption = req.body.caption;
  database.addBarks();
});

module.exports = router;
