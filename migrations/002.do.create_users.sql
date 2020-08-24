CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    type TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone INTEGER NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    grade INT NOT NULL,
    first_login TIMESTAMPTZ default now(),
    last_login TIMESTAMPTZ default now(),
    subject TEXT,
    intro TEXT,
    profile TEXT
);