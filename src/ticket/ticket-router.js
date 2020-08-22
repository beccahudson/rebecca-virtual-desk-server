const express = require("express");
const xss = require("xss");
const TicketsService = require("./ticket-service");

const { requireAuth } = require("../middleware/jwt-auth");

const ticketsRouter = express.Router();
const jsonParser = express.json();

const updateTicket = {};

const serializeTicket = (help_tickets) => ({
  id: help_tickets.id,
  subject: xss(help_tickets.subject),
  question: xss(help_tickets.question),
  dueDate: xss(help_tickets.date_due),
  created: help_tickets.date_created,
  assigned: help_tickets.date_assigned,
  closed: help_tickets.date_closed,
  student: help_tickets.student_id,
  faculty: help_tickets.faculty_id,
  ticket_status: help_tickets.ticket_status,
});

// ALL HELP TICKETS
ticketsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    TicketsService.getAllTickets(knexInstance)
      .then((help_tickets) => {
        res.status(200).json(help_tickets.map(serializeTicket));
      })
      .catch(next);
  })
  .post(jsonParser, requireAuth, (req, res, next) => {
    const { subject, question, date_due } = req.body;
    const newTicket = {
      student_id: req.user.id,
      subject,
      question,
      date_due,
      ticket_status: "NEW",
    };

    for (const [key, value] of Object.entries(newTicket))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    TicketsService.createTicket(req.app.get("db"), newTicket)
      .then((help_ticket) => {
        res.status(201).location(`/ticket/${help_ticket.id}`).json(help_ticket);
      })
      .catch(next);
  });

ticketsRouter.route("/by_user").get(requireAuth, (req, res, next) => {
  const knexInstance = req.app.get("db");
  TicketsService.getAllTicketsByUser(knexInstance, req.user.id)
    .then((help_tickets) => {
      res.status(200).json(help_tickets.map(serializeTicket));
    })
    .catch(next);
});

// EACH HELP TICKET
ticketsRouter
  .route("/:id")
  .get((req, res) => {
    res.json(TicketsService.help_tickets);
  })
  .patch(requireAuth, (req, res) => {
    //DETERMINES WHAT TO UPDATE
    {
      ticket_status == "IN PROGRESS"
        ? (updateTicket = {
            faculty_id: req.user.id,
            date_assigned: "NOW()",
            ticket_status: "IN PROGRESS",
          })
        : (updateTicket = {
            faculty_id: req.user.id,
            date_closed: "NOW()",
            ticket_status: "CLOSED",
          });
    }

    TicketsService.updateTicket(
      req.app.get("db"),
      req.params.id,
      updateTicket
    ).then((ticket) => res.status(200).json(serializeTicket(ticket)));
  });

module.exports = ticketsRouter;
