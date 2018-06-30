DROP KEYSPACE IF EXISTS menus;

CREATE KEYSPACE menus
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

USE menus;

CREATE TABLE restaurants (
  rest_id INT,
  rest_name TEXT,
  item_name TEXT,
  item_description TEXT,
  item_price DECIMAL,
  item_url TEXT,
  PRIMARY KEY (rest_id, rest_name, item_name)
);

CREATE TABLE dietary_restrictions (
  item_name TEXT,
  restriction_name TEXT,
  PRIMARY KEY (item_name, restriction_name)
);

CREATE TABLE menu_sections (
  item_name TEXT,
  section_name TEXT
  PRIMARY KEY (item_name, section_name)
);

CREATE TABLE restaurant_headers (
  rest_name TEXT,
  header_name TEXT,
  PRIMARY KEY (rest_name, header_name)
);