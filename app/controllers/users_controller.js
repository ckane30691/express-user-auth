const db = require('../../db');
const createJWToken = require('../../config/auth').createJWToken;

module.exports = {
  create(req, res) {
    let user = db.users.createUser(req.body.user).then(user => {
        // we create a tempToken here so that our validation passes on the token check below
        // ensures a user is never sent to db with a blank token
        let tempToken = createJWToken();
        if (user === null) {
          res.status(403).send({
            success: false,
            message: 'Please enter a properly formatted email & password'
          });
        } else if (user === "duplicate") {
          res.status(403).send({
            success: false,
            message: 'looks like you\'ve already registered that email'
          });
        } else if (db.users.save(user, tempToken) === true) {
          login(req, res, user).then(token => {
            req.session.token = token;
            res.render('static_pages/index', { currentUser: JSON.stringify(res.locals.currentUser) });
          });
        }
      });
  }
};
