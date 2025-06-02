DROP TABLE IF EXISTS platforms CASCADE;
DROP TABLE IF EXISTS games;

CREATE TABLE platforms(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    manufacturer TEXT NOT NULL
);
CREATE TABLE games(
    id SERIAL PRIMARY KEY,
    title TEXT UNIQUE NOT NULL,
    genre TEXT NOT NULL,
    release_year INTEGER NOT NULL,
    platform_id INTEGER NOT NULL,
    FOREIGN KEY (platform_id) REFERENCES platforms(id) ON DELETE CASCADE
);