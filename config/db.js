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
  .catch((error) => {
    console.error('Error connecting to PostgreSQL:', error.message);
  });
// Assuming you have the letter grades stored in your database for each student

exports.getAnalyticsData = async (req, res) => {
  try {
    const grades = await pool.query('SELECT letter_grade FROM grades');

    grades.filter(grade => grade.letter_grade.toUpperCase() === 'C').length;
    // Fetch data from your database or calculate analytics as needed
    const passed =grades.filter(grade => grade.letter_grade.toUpperCase() === 'C').length;
    const failed = grades.length - passed;

    const courseData = await pool.query(/* SQL query to get course enrollment data */);

    res.json({ passed, failed, courseData });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Note: This is a simplified example. In a real-world scenario, you might have a more complex grading system and criteria for passing.

module.exports = pool;
