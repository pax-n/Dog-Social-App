DROP TABLE IF EXISTS event_members CASCADE;

CREATE TABLE event_members (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  dog_id INTEGER REFERENCES dogs(id) ON DELETE CASCADE,
  created_at TIMESTAMP default current_timestamp,
  updated_at TIMESTAMP
);