const pool = require('../config/db');
const {
	deleteCourse,
    deleteStudent,
    deleteGradeById,
    deleteCourseStudentAssociation
	} = require('../delete.controller'); 
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

//Delete Course-Student Association by Course ID and Student ID

exports.deleteCourseStudentAssociation = async (req, res) => {
    try {
        const { course_id, student_id } = req.params;

        const deletedAssociation = await pool.query(
            "DELETE FROM course_students WHERE course_id = $1 AND student_id = $2 RETURNING *",
            [course_id, student_id]
        );

        if (deletedAssociation.rows.length === 0) {
            return res.status(404).json({ message: "Association not found" });
        }

        res.json({ message: "Association deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

describe('DELETE /deleteCourseStudentAssociation/:course_id/:student_id', () => {
  it('should delete a course-student association by Course ID and Student ID', async () => {
    // Replace '1' and '2' with the actual course_id and student_id to delete
    const response = await request(app).delete('/deleteCourseStudentAssociation/1/2');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Association deleted successfully');
  });

  it('should return 404 if course-student association is not found', async () => {
    // Use non-existing course_id and student_id
    const response = await request(app).delete('/deleteCourseStudentAssociation/999/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Association not found');
  });
});describe('DELETE /deleteCourseStudentAssociation/:course_id/:student_id', () => {
  it('should delete a course-student association by Course ID and Student ID', async () => {
    // Replace '1' and '2' with the actual course_id and student_id to delete
    const response = await request(app).delete('/deleteCourseStudentAssociation/1/2');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Association deleted successfully');
  });

  it('should return 404 if course-student association is not found', async () => {
    // Use non-existing course_id and student_id
    const response = await request(app).delete('/deleteCourseStudentAssociation/999/999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Association not found');
  });
});