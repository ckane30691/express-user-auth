const db = require('../db');

module.exports = {
  create(req, res) {
    // get user by email & password combo
    let user = db.users.findByCredentials(req.body.user.email, req.body.user.password)
    .then(user => {
      if (user !== null) {
        login(req, res, user).then(token => {
          req.session.token = token;
          res.render('static_pages/index', { currentUser: JSON.stringify(res.locals.currentUser) });
        });
      } else {
        res.status(404).send({
          success: false,
          message: 'invalid credentials'
        });
      }
    });
  },

  destroy(req, res) {
    let token = req.headers.token
      || req.body.token
      || req.query.token
      || req.headers['x-access-token']
      || req.session.token;
      if (token === null) {
        res.status(403).send({
          success: false,
          message: 'You must be logged in to log out token was null'
        });
      } else {
        let user = db.users.findBySessionToken(token).then(user => {
          if (user !== null) {
            logout(res, user);
            res.session = null;
            res.json({
              success: true,
              message: 'You\'ve logged out',
              token: null
            });
          } else {
            res.status(403).send({
              success: false,
              message: 'You must be logged in to log out user was null'
            });
          }
        });
      }
  }
};
