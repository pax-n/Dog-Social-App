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

const getAllPosts = () => {
  const queryStatement = `
  SELECT * FROM barks
  LIMIT {15}
  ORDER BY created_at DESC;`;
  return db.query(queryStatement).then((data) => {
    return Promise.resolve(data.rows);
  });
};

const getPostsFromFriends = (userid) => {
  // All info that gets posted (i.e. dog name, timestamp, etc.) that is required for a post is pulled here.
  // Shows only the posts from friends that are accepted.
  // const queryStatement = `
  //   SELECT d.dog_name, dog_id, caption, image_url, video_url, profile_pic_url, b.created_at FROM barks AS b
  //   JOIN dogs AS d ON d.id = dog_id
  //   WHERE dog_id in
  //   (SELECT target_dog_id FROM dog_friendlists WHERE requested_dog_id = $1 AND is_accepted = 'a')
  //   OR dog_id in (SELECT requested_dog_id FROM dog_friendlists WHERE target_dog_id = $1 AND is_accepted = 'a')
  //   or dog_id = $1 AND is_public IS TRUE
  //   ORDER BY b.created_at DESC;
  // `;
  const queryStatement = `
    SELECT b.id, d.profile_pic_url, b.dog_id, d.dog_name, b.caption, b.image_url, b.video_url, b.created_at FROM barks AS b
    JOIN dogs AS d ON d.id = dog_id
    ORDER BY b.created_at DESC;`;

  return db.query(queryStatement).then((data) => {
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

//For the GET request to show the comments under the post/bark_id.
const getCommentsFromPost = (bark_id) => {
  const queryStatement = `
  SELECT d.dog_name, c.id, c.dog_id, c.bark_id, c.comment, c.created_at, d.profile_pic_url FROM comments AS c JOIN dogs AS d ON d.id = c.dog_id WHERE bark_id = $1
  ORDER BY c.created_at DESC`;
  const queryParams = [bark_id];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows);
  });
};

