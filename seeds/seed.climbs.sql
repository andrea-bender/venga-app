BEGIN;

TRUNCATE
  climbs
  RESTART IDENTITY CASCADE;

INSERT INTO climbs (name, location, description, grade, type, rating)

VALUES
  ('Valhalla', 'Flagstaff Mt, CO', 'Cool overhung problem', 'V7', 'Boulder', 4),
  ('The Web', 'Eldorado Canyon, CO', 'Short, but hard route!', '5.13b', 'Sport', 5),  
  ('Emprie of the Fenceless', 'Boulder Canyon, CO', 'Fun and aesthetic climb, a classic.', '5.12a', 'Sport', 4),  
  ('The Bastille Crack', 'Eldorado Canyon, CO', 'Polished, sketchy, fun Eldo classic', '5.7', 'Traditional', 4);

COMMIT;


