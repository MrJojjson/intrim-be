const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require("morgan");
const session = require('express-session');

const app = express();
const router = express.Router();
const portnum = 8081;
const targetBaseUrl = 'http://localhost:8080/api';

const env = process.env.NODE_ENV || 'dev';

const localDbPath = require('./localDbPath');
const mongoDB = env === 'dev' && localDbPath.mongoDbLocalPath;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", () => console.log("connected to the database"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use(bodyParser.json())
app.use(logger("dev"));

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // var allowedOrigins = [
  //   'http://127.0.0.1:8081',
  //   'http://localhost:8080',
  //   'http://localhost:8080/registration',
  //   'http://localhost:8080/profile',
  //   'http://localhost:8080/api/profile',
  //   'http://localhost:8080/api/registration',
  //   'http://127.0.0.1:8081/api/loginUser'
  // ];

  // var origin = req.headers.origin;
  // console.log('origin', origin);
  // if(allowedOrigins.indexOf(origin) > -1){
  //      res.header('Access-Control-Allow-Origin', origin);
  // }
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Credentials', true);
  
  return next();
});

require('./routers')(router);
app.use("/api", router);

handleRedirect = (req, res) => {
  const targetUrl = targetBaseUrl + req.originalUrl;
  console.log('targetUrl', targetUrl)
  return res.redirect(targetUrl);
}

app.get('*', handleRedirect);

var server = app.listen(portnum, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Content Provider Service listening at http://%s:%s", host, port);
});
