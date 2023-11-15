const pool = require('../config/db');
// Delete a course by ID
exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const deletedCourse = await pool.query(
            "DELETE FROM courses WHERE id = $1 RETURNING *",
            [courseId]
        );

        if (deletedCourse.rows.length === 0) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//Delete by Id
exports.deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        const deletedStudent = await pool.query("DELETE FROM students WHERE id = $1 RETURNING *", [studentId]);

        if (deletedStudent.rows.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
//Delete Grade By Id

exports.deleteGradeById = async (req, res) => {
    try {
        const gradeId = req.params.id;

        const deletedGrade = await pool.query("DELETE FROM grades WHERE id = $1 RETURNING *", [gradeId]);

        if (deletedGrade.rows.length === 0) {
            return res.status(404).json({ message: "Grade not found" });
        }

        res.json({ message: "Grade deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

