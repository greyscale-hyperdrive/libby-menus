CREATE TABLE restaurants (
  rest_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE menu_items (
  item_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(200),
  price NUMERIC NOT NULL,
  img_url VARCHAR(100),
  rest_id SERIAL REFERENCES restaurants
);

CREATE TABLE restaurants (
  rest_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

