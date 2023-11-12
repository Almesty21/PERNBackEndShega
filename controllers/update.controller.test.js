const express = require('express');
const app = express();
const {
    updateCourse,
    updateStudent,
    updateGrade
} = require('../controllers/update.controller');
describe('GET /getAllCourses', () => {
  it('should get all courses', async () => {
    const response = await request(app).get('/getAllCourses');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe('GET /getAllStudents', () => {
  it('should get all students', async () => {
    const response = await request(app).get('/getAllStudents');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe('GET /getAllGrades', () => {
  it('should get all grades', async () => {
    const response = await request(app).get('/getAllGrades');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe('GET /getStudentById/:id', () => {
  it('should get a student by ID', async () => {
    const response = await request(app).get('/getStudentById/1'); 
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should return 404 if student is not found', async () => {
    const response = await request(app).get('/getStudentById/999'); // Use a non-existing ID
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Student not found');
  });
});
