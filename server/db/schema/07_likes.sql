DROP TABLE IF EXISTS likes CASCADE;

CREATE TABLE likes (
  id SERIAL PRIMARY KEY NOT NULL,
  dog_id INTEGER REFERENCES dogs(id) ON DELETE CASCADE,
  bark_id INTEGER REFERENCES barks(id) ON DELETE CASCADE,
  created_at TIMESTAMP default current_timestamp,
  updated_at TIMESTAMP
);