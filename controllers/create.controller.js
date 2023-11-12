const pool = require('../config/db');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, course_code, description, credit_hours } = req.body;

    // Validate data
    if (!title || !course_code || !description || !credit_hours) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const courseData = await pool.query(
      'INSERT INTO courses(title, course_code, description, credit_hours) VALUES($1, $2, $3, $4) RETURNING *',
      [title, course_code, description, credit_hours]
    );

    res.status(201).json(courseData.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, contact_details, academic_record } = req.body;

    // Validate data
    if (!name || !contact_details || !academic_record) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newStudent = await pool.query(
      'INSERT INTO students (name, contact_details, academic_record) VALUES ($1, $2, $3) RETURNING *',
      [name, contact_details, academic_record]
    );

    res.status(201).json(newStudent.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new grade
exports.createGrade = async (req, res) => {
  try {
    const { letter_grade, course_id, student_id, academic_period } = req.body;

    // Validate data
    if (!letter_grade || !course_id || !student_id || !academic_period) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newGrade = await pool.query(
      'INSERT INTO grades (letter_grade, course_id, student_id, academic_period) VALUES ($1, $2, $3, $4) RETURNING *',
      [letter_grade, course_id, student_id, academic_period]
    );

    res.status(201).json(newGrade.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new course-student association
exports.createCourseStudentService = async (req, res) => {
  try {
    const { course_id, student_id } = req.body;

    // Validate data
    if (!course_id || !student_id) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newAssociation = await pool.query(
      'INSERT INTO course_students (course_id, student_id) VALUES ($1, $2) RETURNING *',
      [course_id, student_id]
    );

    res.status(201).json(newAssociation.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
