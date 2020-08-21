const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");

describe.only("Tickets Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    // app.set('db', db)
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db("virtual-desk-test").truncate());

  context("Given there are tickets in the database", () => {
    const testTickets = [
      {
        id: 1,
        student_id: 1,
        date_created: "2029-01-22T16:28:32.615Z",
        subject: "First test post!",
        ticketStatus: "How-to",
        question:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?",
      },
      {
        id: 2,
        student_id: 2,
        date_created: "2100-05-22T16:28:32.615Z",
        subject: "Second test post!",
        ticketStatus: "News",
        question:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.",
      },
      {
        id: 3,
        student_id: 3,
        date_created: "1919-12-22T16:28:32.615Z",
        subject: "Third test post!",
        ticketStatus: "Listicle",
        question:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.",
      },
      {
        id: 4,
        student_id: 4,
        date_created: "1919-12-22T16:28:32.615Z",
        subject: "Fourth test post!",
        ticketStatus: "Story",
        question:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum molestiae accusamus veniam consectetur tempora, corporis obcaecati ad nisi asperiores tenetur, autem magnam. Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam?",
      },
    ];

    beforeEach("insert tickets", () => {
      return db.into("help_tickets").insert(testTickets);
    });

    it("GET /tickets responds with 200 and all of the tickets", () => {
      return supertest(app).get("/help_tickets").expect(200, testTickets);
      // TODO: add more assertions about the body
    });
  });
});
