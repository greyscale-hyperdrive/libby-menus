DROP DATABASE IF EXISTS menus;

CREATE DATABASE menus;

\c menus;

CREATE TABLE restaurants (
  rest_id SERIAL PRIMARY KEY,
  rest_name VARCHAR(50) NOT NULL,
  rest_headers VARCHAR(100) NOT NULL
);

CREATE TABLE menu_items (
  item_id SERIAL PRIMARY KEY,
  item_name VARCHAR(50) NOT NULL,
  item_description VARCHAR(200) NOT NULL,
  item_price NUMERIC NOT NULL,
  item_url VARCHAR(100)
);

CREATE TABLE menu_sections (
  section_id SERIAL PRIMARY KEY,
  section_name VARCHAR(9) NOT NULL
);

CREATE TABLE dietary_restrictions (
  restriction_id SERIAL PRIMARY KEY,
  restriction_name VARCHAR(20) NOT NULL
);

CREATE TABLE menu_time (
  time_id SERIAL PRIMARY KEY,
  time_text VARCHAR(30),
  item_id INTEGER REFERENCES menu_items ON DELETE CASCADE,
  rest_id INTEGER REFERENCES restaurants on DELETE CASCADE
);

CREATE TABLE restaurant_items (
  rest_id INTEGER REFERENCES restaurants ON DELETE CASCADE,
  item_id INTEGER REFERENCES menu_items ON DELETE CASCADE
);

CREATE TABLE item_section (
  item_id INTEGER REFERENCES menu_items ON DELETE CASCADE,
  section_id INTEGER REFERENCES menu_sections ON DELETE CASCADE
);

CREATE TABLE item_restrictions (
  item_id INTEGER REFERENCES menu_items ON DELETE CASCADE,
  restriction_id INTEGER REFERENCES dietary_restrictions ON DELETE CASCADE
);