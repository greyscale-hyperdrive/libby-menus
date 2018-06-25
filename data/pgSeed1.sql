\c menus;

\copy restaurants (rest_name, rest_headers) FROM './data/files/restaurants.csv' CSV;
\copy menu_items (item_name, item_description, item_price, item_url) FROM './data/files/items.csv' CSV;
\copy menu_sections (section_name) FROM './data/files/sections.csv' CSV;
\copy dietary_restrictions (restriction_name) FROM './data/files/restrictions.csv' CSV;
