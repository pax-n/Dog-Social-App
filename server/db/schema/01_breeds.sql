DROP TABLE IF EXISTS breeds CASCADE;

CREATE TABLE breeds (
  id SERIAL PRIMARY KEY NOT NULL,
  breed_name VARCHAR(100) NOT NULL
);