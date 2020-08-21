const express = require("express");
const UsersService = require("./user-service");

const { requireAuth } = require("../middleware/jwt-auth");

const usersRouter = express.Router();

const serializeUser = (users) => ({
  id: users.id,
  type: users.id,
  firstName: users.first_name,
  lastName: users.last_name,
  phone: users.phone,
  email: users.email,
  password: users.password,
  firstLogin: users.first_login,
  lastLogin: users.last_login,
  grade: users.grade,
  subject: users.subject,
  intro: users.intro,
  profile: users.profile,
});

//GET ALL USERS
usersRouter.route("/").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  UsersService.getAllUsers(knexInstance)
    .then((users) => {
      res.status(200).json(users.map(serializeUser));
    })
    .catch(next);
});

//GET USERS BY ID
usersRouter.route("/user").get(requireAuth, (req, res, next) => {
  const knexInstance = req.app.get("db");
  UsersService.getById(knexInstance)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

module.exports = usersRouter;
