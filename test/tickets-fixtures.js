function makeTicketsArray() {
  return [
    {
      student_id: 1,
      subject: "math",
      question: "What is math?",
      date_due: "2021-01-11",
      faculty_id: 2,
      ticket_status: "NEW",
    },
    {
      student_id: 1,
      subject: "science",
      question: "What is science?",
      date_due: "2021-02-22",
      faculty_id: 2,
      ticket_status: "IN PROGRESS",
    },
    {
      student_id: 1,
      subject: "history",
      question: "What is history?",
      date_due: "2021-03-03",
      faculty_id: 2,
      ticket_status: "CLOSED",
    },
  ];
}

function makeMaliciousTicket() {
  const maliciousTicket = {
    student_id: 911,
    subject: "Bad subject",
    question: 'Very bad question <script>alert("xss");</script>',
    date_due: "0-0-0000",
    faculty_id: -2,
    ticket_status: "OPEN",
  };
  const expectedTicket = {
    ...maliciousTicket,
    question: 'Very bad question &lt;script&gt;alert("xss");&lt;/script&gt;',
    ticket_status: "3",
  };
  return {
    maliciousTicket,
    expectedTicket,
  };
}

module.exports = {
  makeTicketsArray,
  makeMaliciousTicket,
};
