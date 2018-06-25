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

const createItemArray = (num) => {
  const itemArray = [];
  for (let i = 0; i < num; i += 1) {
    itemArray.push(faker.lorem.words());
  }
  return itemArray;
};

const restaurantItems = createItemArray(1000);

const createRestaurantsFile = () => {
  const generateRestaurantData = () =>
    `${faker.lorem.words()},`
    + `${restaurantItems[Math.floor(Math.random() * 1000) + 1]},`
    + `${faker.lorem.sentence()},`
    + `${chance.floating({ min: 0, max: 200, fixed: 2 })},`
    + `${`https://s3-us-west-1.amazonaws.com/sdc-datatable/menu-item${Math.floor(Math.random() * 1035) + 1}.jpg`}\n`;
  createFile(fs.createWriteStream('./data/files/cass_restaurants.csv'), generateRestaurantData, 10000000);
};

const createRestrictionsFile = () => {
  const restrictionsArray = ['Vegetarian', 'Vegan', 'Gluten-Free', 'No Seafood', 'No Peanuts'];
  createFileFromArray(fs.createWriteStream('./data/files/restrictions.csv'), restrictionsArray);
};

const sectionArray = ['Breakfast', 'Lunch', 'Dinner', 'Brunch', 'Desserts', 'Drinks', 'Happy Hour'];
const sectionsStream = fs.createWriteStream('./data/files/sections.csv');
createFileFromArray(sectionsStream, sectionArray);

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
