\c menus;

COPY restaurants FROM '/Users/Libby/hrsf95/sdc/libby-menus/data/restaurants.csv' DELIMITER ',' CSV;
CREATE INDEX rest_id ON restaurants (rest_name);