ALTER TABLE IF EXISTS help_tickets 
  DROP COLUMN IF EXISTS
    ticket_status ticket_status;
    
    DROP TYPE IF EXISTS ticket_status;