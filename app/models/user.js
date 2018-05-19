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

    resetSessionToken(user) {
      let token = createJWToken();
      user.sessionToken = token;
      return this.update(user, token).then(() => token);
    }

    // Plain text passwords bad, hashed & salted passwords good
    setPassword(password) {
      return bcrypt.hashSync(password, saltRounds);
    }

    //checks if a password matches the pword hash saved
    isPassword(password, user) {
      if (user.passworddigest !== undefined) {
        return bcrypt.compare(password, user.passworddigest).then(res => {
          return res == true;
        });
      } else {
        return false;
      }
    }

    findBySessionToken(token) {
      return this.db.oneOrNone('SELECT * FROM users WHERE sessiontoken = $1', token)
      .catch(err => {
        console.log(err);
      });
    }

    // Tries to find a user from name
    findByEmail(email) {
      return this.db.oneOrNone('SELECT * FROM users WHERE email = $1', email);
    }

    // Tries to find a user from id;
    findById(id) {
        return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', +id);
    }


    // Drops the user table from db;
    dropTable() {
        return this.db.none(sql.drop);
    }

    // Removes all records from the user table;
    emptyTable() {
        return this.db.none(sql.empty);
    }

    // Updates an existing users attributes
    update(user, token) {
      return this.db.result('UPDATE users SET sessiontoken = $1 WHERE email = $2 RETURNING sessiontoken', [token, user.email]).then(result => console.log("Result from db", result));
    }

    // Adds a new user, and returns the new object;
    add(user) {
        return this.db.one(sql.add, [user.name, user.email, user.sessionToken, user.passwordDigest]);
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    remove(id) {
        return this.db.result('DELETE FROM users WHERE id = $1', +id, r => r.rowCount);
    }

    // Returns all user records;
    all() {
        return this.db.any('SELECT * FROM users');
    }

    // Returns the total number of users;
    total() {
        return this.db.one('SELECT count(*) FROM users', [], a => +a.count);
    }
}

module.exports = Users;
