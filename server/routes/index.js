var express = require("express");
var router = express.Router();

const database = require("../database-functions");

/* GET home page. */

router.get("/", function (req, res, next) {
  //

  const userID = 1;
  database.getDog(userID).then((barks) => {
    res.json(barks);
  });
});

router.get("/barks", (req, res) => {
  //To load the posts by the users of the site.
  //Needs a function to sort the newest posts and limit the number of barks on the page
  //Placeholder until login is set up.
  const userID = 1;
  database.getPostsFromFriends(userID).then((barks) => {
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
