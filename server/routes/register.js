require("dotenv").config();

const express = require('express');
const router  = express.Router();
const database =require('../database-functions');

const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY1, process.env.KEY2],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// receiving:
// { email, password, dog_name, breed, gender, birth_date, owner_first_name, owner_last_name, profile_pic_url, bio_description, location};
router.post("/", (req, res) => {
  const breed_id = database.getBreedIDbyBreedName(req.body.breed)
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
  database.registerDog(
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
  location)
    .then(() => {
      database.getDogByEmail(email)
      .then(data => {
        const user = data[0]
        req.session.user = user;
        return res.redirect("../");
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;