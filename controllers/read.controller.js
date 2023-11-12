const pool = require('../config/db');

// Retrieve/Get all courses
exports.getAllCourses = async (req,res) => {
  try {
    const courseData = await pool.query('SELECT * FROM courses');
    res.json(courseData.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};
//Access all 
exports.getAllStudents = async (req, res) => {
    try {
        const allStudents = await pool.query("SELECT * FROM students");
        res.json(allStudents.rows);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Access All grades

exports.getAllGrades = async (req, res) => {
    try {
        const allGrades = await pool.query("SELECT * FROM grades");
        res.json(allGrades.rows);
    } catch (error) {
        res.status(500).json(error);
    }
};


// Access student By ID
exports.getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await pool.query("SELECT * FROM students WHERE id = $1", [studentId]);

        if (student.rows.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student.rows[0]);
    } catch (error) {
        res.status(500).json(error);
    }
};
//Access Grade By id
exports.getGradeById = async (req, res) => {
    try {
        const gradeId = req.params.id;
        const grade = await pool.query("SELECT * FROM grades WHERE id = $1", [gradeId]);

        if (grade.rows.length === 0) {
            return res.status(404).json({ message: "Grade not found" });
        }

        res.json(grade.rows[0]);
    } catch (error) {
        res.status(500).json(error);
    }
};
//Access Course Student Associations
exports.getAllCourseStudentService = async (req, res) => {
    try {
        const allAssociations = await pool.query("SELECT * FROM course_students");
        res.json(allAssociations.rows);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Read Course-Student Association by Course ID and Student ID

exports.getCourseStudentService = async (req, res) => {
    try {
        const { course_id, student_id } = req.params;

        const association = await pool.query(
            "SELECT * FROM course_students WHERE course_id = $1 AND student_id = $2",
            [course_id, student_id]
        );

        if (association.rows.length === 0) {
            return res.status(404).json({ message: "Association not found" });
        }

        res.json(association.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
