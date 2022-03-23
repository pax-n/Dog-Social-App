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

router.post("/barks", (req, res) => {
  //Posting a word post (review description variable)

  console.log("Req.body: ", req.body);
  const caption = req.body.caption;
  const dog_id = req.body.dog_id;
  database.addBarks(caption, dog_id).then(() => {
    res.send({ caption, dog_id });
  });
});

router.get("/friends", (req, res) => {
  const dog_id = 1;
  database.getFriends(dog_id).then((barks) => {
    res.json(barks);
  });
});

router.get("/paws", (req, res) => {
  const dog_id = 1;
  database.getLikesByPostID(dog_id).then((paws) => {
    res.json(paws);
  });
});
router.put("/paws", (req, res) => {
  const userID = 1;
});

module.exports = router;
