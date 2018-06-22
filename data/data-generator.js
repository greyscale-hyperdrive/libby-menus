const faker = require('faker');
const Chance = require('chance');
const fs = require('fs');
const stream = require('stream');

const chance = new Chance();

// to create files to put in db
const createFile = (streamWriter, data, entries) => {
  let i = entries;
  const write = () => {
    let drained = true;
    do {
      i -= 1;
      if (i === 0) {
        streamWriter.write(data());
      } else {
        drained = streamWriter.write(data());
      }
    } while (i > 0 && drained);
    if (i > 0) {
      streamWriter.once('drain', write);
    }
  };
  write();
};

// create file for restaurants table
const restaurantStream = fs.createWriteStream('./data/files/restaurants.csv');
const generateRestaurantData = () => `${faker.lorem.words()}\n`;
createFile(restaurantStream, generateRestaurantData, 100);

// create file for menu_items table
const generateItemName = () => faker.lorem.words();
const generateItemDescription = () => faker.lorem.sentence();
const generateItemPrice = () => chance.floating({ min: 0, max: 200, fixed: 2 });
const generateItemUrl = () => 'https://loremflickr.com/320/240/food'; // fix to use s3 pics

const itemsStream = fs.createWriteStream('./data/files/items.csv');
const generateItemData = () => `${generateItemName()},${generateItemDescription()},${generateItemPrice()},${generateItemUrl()}\n`;
createFile(itemsStream, generateItemData, 20);

// menu_headers table
const headersStream = fs.createWriteStream('./data/files/headers.csv');
generateData = () => `${faker.lorem.word()}\n`;
// createFile(headersStream, 50000000);

// menu_sections table
const sectionArray = ['Breakfast', 'Lunch', 'Dinner', 'Brunch', 'Desserts', 'Drinks', 'Happy Hour'];
const sectionsStream = fs.createWriteStream('./data/files/sections.csv');
generateData = () => `${chance.pickset(sectionArray, Math.floor(Math.random() * (sectionArray.length) + 1)).join(', ')}\n`;
// createFile(sectionsStream, 10000000);

// dietary_restrictions table
const restrictionsArray = ['Vegetarian', 'Vegan', 'Gluten-Free', 'No Seafood', 'No Peanuts'];
const restrictionsStream = fs.createWriteStream('./data/files/restrictions.csv');
generateData = () => `${chance.pickset(restrictionsArray, Math.floor(Math.random() * (sectionArray.length))).join(', ')}\n`;
// createFile(restrictionsStream, 10000000);

// time table
let time = faker.lorem.sentence();
