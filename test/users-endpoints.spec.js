const app = require("../src/app");
const knex = require("knex");
const helpers = require("./test-helpers");
const supertest = require("supertest");
const { expect } = require("chai");

describe("Users Endpoints", () => {
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

  beforeEach("seed tables", () => {
    return helpers.seedTables(db, testUsers, testTickets);
  });

  describe("POST /", () => {
    context("missing key", () => {
      const missingKey = ["email", "password"];
      missingKey.forEach((key) => {
        it(`should return 400 when missing ${key}`, () => {
          let loginUser = {
            email: "fake@student.email.com",
            password: "password",
          };
          delete loginUser[key];
          return supertest(app)
            .post("/users")
            .send(loginUser)
            .expect(400)
            .expect({ error: `Missing ${key} in request body` });
        });
      });
    });

    it("should return 400 when password is less than 8 characters", () => {
      let loginUser = {
        email: "email",
        password: "pass",
      };
      return supertest(app)
        .post("/users")
        .send(loginUser)
        .expect(400)
        .expect({ error: "Password must be longer than 8 characters" });
    });

    it("should return 400 when email is already in use", () => {
      return supertest(app)
        .post("/users")
        .send(testUser)
        .expect(400)
        .expect({ error: "Email address already in use" });
    });

    it("should return 201 when adding valid unique email address", () => {
      let loginUser = {
        email: "fake@student.email.com",
        password: "passwordtest",
      };
      return supertest(app)
        .post("/users")
        .send(loginUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).to.be.an("object");
          expect(res.body.email).to.eql("fake@student.email.com");
        });
    });
  });
});
