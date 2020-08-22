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

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

// Set up a whitelist and check against it:
const whitelist = [
  "http://virtual-desk.vercel.app/",
  "https://virtual-desk.vercel.app/",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

//middleware
app.use(morgan(morganOption));
app.use(helmet());
app.use(express.json());
// Pass whitelist to cors:
app.use(cors(corsOptions));

app.use("/help_tickets", ticketsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.use((error, req, res, next) => {
  let response;
  if (NODE_ENV === "production") {
    response = { error: "Internal Service Error" };
  } else {
    console.log(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
