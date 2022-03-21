const { query } = require("express");
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
  SELECT * FROM barks WHERE dogs_id = $1;
  `;
  const queryParams = [userid];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows);
  });
};

//Get the list of friends of the user.
const getFriends = (userid) => {
  const queryStatement = `
  SELECT target_dog_id, requested_dog_id FROM dog_friendlists AS my_dog_id
  WHERE requested_dog_id = $1 OR target_dog_id = $1 AND is_accepted IS TRUE; `;
  const queryParams = [userid];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

const getPostsFromFriends = (userid) => {
  //Shows only the posts from friends that are accepted.
  const queryStatement = `
    SELECT dog_id, caption FROM barks
    JOIN dogs d ON d.id = dog_id
    WHERE dog_id in 
    (SELECT target_dog_id FROM dog_friendlists WHERE requested_dog_id = $1 AND is_accepted IS TRUE) 
    OR dog_id in (SELECT requested_dog_id FROM dog_friendlists WHERE target_dog_id = $1 AND is_accepted IS TRUE) 
    or dog_id = $1 AND is_public IS TRUE;
  `;
  const queryParams = [userid];

  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows);
  });
};

//Gets the user's bio
const getUserBio = (userid) => {
  const queryStatement = `
  SELECT bio_description FROM dogs WHERE dogs_id = $1;`;
  const queryParams = [userid];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

//BELOW HERE IS UNTESTED UNTIL CONNECTED TO FRONT END :)
//Adds the content of the posts
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
  INSERT INTO barks (dogs_id, caption VARCHAR(255), image_url, video_url, date_added, is_public, date_modified) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
  const queryParams = [
    dog_id,
    caption,
    image_url,
    video_url,
    date_added,
    is_public,
    date_modified,
  ];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

const deleteBarks = (bark_id) => {
  const queryStatement = `
  DELETE FROM barks
  WHERE bark_id = $1;`;
  const queryParams = [bark_id];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows);
  });
};

const postComments = (dog_id, bark_id, comment, date_added) => {
  const queryStatement = `
  INSERT INTO comments (dog_id, bark_id, comment, date_added) VALUES ($1, $2, $3, $4) RETURNING *;`;
  const queryParams = [dog_id, bark_id, comment, date_added];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows);
  });
};

const deleteComments = (comment_id) => {
  const queryStatement = `
  DELETE FROM comments
  WHERE comments_id = $1;`;
  const queryParams = [comment_id];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows);
  });
};

const addFriend = (requested_dog_id, target_dog_id) => {
  const queryStatement = `
  INSERT INTO dog_friendlists (requested_dog_id, target_dog_id)
  VALUES ($1, $2) RETURNING *;
  `;
  const queryParams = [requested_dog_id, target_dog_id];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows);
  });
};

const deleteFriend = (requested_dog_id, target_dog_id) => {
  const queryStatement = `
  DELETE FROM dog_friendlists
  WHERE requested_dog_id = $1 AND target_dog_id = $2;`;
  const queryParams = [requested_dog_id, target_dog_id];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows);
  });
};

module.exports = {
  getDog,
  getPostsFromDog,
  getFriends,
  getPostsFromFriends,
  addBarks,
  deleteBarks,
  postComments,
  deleteComments,
  addFriend,
  deleteFriend,
};
