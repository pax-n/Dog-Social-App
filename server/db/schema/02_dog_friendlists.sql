DROP TABLE IF EXISTS dog_friendlists CASCADE;

CREATE TABLE dog_friendlists (
  id SERIAL PRIMARY KEY NOT NULL,
  requested_dog_id INTEGER REFERENCES dogs(id) ON DELETE CASCADE,
  target_dog_id INTEGER REFERENCES dogs(id) ON DELETE CASCADE,
  is_accepted BOOLEAN
);