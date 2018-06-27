const faker = require('faker');
const Chance = require('chance');
const fs = require('fs');
const stream = require('stream');

const chance = new Chance();

const createFile = (streamWriter, data, entries) => {
  let i = 0;
  const write = () => {
    let drained = true;
    do {
      i += 1;
      drained = streamWriter.write(data());
    } while (i < entries && drained);
    if (i < entries) {
      streamWriter.once('drain', write);
    }
  };
  write();
};

const createRandomWordsArray = (num) => {
  const restaurantNamesArray = [];
  for (let i = 0; i < num; i += 1) {
    restaurantNamesArray.push(faker.lorem.words());
  }
  return restaurantNamesArray;
};

const restaurantNames = createRandomWordsArray(10000000);
const restaurantItemNames = createRandomWordsArray(1000);

const createRestaurantItemArray = (num) => {
  const restaurantItemArray = [];
  for (let i = 0; i < num; i += 1) {
    restaurantItemArray.push(
      `${restaurantItemNames[i]},`
      + `${faker.lorem.sentence()},`
      + `${chance.floating({ min: 0, max: 200, fixed: 2 })},`
      + `${`https://s3-us-west-1.amazonaws.com/sdc-datatable/menu-item${Math.floor(Math.random() * 1035) + 1}.jpg`}`
    );
  }
  return restaurantItemArray;
};

const restaurantItems = createRestaurantItemArray(restaurantItemNames.length);

const createRestaurantItemsFile = (streamWriter, data) => {
  let i = -1;
  const write = () => {
    let drained = true;
    do {
      i += 1;
      for (let j = 0; j < 15; j += 1) {
        drained = streamWriter.write(`${data[i]},${restaurantItems[Math.floor(Math.random() * restaurantItems.length)]}\n`);
      }
    } while (i < data.length - 1 && drained);
    if (i < data.length - 1) {
      streamWriter.once('drain', write);
    }
  };
  write();
};

const createDietaryRestrictionsFile = () => {
  const dietaryRestrictionsArray = ['Vegetarian', 'Vegan', 'Gluten-Free', 'No Seafood', 'No Peanuts'];
  const generateDietaryRestrictionsData = () => 
    `${restaurantItemNames[Math.floor(Math.random() * restaurantItemNames.length)]},`
      + `${dietaryRestrictionsArray[Math.floor(Math.random() * dietaryRestrictionsArray.length)]}\n`;
  createFile(
    fs.createWriteStream('./data/files/cass_restrictions.csv'),
    generateDietaryRestrictionsData,
    1000);
};

const createMenuSectionsFile = () => {
  const menuSectionsArray = ['Breakfast', 'Lunch', 'Dinner', 'Brunch', 'Desserts', 'Drinks', 'Happy Hour'];
  const generateMenuSectionsData = () => 
    `${menuSectionsArray[Math.floor(Math.random() * menuSectionsArray.length)]},`
    + `${restaurantItemNames[Math.floor(Math.random() * restaurantItemNames.length)]}\n`
  createFile(
    fs.createWriteStream('./data/files/cass_sections.csv'),
    generateMenuSectionsData,
    1000);
};

const createRestaurantHeadersFile = (streamWriter, data) => {
  let i = -1;
  const write = () => {
    let drained = true;
    do {
      i += 1;
      for (let j = 0; j < 3; j += 1) {
        drained = streamWriter.write(
          `${data[i]},`
          + `${faker.lorem.word()}\n`
        );
      }
    } while (i < data.length - 1 && drained);
    if (i < data.length - 1) {
      streamWriter.once('drain', write);
    }
  };
  write();
};

const generateAllData = () => {
  createRestaurantItemsFile(fs.createWriteStream('./data/files/cass_restaurants.csv'), restaurantNames);
  createDietaryRestrictionsFile();
  createMenuSectionsFile();
  createRestaurantHeadersFile(fs.createWriteStream('./data/files/cass_headers.csv'), restaurantNames);
};

generateAllData();
