CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  image TEXT,
  title VARCHAR (50),
  public_id TEXT
);