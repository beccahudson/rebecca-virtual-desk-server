/* eslint-disable no-console */
const knex = require("knex");
const app = require("./app");
const { PORT, NODE_ENV, DATABASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});

app.set("db", db);
app.set("port", PORT);

app.listen(PORT, () => {
  console.log(
    `Server is listening in ${NODE_ENV} mode at http://localhost:${PORT}`
  );
});
