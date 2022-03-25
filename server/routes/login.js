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

router.post("/", (req, res) => {
  const email = req.body.email;
  console.log("req: ", req.body);
  database.getDogByEmail(email)
    .then(data => {
      const user = data[0]
      if (user === undefined){
        return res.status(403).send(`<p>Email not found</p><a href="/">Click here to go back</a>`);
      }
      if (user.email === email) {
          req.session.user = user;
          return res.redirect("../");
        }

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;