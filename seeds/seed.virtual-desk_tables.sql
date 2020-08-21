BEGIN;

TRUNCATE   
  "help_tickets",
  "users"  
RESTART IDENTITY CASCADE;

INSERT INTO help_tickets (student_id, subject, question, date_due, faculty_id, ticket_status)
VALUES
  (1, 'math', 'What is math?', '2021-01-11', null, 'NEW'),
  (1, 'science', 'What is science?', '2022-02-22', null, 'NEW'),
  (1, 'history', 'What is history?', '2030-03-30', 2, 'IN PROGRESS'),
  (1, 'math', 'What is math?', '2020-08-13', 2, 'IN PROGRESS'),
  (1, 'science', 'What is science?', '2021-08-21', 2, 'CLOSED'),
  (1, 'history', 'What is history?', '2019-12-08', 2, 'CLOSED');

INSERT INTO users (type, first_name, last_name, phone, email, password, grade)
VALUES  
  ('student', 'Charlie', 'Student', 1231231234, 'fake@student.email.com', 'password', 10),
  ('teacher', 'Sam', 'Smith', 1231231234, 'fake@teacher.email.com', 'password', 10);
  

COMMIT;

