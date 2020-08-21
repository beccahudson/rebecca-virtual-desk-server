const TicketsService = {
  getAllTickets(db) {
    return db.from("help_tickets").select("*");
  },

  getAllTicketsByUser(db, userID) {
    return db.from("help_tickets").select("*").where("student_id", userID);
  },

  getById(db, id) {
    return TicketsService.getAllTickets(db).where({ id }).first();
  },

  createTicket(db, newTicket) {
    return db
      .insert(newTicket)
      .into("help_tickets")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  updateTicket(db, id) {
    return db("help_tickets")
      .where({ id })
      .update(updateTicket)
      .returning("*")
      .then((rows) => rows[0]);
  },
};

module.exports = TicketsService;
