const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'adquisicion',
  password: '10475442',
  port: 5432,
});

module.exports = pool;
