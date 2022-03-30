DROP TABLE IF EXISTS classifieds CASCADE;

CREATE TABLE classifieds (
  id SERIAL PRIMARY KEY NOT NULL,
  dog_id INTEGER REFERENCES dogs(id) ON DELETE CASCADE,
  item_name VARCHAR(100) NOT NULL,
  item_img_url VARCHAR(255),
  price_cents INTEGER,
  description VARCHAR(255),
  phone_contact INTEGER,
  created_at TIMESTAMP NOT NULL default current_timestamp,
  updated_at TIMESTAMP
);
  