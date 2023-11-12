const request = require('supertest');
const express = require('express');
const app = express();
const {    
    createCourse,
    createStudent,
    createGrade,
    createCourseStudentService} = require('../create.controller'); 

describe('POST /createCourse', () => {
  it('should create a new course', async () => {
    const response = await request(app)
      .post('/createCourse')
      .send({
        title: 'Introduction Electrical and Computer Engineering',
        course_code: 'ECEG101',
        description: 'Fundamental Electrical and Computer Engineering',
        credit_hours: 6,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Course');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/createCourse')
      .send({
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});


describe('POST /createStudent', () => {
  it('should create a new student', async () => {
    const response = await request(app)
      .post('/createStudent')
      .send({
        name: 'Mercy Girma',
        contact_details: 'mihretabgirma21@gmail.com',
        academic_record: 'Second semister First year record',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Test Student');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/createStudent')
      .send({
       
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});


describe('POST /createGrade', () => {
  it('should create a new grade', async () => {
    const newGradeData = {
      letter_grade: 'A',
      course_id: 1,
      student_id: 1,
      academic_period: '2023',
    };

    const response = await request(app)
      .post('/createGrade')
      .send(newGradeData);

    // Assuming the status code for successful creation is 201
    expect(response.statusCode).toBe(201);

    // Assuming your response includes the created grade
    expect(response.body).toHaveProperty('letter_grade', 'A');
    expect(response.body).toHaveProperty('course_id', 1566);
    expect(response.body).toHaveProperty('student_id', 08421);
    expect(response.body).toHaveProperty('academic_period', '2023');
  });

  it('should return 400 if any required field is missing', async () => {
    const invalidGradeData = {
		
    };

    const response = await request(app)
      .post('/createGrade')
      .send(invalidGradeData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'All fields are required.');
  });
});


describe('POST /createCourseStudentService', () => {
  it('should create a new course-student association', async () => {
    const newAssociationData = {
      course_id: 1,
      student_id: 1,
    };

    const response = await request(app)
      .post('/createCourseStudentService')
      .send(newAssociationData);

    // Assuming the status code for successful creation is 201
    expect(response.statusCode).toBe(201);

    // Assuming your response includes the created association
    expect(response.body).toHaveProperty('course_id', 1);
    expect(response.body).toHaveProperty('student_id', 1);
  });

  it('should return 400 if any required field is missing', async () => {
    const invalidAssociationData = {
      // Omitting required fields intentionally
    };

    const response = await request(app)
      .post('/createCourseStudentService')
      .send(invalidAssociationData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'All fields are required.');
  });
});