const postComments = (dog_id, bark_id, comment) => {
  const queryStatement = `
  INSERT INTO comments (dog_id, bark_id, comment) VALUES ($1, $2, $3) RETURNING *;`;
  const queryParams = [dog_id, bark_id, comment];
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

const confirmFriend = (requested_dog_id, target_dog_id) => {
  const queryStatement = `
  UPDATE dog_friendlists
  SET is_accepted = 'a'
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
  WHERE email = $1;
  `;
  const queryParams = [email];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0].id);
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
  WHERE breed_name = $1;`;
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
  location
) => {
  const queryStatement = `
  INSERT INTO dogs (email, password, dog_name, breed_id, gender, birth_date, owner_first_name, owner_last_name, profile_pic_url, bio_description, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`;
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
    location,
  ];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

const getLikesByPostID = (bark_id) => {
  const queryStatement = `
  SELECT COUNT (*) FROM likes
  WHERE bark_id = $1;
  `;
  const queryParams = [bark_id];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

const addLike = (dog_id, bark_id) => {
  const queryStatement = `
  INSERT INTO likes (dog_id, bark_id) VALUES ($1, $2);`;
  return db.query(queryStatement, [dog_id, bark_id]).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

const getFriends = (dog_id) => {
  const queryStatement = `
 SELECT d.dog_name, d.profile_pic_url, d.id FROM dogs AS d
  WHERE d.id IN
  (SELECT target_dog_id FROM dog_friendlists WHERE requested_dog_id = $1 AND is_accepted = 'a')
  OR d.id in (SELECT requested_dog_id FROM dog_friendlists WHERE target_dog_id = $1 AND is_accepted = 'a');
  `;
  const queryParams = [dog_id];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows);
  });
};

// specifically for requests that have not been accepted yet (both sent and received)
const getFriendsRequests = (dog_id) => {
  const queryStatement = `
 SELECT d.dog_name, d.profile_pic_url, d.id FROM dogs AS d
  WHERE d.id IN
  (SELECT target_dog_id FROM dog_friendlists WHERE requested_dog_id = $1 AND is_accepted = 'p')
  OR d.id in (SELECT requested_dog_id FROM dog_friendlists WHERE target_dog_id = $1 AND is_accepted = 'p');
  `;
  const queryParams = [dog_id];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows);
  });
};

const getRequestedFriends = (dog_id) => {
  const queryStatement = `
  SELECT dog_name, profile_pic_url, dogs.id FROM dogs JOIN dog_friendlists ON requested_dog_id=dogs.id
  WHERE dog_friendlists.target_dog_id = $1 AND dog_friendlists.is_accepted = 'p';
  `;
  const queryParams = [dog_id];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows);
  });
};

const searchResults = (searchQuery) => {
  const queryStatement = `
  SELECT dog_name, profile_pic_url, id FROM dogs WHERE dog_name ILIKE '%' || $1 || '%';`;
  const queryParams = [searchQuery];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows);
  });
};

const getEventsList = () => {
  const queryStatement = `
  SELECT e.id, e.created_by_dog_id, e.start_time, e.end_time, e.description, e.location_name, e.location, e.created_at, d.dog_name 
  FROM events AS e
  JOIN dogs AS d ON d.id = e.created_by_dog_id
  ORDER BY e.created_at DESC
  ;`;
  return db.query(queryStatement).then((data) => {
    return Promise.resolve(data.rows);
  });
};

const getEventDetails = (event_id) => {
  const queryStatement = `SELECT e.id, e.created_by_dog_id, e.start_time, e.end_time, e.description, e.location_name, e.location, e.created_at, d.dog_name 
  FROM events AS e
  JOIN dogs AS d ON d.id = e.created_by_dog_id
  WHERE e.id = $1`;
  return db.query(queryStatement, [event_id]).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

const getEventMembers = (event_id) => {
  const queryStatement = `
  SELECT e.id, e.event_id, e.dog_id, d.dog_name, e.created_at, d.profile_pic_url FROM event_members AS e
  JOIN dogs AS d ON d.id = e.dog_id
  WHERE e.event_id = $1
  ORDER BY e.created_at DESC;`;
  return db.query(queryStatement, [event_id]).then((data) => {
    return Promise.resolve(data.rows);
  });
};

const addEventMembers = (event_id, dog_id) => {
  const queryStatement = `
  INSERT INTO event_members (event_id, dog_id) VALUES ($1, $2);`;
  const queryParams = [event_id, dog_id];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

const removeEventMembers = (event_id, dog_id) => {
  const queryStatement = `
  DELETE FROM event_members WHERE dog_id = $1 AND event_id = $2;`;
  const queryParams = [dog_id, event_id];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

const addEvent = (
  created_by_dog_id,
  start_time,
  end_time,
  description,
  location
) => {
  const queryStatement = `
  INSERT INTO events (created_by_dog_id,
  start_time,
  end_time, 
  description, 
  location) VALUES ($1, $2, $3, $4, $5);`;
  const queryParams = [
    created_by_dog_id,
    start_time,
    end_time,
    description,
    location,
  ];
  return db.query(queryStatement, queryParams).then((data) => {
    return Promise.resolve(data.rows[0]);
  });
};

const getClassifieds = () => {
  const queryStatement = `
  SELECT dog_name, profile_pic_url, dogs.id, email, classifieds.* FROM dogs RIGHT JOIN classifieds ON dog_id = dogs.id;
  `;
  return db.query(queryStatement).then((data) => {
    console.log("getClassifieds: ", data);
    return Promise.resolve(data.rows);
  });
};

//
module.exports = {
  getDog,
  getPostsFromDog,
  getAllPosts,
  getPostsFromFriends,
  addBarks,
  deleteBarks,
  getCommentsFromPost,
  postComments,
  deleteComments,
  addFriend,
  deleteFriend,
  dogBreeds,
  getDogByEmail,
  getBreedIDbyBreedName,
  registerDog,
  getLikesByPostID,
  addLike,
  getFriends,
  searchResults,
  getEventsList,
  getEventDetails,
  getRequestedFriends,
  confirmFriend,
  getFriendsRequests,
  getEventMembers,
  addEventMembers,
  removeEventMembers,
  addEvent,
  getClassifieds,
};
