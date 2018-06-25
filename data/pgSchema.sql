DROP DATABASE IF EXISTS menus;

CREATE DATABASE menus;

\c menus;

CREATE TABLE restaurants (
  rest_id SERIAL PRIMARY KEY,
  rest_name TEXT NOT NULL,
  rest_headers TEXT[] NOT NULL
);

CREATE TABLE menu_items (
  item_id SERIAL PRIMARY KEY,
  item_name TEXT NOT NULL,
  item_description TEXT NOT NULL,
  item_price NUMERIC NOT NULL,
  item_url TEXT
);

CREATE TABLE menu_sections (
  section_id SERIAL PRIMARY KEY,
  section_name TEXT NOT NULL
);

CREATE TABLE dietary_restrictions (
  restriction_id SERIAL PRIMARY KEY,
  restriction_name TEXT
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