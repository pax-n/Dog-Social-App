DROP TABLE IF EXISTS dogs CASCADE;

CREATE TABLE dogs (
  id SERIAL PRIMARY KEY NOT NULL,
  breed_id INTEGER,
  email VARCHAR(100) NOT NULL,
  dog_name VARCHAR(100) NOT NULL,
  owner_first_name VARCHAR(100),
  owner_last_name VARCHAR(100),
  password VARCHAR(100) NOT NULL,
  profile_pic_url VARCHAR(255),
  birth_date DATE,
  bio_description VARCHAR(500),
  gender VARCHAR(1),
  location VARCHAR(100),
  created_at TIMESTAMP NOT NULL default current_timestamp,
  updated_at TIMESTAMP
);
