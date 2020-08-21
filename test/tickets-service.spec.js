const TicketsService = require('../src/ticket/ticket-service')
const knex = require('knex')

describe(`Ticket service object`, function() {
  let db
  
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
})
    describe(`getAllTickets()`, () => {

        it(`resolves all tickets from 'help_tickets' table`, () => {
            // test that TicketService.getAllTickets gets data from table
        })
    })
})