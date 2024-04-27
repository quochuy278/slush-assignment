-- Create the User table
CREATE TABLE users (
  id SERIAL PRIMARY KEY, -- Auto-incrementing integer for unique ID
  name VARCHAR(255) NOT NULL, -- User's name
  email VARCHAR(255) NOT NULL UNIQUE, -- User's email (unique)
  password VARCHAR(255) NOT NULL -- Hashed password
);

-- Create the Todo table
CREATE TABLE todos (
  id SERIAL PRIMARY KEY, -- Auto-incrementing integer for unique ID
  name VARCHAR(255) NOT NULL, -- Name of the todo item
  description TEXT, -- Optional description for the todo item
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Timestamp of creation
  ready BOOLEAN DEFAULT FALSE, -- Indicates if the todo is completed
  user_id INTEGER REFERENCES users(id) NOT NULL, -- Foreign key referencing the user who owns the todo
  UNIQUE (name, user_id) -- Enforce unique todo names per user (optional)
);