/* Inserts a new user record. */

INSERT INTO users(name, email, sessionToken, passwordDigest)
VALUES($1, $2, $3, $4)
RETURNING *
