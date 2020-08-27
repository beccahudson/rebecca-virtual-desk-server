# Virtual Desk: Get Help NOW

## Rebecca Hudson

[Virtual Desk Live Site](https://virtual-desk.vercel.app/)

## Table of Contents

1. Need
2. Description
3. How It Works
4. Client Documentation/Screenshots
5. API Documentation
   - POST Auth Endpoint
   - GET Ticket Endpoints
   - POST Ticket Endpoints
   - PATCH Ticket Endpoints
   - GET User Endpoints
6. Technologies
7. Link to API repo

---

## Need

Virtual students have always dealt with issues getting help with assignments within 48 hours; leaving them stressed and consistently getting behind. Virtual Teachers carry a big role with many students and do the best that they can.

With the state of our nation, dealing with a pandemic forcing families to stay home, so many of them are enrolling their children into the virtual environment. 48 hours+ will become the norm and our children will never catch up.

---

## Description

Virtual Desk is an app for students to get help more efficiently from a pool of approved resources such as teachers and teacher assistants. Not only will students be able to get help faster, it will also free the teachers from being the only available source for students to seek help.

---

## How It Works

As the student, I can:

- Can use my school district's student email and password to login
- View my "Help Queue" listing all New tickets, In Progress and Closed tickets.
- Open a help ticket by completing a form containing: subject, question and a due date for the assignment or project.
- Close a help ticket when I am satisfied with the help.

As the teacher, I can:

- Can use my school district's teacher email and password to login
- View my "Help Queue" with a list of all current New tickets, In Progress and Closed tickets.
- Find a help ticket that I can pick up containing: subject, question and a due date of when the assignment or project.
- Close a help ticket when the student is satisfied with their help.

---

## Client Documentation/Screenshots

1. **Welcome Page** - Click "Login" from the welcome page.

![Welcome Page](https://github.com/beccahudson/rebecca-virtual-desk-client/blob/master/public/static/screenshots/welcome-page.png?raw=true)

2. **Login Page** - Login with given credentials; this will be an email and a password.

![Login Page](https://github.com/beccahudson/rebecca-virtual-desk-client/blob/master/public/static/screenshots/login-page.png?raw=true)

### Student Views

3. **Help Ticket Queue - Students View** - Students you can view new, in progress and closed tickets. You can also choose to open a new ticket or click on a ticket for more information.

![Students Help Ticket Page](https://github.com/beccahudson/rebecca-virtual-desk-client/blob/master/public/static/screenshots/student-help-ticket-page.png?raw=true)

4. **New Ticket Form - Students Only** - Fill out form and "Raise your hand" for help.

![Students New Help Ticket Form](https://github.com/beccahudson/rebecca-virtual-desk-client/blob/master/public/static/screenshots/student-new-ticket-form.png?raw=true)

5. **View NEW Ticket Info - Students View** - Recaps ticket information and lets you know the current ticket progress.

![Students New Help Ticket Form](https://github.com/beccahudson/rebecca-virtual-desk-client/blob/master/public/static/screenshots/student-view-ticket-green.png?raw=true)

6. **View IN PROGRESS Ticket Info - Students View** - Recaps ticket information and lets you know who picked up your ticket. You can also choose to close the ticket.

![Students New Help Ticket Form](https://github.com/beccahudson/rebecca-virtual-desk-client/blob/master/public/static/screenshots/student-view-ticket-yellow.png?raw=true)

7. **View CLOSED Ticket Info - Students View** - Recaps ticket information and leaves information on when ticket was closed.

![Students New Help Ticket Form](https://github.com/beccahudson/rebecca-virtual-desk-client/blob/master/public/static/screenshots/view-ticket-red.png?raw=true)

### Teacher Views

8. **Help Ticket Queue - Teacher View** - Teachers you can view new student tickets, tickets that they you have picked up and closed tickets. Click on a ticket for more information.

![Teachers Help Ticket Page](https://github.com/beccahudson/rebecca-virtual-desk-client/blob/master/public/static/screenshots/teacher-help-ticket-page.png?raw=true)

9. **View New Ticket Info - Teachers View** - Recaps ticket information and allows you to "Pick Up" a student's ticket.

![Students New Help Ticket Form](https://github.com/beccahudson/rebecca-virtual-desk-client/blob/master/public/static/screenshots/teacher-view-ticket-green.png?raw=true)

10. **View IN PROGRESS Ticket Info - Teachers View** - Recaps ticket information and show when you picked up the ticket. You can also choose to close the ticket.

![Students New Help Ticket Form](https://github.com/beccahudson/rebecca-virtual-desk-client/blob/master/public/static/screenshots/teacher-view-ticket-yellow.png?raw=true)

11. **View CLOSED Ticket Info - Teachers View** - Recaps ticket information and leaves information on when ticket was closed.

![Students New Help Ticket Form](https://github.com/beccahudson/rebecca-virtual-desk-client/blob/master/public/static/screenshots/view-ticket-red.png?raw=true)

---

## API Documentation

### POST Auth Endpoint

#### Submit User Credentials

Returns JSON data containing auth token

- **URL**

  `/auth/login`

- **Method**

  `POST`

- **URL Params**

  None

- **Data Params**

  - **Required:** `{email, password}`

- **Success Response**

  - **Code:** 200
  - **Content:** `{authToken: token}`

- **Error Response**

  - **Code:** 400
  - **Content:** `{error: "Missing '${key}' in body"}`

    OR

  - **Code:** 400
  - **Content:** `{error: "Incorrect email or password"}`

    OR

  - **Code:** 401
  - **Content:** `{error: 'User not found'}`

---

### GET Ticket Endpoints

#### Retrieve all Help Tickets

Returns 200 and JSON data about all tickets

- **URL**

  `/help_tickets`

- **Method**

  GET

- **URL Params**

  None

- **Data Params**

  - **Required:** None

- **Success Response**

  - **Code:** 200
  - **Content:** `{id, subject, question, dueDate, created, assigned, closed, student, faculty, ticket_status}`

- **Error Response**

  - **Code:** 400

    OR

  - **Code:** 401
  - **Content:** `{error: 'Unauthorized'}`

<p>&nbsp;</p>

#### Retrieve Help Tickets by User

Returns 200 and JSON data about tickets by user

- **URL**

  `/help_tickets/by_user`

- **Method**

  GET

- **URL Params**

  None

- **Data Params**

  - **Required:** `{Authorization", Bearer ${bearerToken}}`

- **Success Response**

  - **Code:** 200
  - **Content:** `{id, subject, question, dueDate, created, assigned, closed, student, faculty, ticket_status}`

- **Error Response**

  - **Code:** 400

    OR

  - **Code:** 401
  - **Content:** `{error: 'Unauthorized'}`
  <p>&nbsp;</p>

#### Retrieve Help Ticket by id

Returns 200 and JSON data about selected ticket

- **URL**

  `/help_tickets/:id`

- **Method**

  GET

- **URL Params**

  - **Required:** `id = <integer>`

- **Data Params**

  - **Required:** `{Authorization", Bearer ${bearerToken}}`

- **Success Response**

  - **Code:** 200
  - **Content:** `{id, subject, question, dueDate, created, assigned, closed, student, faculty, ticket_status}`

- **Error Response**

  - **Code:** 400

    OR

  - **Code:** 401
  - **Content:** `{error: 'Unauthorized'}`

---

### POST Ticket Endpoints

#### Add a Help Ticket

Returns 201 and JSON data about new ticket

- **URL**

  `/help_tickets`

- **Method**

  POST

- **URL Params**

  None

- **Data Params**

  - **Required:** `{ subject, question, date_due }`
  - **Required:** `{Authorization", Bearer ${bearerToken}}`

- **Success Response**

  - **Code:** 201
  - **Content:** `{ id, subject, question, dueDate, created, assigned, closed, student, faculty, ticket_status }`

- **Error Response**

  - **Code:** 400
  - **Content:** `{error: "Missing '${key}' details in body"}`

    OR

  - **Code:** 401
  - **Content:** `{error: 'Unauthorized'}`

---

### PATCH Ticket Endpoints

#### Edit Ticket in Student's help queue

Returns 200 OK

- **URL**

  `/:id`

- **Method**

  `PATCH`

- **URL Params**

  - **Required:** `id = <integer>`

- **Data Params**

  - **Required:**`{faculty_id, date_assigned, ticket_status}`
  - **Required:** `{Authorization", Bearer ${bearerToken}}`

- **Success Response**

  - **Code:** 200

- **Error Response**

  - **Code:** 400
  - **Content:** `{error: 'Could not find ticket'}`

    OR

  - **Code:** 401
  - **Content:** `{error: 'Unauthorized'}`

---

### GET User Endpoints

#### Retrieve all Users

Returns 201 and JSON data about all users

- **URL**

  `/users`

- **Method**

  `GET`

- **URL Params**

  - **Required:** None

- **Data Params**

  - **Required:** None

- **Success Response**

  - **Code:** 201
  - **Content:** `{id, type, firstName, lastName, phone, email, password, firstLogin, lastLogin, grade, subject, intro, profile}`

- **Error Response**

  - **Code:** 400
  - **Content:** `{error: 'Missing ${key} in request body'}`

    OR

  - **Code:** 400
  - **Content:** `{error: 'Email address already in use'}`

#### Retrieve Users by id

Returns 201 and JSON data about a user

- **URL**

  `/users/user`

- **Method**

  `GET`

- **URL Params**

  - **Required:** None

- **Data Params**

  - **Required:** `user = <integer>`

- **Success Response**

  - **Code:** 201
  - **Content:** `{id, type, firstName, lastName, phone, email, password, firstLogin, lastLogin, grade, subject, intro, profile}`

- **Error Response**
  - **Code:** 401
  - **Content:** `{error: 'Unauthorized'}`

---

## Technologies

Virtual Desk is built using the PERN stack, which includes PostgreSQL, Express, React and Node.

## Links

[Github API Repo](https://github.com/beccahudson/rebecca-virtual-desk-client)
