var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const logger = require("morgan");
const Data = require("./data");

var app = express();
const router = express.Router();

var portnum = 8081;

//Import the mongoose module
//Set up default mongoose connection
var mongoDB = 'mongodb://<user>:<password>@ds125125.mlab.com:25125/intrim';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", () => console.log("connected to the database"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use(bodyParser.json())
app.use(logger("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/putData", (req, res) => {
  let data = new Data();
  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use("/api", router);

// Start the REST service
var server = app.listen(portnum, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Content Provider Service listening at http://%s:%s", host, port);
});
