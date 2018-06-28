const express = require('express');
const path = require('path');
const db = require('../database/config');

const app = express();

app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public/index.html')));
app.use('/menusBundle.js', express.static(path.join(__dirname, '../public/dist/bundle.js')));

app.get('/menus/restaurant/:restaurantId/menu', (req, res) => {
  const text = 'SELECT r.rest_name, r.rest_headers, i.item_id, i.item_description, i.item_price, i.item_url, s.section_name, d.restriction_name FROM restaurants r INNER JOIN restaurant_items ri on r.rest_id = ri.rest_id INNER JOIN menu_items i on ri.item_id = i.item_id INNER JOIN item_section si on i.item_id = si.item_id INNER JOIN menu_sections s on si.section_id = s.section_id LEFT JOIN item_restrictions ir on i.item_id = ir.item_id LEFT JOIN dietary_restrictions d on ir.restriction_id = d.restriction_id WHERE r.rest_id = $1;';
  const values = [req.params.restaurantId];
  db.query(text, values, (err, results) => {
    if (err) {
      res.status(500).json('Unable to retrieve menu data from database');
    } else {
      console.log(results);
      res.status(200).json(results);
    }
  });
});

app.post('/menus/restaurant/:restaurantId/menu', (req, res) => {
  db.post(req.params.restaurantId, req.body, (err, results) => {
    if (err) {
      res.sendStatus(500);
      throw err;
    } else {
      res.status(201).json(result);
    }
  })
});

app.put('/menus/restaurant/:restaurantId/menu', (req, res) => {
  db.put(req.params.restaurantId, req.body, (err, results) => {
    if (err) {
      res.sendStatus(500);
      throw err;
    } else {
      res.status(204).json(result);
    }
  })
});

app.delete('/menus/restaurant/:restaurantId/menu', (req, res) => {
  db.delete(req.params.restaurantId, req.body, (err, results) => {
    if (err) {
      res.sendStatus(500);
      throw err;
    } else {
      res.status(200).json(result);
    }
  })
});

module.exports = app;
