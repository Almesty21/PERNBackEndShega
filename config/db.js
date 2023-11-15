const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Attempt to connect to the PostgreSQL database
pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
 
module.exports = pool;
