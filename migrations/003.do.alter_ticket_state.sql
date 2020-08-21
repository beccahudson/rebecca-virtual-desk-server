CREATE TYPE IF NOT EXISTS ticket_status AS ENUM (
  "NEW",
  "ASSIGNED",
  "CLOSED"
);

ALTER TABLE help_tickets 
  ADD COLUMN IF NOT EXISTS
    ticket_status ticket_status;
