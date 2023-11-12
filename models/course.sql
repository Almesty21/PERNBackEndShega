CREATE DATABASE college;

-- Create the "Courses" table

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  course_code TEXT NOT NULL,
  description TEXT NOT NULL,
  credit_hours INTEGER NOT NULL
);

-- Create the "Students" table

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  contact_details TEXT NOT NULL,
  academic_record TEXT NOT NULL
);

-- Create the "Grades" table

CREATE TABLE grades (
  id SERIAL PRIMARY KEY,
  letter_grade TEXT NOT NULL,
  course_id INTEGER REFERENCES courses(id),
  student_id INTEGER REFERENCES students(id),
  academic_period TEXT NOT NULL
);

CREATE TABLE course_students (
  course_id INTEGER REFERENCES courses(id),
  student_id INTEGER REFERENCES students(id),
  PRIMARY KEY (course_id, student_id)
);
