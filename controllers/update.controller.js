const pool = require('../config/db');

// Update a course by ID
exports.updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const { title, course_code, description, credit_hours } = req.body;

        // Validate input data
        if (!title || !course_code || !description || !credit_hours) {
            return res.status(400).json({ error: "All fields are required for updating a course" });
        }

        const updatedCourse = await pool.query(
            "UPDATE courses SET title = $1, course_code = $2, description = $3, credit_hours = $4 WHERE id = $5 RETURNING *",
            [title, course_code, description, credit_hours, courseId]
        );

        if (updatedCourse.rows.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.json(updatedCourse.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update Student Table
exports.updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const { name, contact_details, academic_record } = req.body;

        // Validate input data
        if (!name || !contact_details || !academic_record) {
            return res.status(400).json({ error: "All fields are required for updating a student" });
        }

        const updatedStudent = await pool.query(
            "UPDATE students SET name = $1, contact_details = $2, academic_record = $3 WHERE id = $4 RETURNING *",
            [name, contact_details, academic_record, studentId]
        );

        if (updatedStudent.rows.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json(updatedStudent.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update Grade by ID
exports.updateGrade = async (req, res) => {
    try {
        const gradeId = req.params.id;
        const { letter_grade, course_id, student_id, academic_period } = req.body;

        // Validate input data
        if (!letter_grade || !course_id || !student_id || !academic_period) {
            return res.status(400).json({ error: "All fields are required for updating a grade" });
        }

        const updatedGrade = await pool.query(
            "UPDATE grades SET letter_grade = $1, course_id = $2, student_id = $3, academic_period = $4 WHERE id = $5 RETURNING *",
            [letter_grade, course_id, student_id, academic_period, gradeId]
        );

        if (updatedGrade.rows.length === 0) {
            return res.status(404).json({ error: "Grade not found" });
        }

        res.json(updatedGrade.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
