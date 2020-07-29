BEGIN;

TRUNCATE
  student_users,
  ttt_users,
  help_tickets,
  chat_comments
  RESTART IDENTITY CASCADE;

INSERT INTO student_users (first_name, last_name, phone, email, password, grade, first_login)
VALUES
  ('Dunder', 'Mifflin', 1231231234, 'fake@studdent.email.com', '$2a$12$9bEQXBIlQQ2mTWD6F6z3o.XR3tGHR.zOqbVAO24R4I7fBZObmhGiG', 4, now()),
  ('Bodeep', 'Deboop', 1231231234, 'fake@student.email.com', '$2a$12$Kb6Z.k0z1lIv4XKyHmIv0ujINf61m3/.Edr15Y7R687cEeTLVEJCy', 8, now()),
  ('Charlie', 'Bloggs', 1231231234, 'fake@student.email.com', '$2a$12$iDRItGKEEsAkPs.r5M/dYekVClXqRovLhTJ8OMXpLjN/d8WwO4Cdy', 10, now());

INSERT INTO ttt_users (title, first_name, last_name, phone, email, password, teach_subject, intro, first_login)
VALUES
  ('teacher', 'Sam', 'Smith', 1231231234, 'fake@teacher.email.com', '$2a$12$NPIcTiLQqcmYVCKB/FDPVOa5jiqw.N7vKpo1on1QQRi/3TIsmqBL.', 'math', 'Teacher', now()),
  ('ta', 'Alex', 'Taylor', 1231231234, 'fake@ta.email.com', '$2a$12$BxxvmGuqx8094n0QRxxxI.7xPJlheP5.AVl14IQwwn6HQcvtmi/sW', 'science', 'T.A.', now()),
  ('tutor', 'Ping', 'Won', 1231231234, 'fake@tutor.email.com', '$2a$12$9rjlZPSh14i5AJZ2XcSpn.D.KKgotGkrDw61EURX5SdKiXIGsfjuG', 'history', 'Tutor', now());

 

INSERT INTO help_tickets (student_id, ttt_id, help_subject, question, set_state)
VALUES
  (1, 1, 'math', 'What is math?'),
  (3, 2, 'science', 'What is science?'),
  (2, 3, 'history', 'What is history?');

INSERT INTO chat_comments (ticket_id, student_id, ttt_id, content, set_state)
VALUES
  (
    1,2,3,
    'This post is amazing'
  ),
  (
    1,2,3,
    'Yeh I agree it''s amazing'
  ),
  (
    1,2,3,
    'I would go so far as to say it''s double amazing'
  ),
  (
    2,1,2,
    'A-mazing!'
  ),
  (
    2,2,1,
    'That''s some interesting lorems you raise'
  ),
  (
    2,1,1,
    'Yeh totally I''d never thought about lorems like that before'
  ),
  (
    3,2,1,
    'So you''re saying consectetur adipisicing elit?'
  ),
  (
    3,3,3,
    'Sixth? You mean sith?!!'
  ),
  (
    4,1,2,
    'What do you call an evil procrastinator? Darth Later! Hahahahaha!'
  ),
  (
    4,1,2,
    'Ten ten ten ten ten ten ten!'
  );
  

COMMIT;

