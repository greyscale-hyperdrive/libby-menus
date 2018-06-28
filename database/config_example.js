const { Pool } = require('pg');

const pool = new Pool({
  user: 'user_here',
  host: 'localhost',
  database: 'menus',
  password: 'password_here', // if none, remove this line
  port: 5432,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
