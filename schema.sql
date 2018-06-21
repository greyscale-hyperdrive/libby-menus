CREATE TABLE restaurants (
  rest_id SERIAL PRIMARY KEY,
  rest_name VARCHAR(50) NOT NULL
);

CREATE TABLE menu_items (
  item_id SERIAL PRIMARY KEY,
  item_name VARCHAR(50) NOT NULL,
  item_description VARCHAR(200),
  price NUMERIC NOT NULL,
  img_url VARCHAR(100),
  rest_id INTEGER REFERENCES restaurants
);

CREATE TABLE menu_sections (
  section_id SERIAL PRIMARY KEY,
  section_name VARCHAR(20) NOT NULL
);

CREATE TABLE meal_types (
  meal_type_id SERIAL PRIMARY KEY,
  meal_type_name VARCHAR(9) NOT NULL
);

CREATE TABLE dietary_restrictions (
  restriction_id SERIAL PRIMARY KEY,
  restriction_name VARCHAR(20) NOT NULL
);

CREATE TABLE menu_time (
  time_id SERIAL PRIMARY KEY,
  time_text VARCHAR(30),
  item_id INTEGER REFERENCES menu_items,
  section_id INTEGER REFERENCES menu_sections
);

CREATE TABLE item_section (
  item_id INTEGER REFERENCES menu_items,
  section_id INTEGER REFERENCES menu_sections
);

CREATE TABLE item_meal_type (
  item_id INTEGER REFERENCES menu_items,
  meal_type_id INTEGER REFERENCES meal_types
);

CREATE TABLE item_restrictions (
  item_id INTEGER REFERENCES menu_items,
  restriction_id INTEGER REFERENCES dietary_restrictions
);