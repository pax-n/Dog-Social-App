const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

//Gets the user from the database
const getDog = (userid) => {
  const queryStatement = `
  SELECT * FROM dogs WHERE id = $1;`;
  const queryParams = [userid];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

//Gets the posts created by the user.
const getPostsFromDog = (userid) => {
  const queryStatement = `
  SELECT * FROM Bark WHERE dog_id = $1;
  `;
  const queryParams = [userid];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

//Get the list of friends of the user.
const getFriends = (userid) => {
  const queryStatement = `
  SELECT target_dog_id, requested_dog_id FROM Dog_Friendslist AS my_dog_id
  WHERE requested_dog_id = $1 OR target_dog_id = $1 AND is_accepted IS TRUE; `;
  const queryParams = [userid];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};
//Get posts from friends of the user
//Need to figure out if I can use this function using getFriends and iterate through them?
const getPostsFromFriends = (userid) => {
  let friends = getFriends();
  const queryStatement = `
  SELECT * FROM Bark WHERE dog_id = $1;`;
};

//Gets the user's bio
const getUserBio = (userid) => {
  const queryStatement = `
  SELECT bio_description FROM Dog WHERE dog_id = $1;`;
  const queryParams = [userid];
};

const addBarks = (
  dog_id,
  caption,
  image_url,
  video_url,
  date_added,
  is_public,
  date_modified
) => {
  const queryStatement = `
  INSERT INTO Bark (dog_id, caption VARCHAR(255), image_url, video_url, date_added, is_public, date_modified) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
};

module.exports = {
  getDog,
  getPostsFromDog,
  getFriends,
  getPostsFromFriends,
  addBarks,
};
