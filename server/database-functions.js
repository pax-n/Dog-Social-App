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
  //All info that gets posted (i.e. dog name, timestamp, etc.) that is required for a post is pulled here.
  //Shows only the posts from friends that are accepted.
  const queryStatement = `
    SELECT d.dog_name, dog_id, caption, image_url, video_url, profile_pic_url, b.created_at FROM barks AS b
    JOIN dogs AS d ON d.id = dog_id
    WHERE dog_id in 
    (SELECT target_dog_id FROM dog_friendlists WHERE requested_dog_id = $1 AND is_accepted = 'a') 
    OR dog_id in (SELECT requested_dog_id FROM dog_friendlists WHERE target_dog_id = $1 AND is_accepted = 'a') 
    or dog_id = $1 AND is_public IS TRUE
    ORDER BY b.created_at DESC;
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

//Adds the content of the posts
//Needs to continue to be updated
const addBarks = (caption, dog_id) => {
  const queryStatement = `
  INSERT INTO barks (caption, dog_id) VALUES ($1, $2) RETURNING *;`;
  const queryParams = [caption, dog_id];
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

//For the login, get the dog_id by the email inputted.
const getDogByEmail = (email) => {
  const queryStatement = `
  SELECT id FROM dogs
  WHERE email = '$1';
  `;
  const queryParams = [email];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

//Query dog breeds table and get all the dog breeds
const dogBreeds = (dogs) => {
  const queryStatement = `
  SELECT breed_name FROM breeds;`;
  return db.query(queryStatement).then((data) => {
    return Promise.resolve(data.rows);
  });
};

//Get the breed id by the breed name to post when registering.
const getBreedIDbyBreedName = (breed_name) => {
  const queryStatement = `
  SELECT id FROM breeds
  WHERE breed_name = '$1';`;
  const queryParams = [breed_name];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

//Registration parameters
const registerDog = (
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
  city,
  country
) => {
  const queryStatement = `
  INSERT INTO dogs (email, password, dog_name, breed_id, gender, birth_date, owner_first_name, owner_last_name, profile_pic_url, bio_description, city, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
  const queryParams = [
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
    city,
    country,
  ];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

//
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
  getDogByEmail,
  dogBreeds,
  getBreedIDbyBreedName,
  registerDog,
};
