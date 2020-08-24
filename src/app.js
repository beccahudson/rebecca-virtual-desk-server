require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const usersRouter = require("./user/user-router");
const ticketsRouter = require("./ticket/ticket-router");
const authRouter = require("./auth/auth-router");

const app = express();

const morganSetting = process.env.NODE_ENV === "production" ? "tiny" : "common";

//middleware
app.use(morgan(morganSetting));
app.use(helmet());
app.use(express.json());
app.use(cors());

app.use("/help_tickets", ticketsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { error };
  }
  res.status(500).json(response);
});

module.exports = app;
