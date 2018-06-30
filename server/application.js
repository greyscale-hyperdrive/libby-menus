const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('../database/config');

const app = express();

app.use(morgan('dev', {
  skip: (req, res) => res.statusCode < 400,
  stream: process.stderr,
}));

app.use(morgan('dev', {
  skip: (req, res) => res.statusCode >= 400,
  stream: process.stdout,
}));
<<<<<<< HEAD

app.use(express.json());
=======
>>>>>>> testing

app.use('/restaurant/:restaurantId', express.static(path.join(__dirname, '../public/index.html')));
app.use('/menusBundle.js', express.static(path.join(__dirname, '../public/dist/bundle.js')));

app.get('/menus/restaurant/:restaurantId/menu', (req, res) => {
  const text = `
  SELECT r.rest_name, r.rest_headers, mi.item_id, mi.item_description, mi.item_price, mi.item_url, ms.section_name, dr.restriction_name
  FROM restaurants r
  INNER JOIN restaurant_items ri on r.rest_id = ri.rest_id
  INNER JOIN menu_items mi on ri.item_id = mi.item_id
  INNER JOIN item_section isec on mi.item_id = isec.item_id
  INNER JOIN menu_sections ms on isec.section_id = ms.section_id
  LEFT JOIN item_restrictions ir on mi.item_id = ir.item_id
  LEFT JOIN dietary_restrictions dr on ir.restriction_id = dr.restriction_id
  WHERE r.rest_id = $1;`;
  const values = [req.params.restaurantId];
  db.query(text, values, (err, result) => {
    if (err) {
      res.status(500).json('Unable to retrieve menu data from database');
    } else {
      res.status(200).json(result);
    }
  });
});

app.post('/menus/restaurant/:restaurantId/menu', (req, res) => {
  (async () => {
    const client = await db.connect();

    try {
      await client.query('BEGIN;');
      const { rows } = await client.query(`INSERT INTO menu_items (item_name, item_description, item_price, item_url) VALUES ('${req.body.item_name}', '${req.body.item_description}', '${req.body.item_price}', 'https://s3-us-west-1.amazonaws.com/sdc-datatable/menu-item${Math.floor(Math.random() * (1035)) + 1}.jpg') RETURNING item_id;`);

      await client.query(`INSERT INTO restaurant_items (rest_id, item_id) VALUES ($1, $2);`, [req.params.restaurantId, rows[0].item_id]);

      await client.query(`INSERT INTO item_section VALUES ($1, (SELECT section_id from menu_sections WHERE section_name='${req.body.section_name}'));`, [rows[0].item_id]);

      await client.query(`INSERT INTO item_restrictions VALUES ($1, (SELECT restriction_id from dietary_restrictions WHERE restriction_name='${req.body.restriction_name}'));`, [rows[0].item_id]);

      await client.query('COMMIT;');
    } catch (e) {
      await client.query('ROLLBACK;');
      res.status(500).json('Error posting data');
    } finally {
      client.release();
      res.status(201).json('Data successfully posted');
    }
  })().catch(e => console.error(e.stack));
});

app.put('/menus/restaurant/:restaurantId/menu/price', (req, res) => {
  const text = `UPDATE menu_items SET item_price = ${req.body.item_price} WHERE item_id=${req.body.item_id};`;
  db.query(text, err => {
    if (err) {
      res.sendStatus(500);
      throw err;
    } else {
      res.status(204).json('Data successfully updated');
    }
  });
});

app.delete('/menus/restaurant/:restaurantId/menu', (req, res) => {
  (async () => {
    const client = await db.connect();

    try {
      await client.query('BEGIN;');
      const { rows } = await client.query(`DELETE FROM menu_items WHERE item_id=${req.body.item_id} RETURNING item_id;`);

      await client.query('DELETE FROM restaurant_items WHERE item_id=$1;', [rows[0].item_id]);

      await client.query('DELETE FROM item_section WHERE item_id=$1;', [rows[0].item_id]);

      await client.query('DELETE FROM item_restrictions WHERE item_id=$1;', [rows[0].item_id]);

      await client.query('COMMIT;');
    } catch (e) {
      await client.query('ROLLBACK;');
      res.status(500).json('Error deleting data');
    } finally {
      client.release();
      res.status(200).json('Data successfully deleted');
    }
  })().catch(e => console.error(e.stack));
});

module.exports = app;
