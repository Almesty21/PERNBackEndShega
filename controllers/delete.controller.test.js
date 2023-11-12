const request = require('supertest');
const express = require('express');
const app = express();


const app = require('../delete.controller'); // Replace 'your-app' with the actual path to your app

describe('DELETE /deleteCourse/:id', () => {
  it('should delete a course by ID', async () => {
    const response = await request(app)
      .delete('/deleteCourse/1'); 
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Course deleted successfully');
  });

  it('should return 404 if course ID is not found', async () => {
    const response = await request(app)
      .delete('/deleteCourse/999'); 
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Course not found');
  });
});

describe('DELETE /deleteStudent/:id', () => {
  it('should delete a student by ID', async () => {
    const response = await request(app)
      .delete('/deleteStudent/1'); // Replace '1' with the actual student ID to delete

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Student deleted successfully');
  });

  it('should return 404 if student ID is not found', async () => {
    const response = await request(app)
      .delete('/deleteStudent/999'); // Use a non-existing student ID

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Student not found');
  });
});

describe('DELETE /deleteGradeById/:id', () => {
  it('should delete a grade by ID', async () => {
    const response = await request(app)
      .delete('/deleteGradeById/1'); // Replace '1' with the actual grade ID to delete

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Grade deleted successfully');
  });

  it('should return 404 if grade ID is not found', async () => {
    const response = await request(app)
      .delete('/deleteGradeById/999'); // Use a non-existing grade ID

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Grade not found');
  });
});