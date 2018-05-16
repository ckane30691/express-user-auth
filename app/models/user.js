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

    save(user, token) {
      user.sessionToken = token;
      if (user.name !== undefined
        && user.email !== undefined
        && user.sessionToken !== ''
        && user.passwordDigest !== undefined) {
          this.add(user);
          return true;
        } else {
          return false;
        }
      }

      // Creates the user table in a blank db;
    createTable() {
        return this.db.none(sql.create);
    }

    isDuplicateUser(user) {
      return this.findByEmail(user.email).then(dupUser => {
        return dupUser !== null ? true : false;
      });
    }

    //validates input and looks up user by email and password
    findByCredentials(email, password) {
      if (this.validatePasswordFormat(password) === true &&
      this.validateEmailFormat(email) === true) {
        return this.findByEmail(email)
        .then(user => {
          if (user === null) {
            return null;
          } else {
            return this.isPassword(password, user) ? user : null;
          }
        });
      } else {
        return Promise.resolve(null);
      }
    }

    // password must be longer than 7 characters
    validatePasswordFormat(password) {
      if (password === undefined) return false;
      if (password.length < 7) return false;
      return true;
    }

    // regex taken from http://emailregex.com/
    validateEmailFormat(email) {
      if (email === undefined) return false;
      return(
        email.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === -1 ? false : true
      );
    }
}
