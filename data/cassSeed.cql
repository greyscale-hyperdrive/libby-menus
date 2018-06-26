USE menus;

COPY restaurants (rest_name, item_name, item_description, item_price, item_url) FROM './data/files/cass_restaurants.csv';
COPY dietary_restrictions (item_name, restriction_name) FROM './data/files/cass_restrictions.csv';
COPY menu_sections (section_name, item_name) FROM './data/files/cass_sections.csv';
COPY restaurant_headers (rest_name, header_name) FROM './data/files/cass_headers.csv';