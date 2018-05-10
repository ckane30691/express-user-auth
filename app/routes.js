const userController = require('../controllers').userController;
const sessionController = require('../controllers').sessionController;

module.exports = function(app) {
  //root route
  app.get('/', function(req, res) {
    res.render('static_pages/index');
  });
  app.post('/api/users', userController.create);
  app.post('/api/session', sessionController.create);
  app.delete('/api/session', sessionController.delete);
};
