/* Creates table Users. */

CREATE TABLE users
(
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    sessionToken text NOT NULL UNIQUE,
    passwordDigest text NOT NULL UNIQUE,
)
