CREATE DATABASE IF NOT EXISTS chorebounty;

CREATE TABLE IF NOT EXISTS chores (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR (500),
    point_value INTEGER NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; --extension for complex ID generation

CREATE TABLE IF NOT EXISTS users (
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- SAMPLE DATA

INSERT INTO USERS (user_name, user_email, user_password)
VALUES ('bobsaget69', 'bobsag@email.com', 'abc123');
