DROP TABLE IF EXISTS locations CASCADE;

CREATE TABLE locations (
  id SERIAL PRIMARY KEY NOT NULL,
  location_point POINT,
  location_name VARCHAR(100),
  city VARCHAR(100),
  country VARCHAR(100)
);