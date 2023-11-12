const express = require('express');
const router = express.Router();

// Import your College controller
const {
    createCourse,
    createStudent,
    createGrade,
    createCourseStudentService
} = require('../controllers/create.controller');

const {
    getAllCourses,
    getAllStudents,
    getAllGrades,
    getStudentById,
    getGradeById,
    getAllCourseStudentService,
    getCourseStudentService
} = require('../controllers/read.controller');

const {
    updateCourse,
    updateStudent,
    updateGrade
} = require('../controllers/update.controller');

const {
    deleteCourse,
    deleteStudent,
    deleteGradeById,
    deleteCourseStudentAssociation
} = require('../controllers/delete.controller');

// Define your API endpoints
router.post('/create-course', createCourse);
router.post('/create-student', createStudent);
router.post('/create-grade', createGrade);
router.post('/create-course-student-service', createCourseStudentService);
router.get('/get-all-courses', getAllCourses);
router.get('/get-all-students', getAllStudents);
router.get('/get-all-grades', getAllGrades);
router.get('/get-student/:id', getStudentById);
router.get('/get-grade/:id', getGradeById);
router.get('/get-all-services', getAllCourseStudentService);
router.get('/get-service/:id', getCourseStudentService);
router.put('/update-course/:id', updateCourse);
router.put('/update-student/:id', updateStudent);
router.put('/update-grade/:id', updateGrade);
router.delete('/delete-course/:id', deleteCourse);
router.delete('/delete-student/:id', deleteStudent);
router.delete('/delete-grade/:id', deleteGradeById);
router.delete('/delete-service', deleteCourseStudentAssociation);

module.exports = router;
