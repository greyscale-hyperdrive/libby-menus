const mongoose = require('mongoose');
const menusData = require('./data.js');

const mongoURL = process.env.mongoURL || 'mongodb://localhost/cavatable_menus';

mongoose.connect(mongoURL);

const menuSchema = new mongoose.Schema({
  rest_id: Number,
  rest_name: String,
  breakfast: [{
    menu_section: String,
    entries: [{
      name: String,
      desc: String,
      price: String,
      photoUrl: String,
      filter_categories: {},
    }],
  }],
  lunch: [{
    menu_section: String,
    entries: [{
      name: String,
      desc: String,
      price: String,
      photoUrl: String,
      filter_categories: {},
    }],
  }],
  dinner: [{
    menu_section: String,
    entries: [{
      name: String,
      desc: String,
      price: String,
      photoUrl: String,
      filter_categories: {},
    }],
  }],
});

const MenuModel = mongoose.model('menus', menuSchema);

MenuModel.remove({})
  .then(() => MenuModel.insertMany(menusData))
  .then(() => console.log('Successfully stored data in database'))
  .catch(err => console.log(err));

const retrieve = (restaurantId, handleResponse) => {
  MenuModel.find({ rest_id: parseInt(restaurantId) })
    .then(results => handleResponse(null, results))
    .catch(err => handleResponse(err, null));
};

module.exports.retrieve = retrieve;

