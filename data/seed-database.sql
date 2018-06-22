\c menus;

COPY restaurants (rest_name) FROM '/Users/Libby/hrsf95/sdc/libby-menus/data/files/restaurants.csv' DELIMITER ',' CSV;
COPY menu_items (item_name, item_description, item_price, item_url) FROM '/Users/Libby/hrsf95/sdc/libby-menus/data/files/items.csv' DELIMITER ',' CSV;