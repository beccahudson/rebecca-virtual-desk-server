const app = require("../src/app");
const knex = require("knex");
const helpers = require("./test-helpers");
const supertest = require("supertest");
const { seedTables } = require("./test-helpers");

describe("Tickets Endpoints", () => {
  let db;

  const { testUsers, testTickets } = helpers.makeTicketsFixtures();

  const testUser = testUsers[0];

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe("GET /help_tickets", () => {
    context("given tickets", () => {
      const bearerToken = helpers.makeBearerToken(testUser);
      beforeEach("insert tickets", () => {
        helpers.seedTables(db, testUsers, testTickets);
      });
      it("should return an array of tickets", () => {
        return supertest(app)
          .get("/help_tickets")
          .set("Authorization", `Bearer ${bearerToken}`)
          .expect(200);
      });
    });
  });

  context("logged in and seeded tables", () => {
    const bearerToken = helpers.makeBearerToken(testUser);
    beforeEach("insert test users", () => {
      return helpers.seedUsers(db, testUsers);
    });
    beforeEach("insert test tickets", () => {
      return helpers.seedTickets(db, testTickets);
    });

    describe("POST /", () => {
      const newTicket = {
        id: 4,
        student_id: 1,
        subject: "spanish",
        question: "What is spanish?",
        date_due: "202-11-11",
        faculty_id: null,
        ticket_status: "NEW",
      };
      it("should return the posted ticket", () => {
        return supertest(app)
          .post("/")
          .set("Authorization", `Bearer ${bearerToken}`)
          .send(newTicket)
          .expect(201);
      });
    });

    describe("PATCH /:id", () => {
      it("should return 400 with missing fields", () => {
        const id = 1;
        return supertest(app)
          .patch(`/help_tickets/:id`)
          .set("Authorization", `Bearer ${bearerToken}`)
          .expect(400, { error: "Needs at least one update field" });
      });
      it("should return a 401 with an id that can't be found", () => {
        const id = 1979;
        return supertest(app)
          .patch("/help_tickets/:id")
          .set("Authorization", `Bearer ${bearerToken}`)
          .send({ subject: "spanish", question: "what is spanish" })
          .expect(401, { error: "Could not find ticket" });
      });
      it("should return a 401 when id doesn't match bearer token", () => {
        const id = 100;
        const bearerToken2 = helpers.makeBearerToken(testUsers[1]);
        const bearerTokenMatchingUser1 = bearerToken2;
        return supertest(app)
          .patch("/help_tickets/:id")
          .set("Authorization", `Bearer ${bearerTokenMatchingUser1}`)
          .send({ subject: "spanish", question: "what is spanish" })
          .expect(401, { error: "Unauthorized request" });
      });
      it("should return 200", () => {
        const id = 1;
        return supertest(app)
          .patch("/help_tickets/:id")
          .set("Authorization", `Bearer ${bearerToken}`)
          .send({ question: "what is spanish" })
          .expect(200);
      });
    });

    describe("GET /", () => {
      it("returns 200 with tickets matching logged in user", () => {
        return supertest(app)
          .get("/")
          .set("Authorization", `Bearer ${bearerToken}`)
          .expect(200);
      });
    });
  });
});
