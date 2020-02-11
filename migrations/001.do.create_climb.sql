CREATE TABLE climbs (
  id serial PRIMARY KEY, 
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  grade TEXT NOT NULL,
  type TEXT NOT NULL,
  rating FLOAT NOT NULL 
);


