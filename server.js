const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require("morgan");
const session = require('express-session')

const post = require('./setters/post');
const get = require('./getters/get');
const login = require('./helpers/login');

const app = express();
const router = express.Router();
const portnum = 8081;

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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post("/newUser", login.requireLogin, (req, res) => {
  return post.user(req, res);
});

router.get("/getData", (req, res) => {
  return get.data(res);
});

app.use("/api", router);

var server = app.listen(portnum, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Content Provider Service listening at http://%s:%s", host, port);
});
