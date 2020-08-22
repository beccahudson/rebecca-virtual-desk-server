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

// app.options("http://localhost:3000", cors());
// app.get("http://localhost:3000", cors(), function (req, res, next) {
//   res.json({ msg: "This is CORS-enabled for all origins!" });
// });
// app.listen(3000, function () {
//   console.log("CORS-enabled web server listening on port 80");
// });

//middleware
app.use(morgan(morganOption));
app.use(helmet());
app.use(express.json());
app.use(cors());

app.use("/help_tickets", ticketsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.use((error, req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
