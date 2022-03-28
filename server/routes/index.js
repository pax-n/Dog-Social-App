require("dotenv").config();

var express = require("express");
var router = express.Router();

const database = require("../database-functions");

const cookieSession = require("cookie-session");

router.use(
  cookieSession({
    name: "session",
    keys: [process.env.KEY1, process.env.KEY2],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

router.post("/login", (req, res) => {
  const email = req.body.email;
  console.log("req.body: ", req.body);
  database
    .getDogByEmail(email)
    .then((data) => {
      const user = data;
      if (user === undefined) {
        return res
          .status(403)
          .send(`<p>Email not found</p><a href="/">Click here to go back</a>`);
      } else {
        req.session.user = user;
        res.status(201).send("");
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/logout", (req, res) => {
  req.session = null;
  res.status(201).send("");
});

// receiving:
// { email, password, dog_name, breed, gender, birth_date, owner_first_name, owner_last_name, profile_pic_url, bio_description, location};
router.post("/register", (req, res) => {
  const breed = req.body.breed;
  const breedCheck = (element) => {
    let parsedBreed;
    const breedList = [
      "Shiba Inu",
      "Dachshund",
      "Labrador Retriever",
      "Shih-tzu",
      "Husky",
      "Poodle",
      "Greyhound",
    ];
    for (let i = 0; i < breedList.length; i++) {
      if (element === breedList[i]) {
        parsedBreed = i + 1;
      }
    }
    return parsedBreed;
  };
  const breed_id = breedCheck(breed);
  const email = req.body.email;
  const password = req.body.password;
  const dog_name = req.body.dog_name;
  const gender = req.body.gender;
  const birth_date = req.body.birth_date;
  const owner_first_name = req.body.owner_first_name;
  const owner_last_name = req.body.owner_last_name;
  const profile_pic_url = req.body.profile_pic_url;
  const bio_description = req.body.bio_description;
  const location = req.body.location;

  database
    .registerDog(
      email,
      password,
      dog_name,
      breed_id,
      gender,
      birth_date,
      owner_first_name,
      owner_last_name,
      profile_pic_url,
      bio_description,
      location
    )
    .then((data) => {
      const user = data.id;
      req.session.user = user;
      res.status(201).send("");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/dog/:id", function (req, res) {
  const userID = req.params.id;
  database
    .getDog(userID)
    .then((dog) => {
      res.json(dog);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ err: "Could not read database." });
    });
});

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

router.get("/auth", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.send("false");
  }
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

router.post(`/paws/:bark_id`, (request, res) => {
  const bark_id = request.params.bark_id;
  const dog_id = request.body.dog_id;
  database
    .addLike(dog_id, bark_id)
    .then((paws) => {
      res.status(201).send("");
    })
    .catch((error) => {
      console.log("addLike(()): ", error.message);
      res.status(500).send({ error: error.message });
    });
});

router.get(`/api/comments/:bark_id`, (req, res) => {
  const bark_id = req.params.bark_id;
  console.log("Comment is being fetched from the database.");
  console.log("Bark_id received: ", bark_id);
  database.getCommentsFromPost(bark_id).then((comments) => {
    res.json(comments);
  });
});

router.post(`/comments`, (req, res) => {
  console.log("Comments request body: ", req.body);
  //UPDATE WITH COOKIE OF USER FOR DOG_ID
  let dog_id = req.body.dog_id;
  let bark_id = req.body.bark_id;
  let postComment = req.body.postComment;

  database.postComments(dog_id, bark_id, postComment).then((data) => {
    console.log("Comment route data: ", data);
    res.json(data);
  });
});

router.get(`/api/friends/:dog_id`, (req, res) => {
  const dog_id = req.params.dog_id;
  database.getFriends(dog_id).then((friends) => {
    console.log("Route for friends: ", friends);
    res.json(friends);
  });
});

router.get(`/api/profile/:dog_id`, (req, res) => {
  const dog_id = req.params.dog_id;
  database.getDog(dog_id).then((profile) => {
    console.log("Profile get route: ", profile);
    res.json(profile);
  });
});

router.post(`/api/addfriend/`, (req, res) => {
  console.log("Add friend req body: ", req.body);
  const requested_dog_id = req.body.requested_dog_id;
  const target_dog_id = req.body.target_dog_id;
  database.addFriend(requested_dog_id, target_dog_id).then((data) => {
    console.log("Add friend data: ", data);
    res.json(data);
  });
});

router.get(`/api/search/:searchQuery`, (req, res) => {
  const searchQuery = req.params.searchQuery;
  database.searchResults(searchQuery).then((results) => {
    console.log("Route for search: ", results);
    res.json(results);
  });
});

router.get(`/api/events`, (req, res) => {
  database.getEventsList().then((results) => {
    console.log("Events list results: ", results);
    res.json(results);
  });
});

router.get(`/api/events/:event_id`, (req, res) => {
  database.getEventDetails(event_id).then((results) => {
    console.log("Event details results: ", results);
    res.json(results);
  });
});

module.exports = router;
