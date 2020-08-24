const fixtures = require("./bookmarks-fixtures");
const knex = require("knex");
const app = require("../src/app");

describe.only("Tickets Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => db("help_tickets").truncate());

  afterEach("cleanup", () => db("help_tickets").truncate());

  describe(`Unauthorized requests`, () => {
    const testTickets = fixtures.makeTicketsArray();

    beforeEach("insert ticket", () => {
      return db.into("help_tickets").insert(testTickets);
    });

    it(`responds with 401 Unauthorized for GET /help_tickets`, () => {
      return supertest(app)
        .get("/help_tickets")
        .expect(401, { error: "Unauthorized request" });
    });

    it(`responds with 401 Unauthorized for POST /help_tickets`, () => {
      return supertest(app)
        .post("/help_tickets")
        .send({ title: "test-title", url: "http://some.thing.com", rating: 1 })
        .expect(401, { error: "Unauthorized request" });
    });

    it(`responds with 401 Unauthorized for GET /help_tickets/:id`, () => {
      const secondTicket = testTickets[1];
      return supertest(app)
        .get(`/help_tickets/${secondTicket.id}`)
        .expect(401, { error: "Unauthorized request" });
    });
  });

  describe(`getAllTickets()`, () => {
    it(`resolves all tickets from 'help_tickets' table`, () => {
      // test that TicketService.getAllTickets gets data from table
    });
  });
});
