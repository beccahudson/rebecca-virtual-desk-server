TRUNCATE "help_tickets","chat_comments","student_users","ttt_users" RESTART IDENTITY CASCADE;

INSERT INTO ttt_users (title, first_name, last_name, phone, email, password, teach_subject, intro, first_login)
VALUES
  ('teacher', 'Sam', 'Smith', 1231231234, 'fake@teacher.email.com', '$2a$12$NPIcTiLQqcmYVCKB/FDPVOa5jiqw.N7vKpo1on1QQRi/3TIsmqBL.', 'math', 'Teacher', now()),
  ('ta', 'Alex', 'Taylor', 1231231234, 'fake@ta.email.com', '$2a$12$BxxvmGuqx8094n0QRxxxI.7xPJlheP5.AVl14IQwwn6HQcvtmi/sW', 'science', 'T.A.', now()),
  ('tutor', 'Ping', 'Won', 1231231234, 'fake@tutor.email.com', '$2a$12$9rjlZPSh14i5AJZ2XcSpn.D.KKgotGkrDw61EURX5SdKiXIGsfjuG', 'history', 'Tutor', now());



SELECT * FROM "student_users" LIMIT 1000;
SELECT * FROM "ttt_users" LIMIT 1000;