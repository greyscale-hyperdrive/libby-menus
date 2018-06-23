\c menus;

\copy item_restrictions (item_id, restriction_id) FROM './data/files/item_restrictions.csv' DELIMITER ',' CSV;
\copy item_section (item_id, section_id) FROM './data/files/item_section.csv' DELIMITER ',' CSV;
\copy restaurant_items (rest_id, item_id) FROM './data/files/restaurant_items.csv' DELIMITER ',' CSV;