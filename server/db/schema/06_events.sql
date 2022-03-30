DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  created_by_dog_id INTEGER REFERENCES dogs(id) ON DELETE CASCADE,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  description VARCHAR(1000),
  location_point POINT,
  location_name VARCHAR(100),
  location VARCHAR(100),
  created_at TIMESTAMP default current_timestamp,
  updated_at TIMESTAMP
);