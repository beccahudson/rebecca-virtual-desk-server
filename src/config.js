module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: !(process.env.NODE_ENV === "test")
    ? process.env.DATABASE_URL
    : process.env.TEST_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
