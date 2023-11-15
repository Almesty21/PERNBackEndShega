const express = require("express");
const app = express();
const cors = require("cors");
const collegeRoutes = require('./routes/college.routes');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/colleges', collegeRoutes);
// API endpoint to fetch analytics data
app.get('/api/analytics', async (req, res) => {
  try {
    // Fetch data related to courses, students, and grades
    const result = await pool.query(`
      SELECT
        courses.course_name,
        COUNT(students.id) AS total_students,
        SUM(CASE WHEN grades.grade = 'Pass' THEN 1 ELSE 0 END) AS pass_count,
        SUM(CASE WHEN grades.grade = 'Fail' THEN 1 ELSE 0 END) AS fail_count
      FROM
        courses
        JOIN students_courses ON courses.id = students_courses.course_id
        JOIN students ON students_courses.student_id = students.id
        LEFT JOIN grades ON students.id = grades.student_id AND courses.id = grades.course_id
      GROUP BY
        courses.course_name
    `);

    const analyticsData = result.rows.map(row => ({
      course: row.course_name,
      totalStudents: parseInt(row.total_students),
      passCount: parseInt(row.pass_count),
      failCount: parseInt(row.fail_count),
    }));

    res.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
