CREATE TABLE IF NOT EXISTS chores (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR (500),
    point_value INTEGER NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);