DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  dog_id INTEGER REFERENCES dogs(id) ON DELETE CASCADE,
  bark_id INTEGER REFERENCES barks(id) ON DELETE CASCADE,
  comment VARCHAR(255),
  created_at TIMESTAMP default current_timestamp,
  updated_at TIMESTAMP
);