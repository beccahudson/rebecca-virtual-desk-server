const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const AuthService = {
  getUserWithEmail(db, email) {
    // console.log(`AuthService: getUserWithEmail: db, email,: ${db}, ${email}`);
    return db("users").where({ email }).first();
  },
  comparePasswords(password, hash, cb) {
    // console
    //   .log
    //   `AuthService: comparePasswords: password, hash, cb: ${password}, ${hash}, ${cb}`
    // ();
    let match = password === hash;
    cb(match);
  },
  createJwt(subject, payload) {
    // console.log(`AuthService: createJwt: subject, payload, config.JWT_SECRET: ${subject}, ${payload}, ${config.JWT_SECRET}`);
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: "HS256",
    });
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ["HS256"],
    });
  },
};

module.exports = AuthService;
