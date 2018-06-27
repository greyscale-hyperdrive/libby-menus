DROP KEYSPACE IF EXISTS menus;

CREATE KEYSPACE menus
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

USE menus;

CREATE TABLE restaurants (
  rest_name TEXT,
  item_name TEXT,
  item_description TEXT,
  item_price DECIMAL,
  item_url TEXT,
  PRIMARY KEY (rest_name, item_name)
);

CREATE TABLE dietary_restrictions (
  item_name TEXT,
  restriction_name TEXT,
  PRIMARY KEY (item_name, restriction_name)
);

CREATE TABLE menu_sections (
  section_name TEXT,
  item_name TEXT,
  PRIMARY KEY (section_name, item_name)
);

CREATE TABLE restaurant_headers (
  rest_name TEXT,
  header_name TEXT,
  PRIMARY KEY (rest_name, header_name)
);