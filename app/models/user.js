const sql = require('../../db/sql').users;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const createJWToken = require('../../config/auth').createJWToken;

class Users {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }
}
