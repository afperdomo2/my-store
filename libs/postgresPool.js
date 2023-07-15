const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'felipe',
  password: '123456',
  database: 'my_store',
});

module.exports = pool;
