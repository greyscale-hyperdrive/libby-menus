const faker = require('faker');
const Chance = require('chance');
const fs = require('fs');

const chance = new Chance();

// restaurant table
console.time('10000-restaurants')
for (let i = 1; i <= 10000; i += 1) {
  const restaurantName = chance.capitalize(faker.lorem.words());
  fs.appendFile('restaurants.csv', `${i},${restaurantName}\n`, (err) => {
    if (err) throw err;
  });
}
console.timeEnd('10000-restaurants');


// menu_items table
let itemName = chance.capitalize(faker.lorem.words());
let itemDescription = faker.lorem.sentence();
let itemPrice = chance.floating({ min: 0, max: 200, fixed: 2 });
let itemUrl = 'https://loremflickr.com/320/240/food';

// menu_headers table
let menuHeader = chance.capitalize(faker.lorem.word());

// menu_sections table
const sectionArray = ['Breakfast', 'Lunch', 'Dinner', 'Brunch', 'Desserts', 'Drinks', 'Happy Hour'];
let menuSection = chance.pickset(sectionArray);

// dietary_restrictions table
const restrictionsArray = ['Vegetarian', 'Vegan', 'Gluten-Free', 'No Seafood', 'No Peanuts'];
let restriction = chance.pickset(restrictionsArray, Math.floor(Math.random() * (restrictionsArray.length + 1)));

// time table
let time = faker.lorem.sentence();
