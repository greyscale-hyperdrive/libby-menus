const faker = require('faker');
const Chance = require('chance');
const fs = require('fs');
const stream = require('stream');

const chance = new Chance();

const createFile = (streamWriter, data, entries) => {
  let i = entries;
  const write = () => {
    let drained = true;
    do {
      i -= 1;
      drained = streamWriter.write(data());
    } while (i > 0 && drained);
    if (i > 0) {
      streamWriter.once('drain', write);
    }
  };
  write();
};

const createFileFromArray = (streamWriter, data) => {
  let i = 0;
  const write = () => {
    let drained = true;
    do {
      drained = streamWriter.write(`${data[i]}\n`);
      i += 1;
    } while (i < data.length && drained);
    if (i < data.length) {
      streamWriter.once('drain', write);
    }
  };
  write();
};

// create file for restaurants table
const restaurantStream = fs.createWriteStream('./data/files/restaurants.csv');
const generateRestaurantData = () => `${faker.lorem.words()},"${faker.lorem.word()},${faker.lorem.word()},${faker.lorem.word()}"\n`;
createFile(restaurantStream, generateRestaurantData, 10000000);

// create file for menu_items table
const generateItemName = () => faker.lorem.words();
const generateItemDescription = () => faker.lorem.sentence();
const generateItemPrice = () => chance.floating({ min: 0, max: 200, fixed: 2 });
const generateItemUrl = () => `https://s3-us-west-1.amazonaws.com/sdc-datatable/menu-item${Math.floor(Math.random() * (1035)) + 1}.jpg`;

const itemsStream = fs.createWriteStream('./data/files/items.csv');
const generateItemData = () => `${generateItemName()},${generateItemDescription()},${generateItemPrice()},${generateItemUrl()}\n`;
createFile(itemsStream, generateItemData, 1000);

// create file for menu_sections table
const sectionArray = ['Breakfast', 'Lunch', 'Dinner', 'Brunch', 'Desserts', 'Drinks', 'Happy Hour'];
const sectionsStream = fs.createWriteStream('./data/files/sections.csv');
createFileFromArray(sectionsStream, sectionArray);

// create file for dietary_restrictions table
const restrictionsArray = ['Vegetarian', 'Vegan', 'Gluten-Free', 'No Seafood', 'No Peanuts'];
const restrictionsStream = fs.createWriteStream('./data/files/restrictions.csv');
createFileFromArray(restrictionsStream, restrictionsArray);

// create file for item_restrictions table
const itemRestrictionsStream = fs.createWriteStream('./data/files/item_restrictions.csv');
const generateItemRestrictionsData = () => `${Math.floor(Math.random() * (1000)) + 1},${Math.floor(Math.random() * restrictionsArray.length + 1)}\n`;
createFile(itemRestrictionsStream, generateItemRestrictionsData, 1000);

// create file for item_section table
const itemSectionStream = fs.createWriteStream('./data/files/item_section.csv');
const generateItemSectionData = () => (Math.floor(Math.random() * sectionArray.length) + 1);
const createItemSectionFile = (streamWriter, data, entries) => {
  let i = 0;
  const write = () => {
    let drained = true;
    do {
      i += 1;
      drained = streamWriter.write(`${i},${data()}\n`);
    } while (i < entries && drained);
    if (i < entries) {
      streamWriter.once('drain', write);
    }
  };
  write();
};
createItemSectionFile(itemSectionStream, generateItemSectionData, 1000);

// create file for restaurant_items table
const restaurantItemsStream = fs.createWriteStream('./data/files/restaurant_items.csv');
const createRestaurantItemsFile = (streamWriter, entries) => {
  let i = 0;
  const write = () => {
    let drained = true;
    do {
      i += 1;
      for (let j = 1; j < 16; j += 1) {
        drained = streamWriter.write(`${i},${Math.floor(Math.random() * 1000) + 1}\n`);
      }
    } while (i < entries && drained);
    if (i < entries) {
      streamWriter.once('drain', write);
    }
  };
  write();
};
createRestaurantItemsFile(restaurantItemsStream, 10000000);
