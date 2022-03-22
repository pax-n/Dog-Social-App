var express = require("express");
var router = express.Router();

const database = require("../database-functions");

/* GET home page. */

router.get("/barks", function (req, res, next) {
  console.log("Barks loaded.");
  let userID = 1;
  database
    .getPostsFromFriends(userID)
    .then((barks) => {
      res.json(barks);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ err: "Could not read database." });
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
