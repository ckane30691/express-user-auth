const sql = require('../../db/sql').users;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const createJWToken = require('../../config/auth').createJWToken;

class Users {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    createUser(payload) {
      if (this.validatePasswordFormat(payload.password) === true &&
      this.validateEmailFormat(payload.email) === true) {
        let hash = this.setPassword(payload.password);
        const user = {
          name: payload.name,
          email: payload.email,
          passwordDigest: hash,
          sessionToken: ''
        };
        return this.isDuplicateUser(user).then(bool => {
          if (bool === false) {
            return user;
          } else {
            return "duplicate";
          }
        });
      } else {
        return Promise.resolve(null);
      }
    }
}
