const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config/config');

if (!process.env.JWT_SECRET) {
  console.error(
    'ERROR!: Please set JWT_SECRET before running the app. \n',
    ' run: export JWT_SECRET=<some secret string> to set JWTSecret. '
  );
  process.exit();
}

const app = express();

const logger = require('morgan');
app.use(logger('dev'));

// for parsing json and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

// CORS settings for dev
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

//routes
require('./app/routes.js')(app);

const port = config.get('http.port');
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
