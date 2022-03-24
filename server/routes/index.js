var express = require("express");
var router = express.Router();

const database = require("../database-functions");

/* GET home page. */

router.get("/barks/:id", function (req, res, next) {
  console.log("Barks loaded.");
  const userID = req.params.id;
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

router.get(`/paws/:bark_id`, (req, res) => {
  const barks_id = req.params.bark_id;
  database
    .getLikesByPostID(barks_id)
    .then((paws) => {
      res.json(paws);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ err: "Could not read database." });
    });
});

router.put(`/paws/:bark_id`, (request, res) => {
  const bark_id = request.params.bark_id;
  database
    .addLike(bark_id)
    .then(() => {
      res.status(201).send("");
    })
    .catch((error) => {
      console.log("addLike(()): ", error.message);
      res.status(500).send({ error: error.message });
    });
});

module.exports = router;
