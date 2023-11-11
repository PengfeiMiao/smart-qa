CREATE TABLE questions (
   id SERIAL PRIMARY KEY,
   question TEXT NOT NULL,
   options TEXT,
   answer VARCHAR(20),
   vote VARCHAR(255)
);