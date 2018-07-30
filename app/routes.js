const usersController = require('./controllers').usersController;
// const sessionController = require('./controllers').sessionController;

module.exports = function(app) {
  //root route
  app.get('/', function(req, res) {
    res.render('static_pages/index');
  });
  app.post('/api/users', usersController.create);
  // app.post('/api/session', sessionController.create);
  // app.delete('/api/session', sessionController.delete);
};
