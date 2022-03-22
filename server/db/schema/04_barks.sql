DROP TABLE IF EXISTS barks CASCADE;

CREATE TABLE barks (
  id SERIAL PRIMARY KEY NOT NULL,
  dog_id INTEGER REFERENCES dogs(id) ON DELETE CASCADE,
  caption VARCHAR(255),
  image_url VARCHAR(255),
  video_url VARCHAR(255),
  created_at TIMESTAMP default current_timestamp,
  updated_at TIMESTAMP,
  is_public BOOLEAN DEFAULT TRUE
);