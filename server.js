var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// const logger = require('./log/logger'); //our logger module
const expressWinston = require('express-winston');
mongoose.Promise = require('bluebird');
var config = require('config');
var cors = require('cors')
//var device = require('express-device');
var app = express();

app.set('superSecret', config.secret);
console
	.log('Secret --> ' + app.get('superSecret'));

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(cors());

// app.use(expressWinston.logger({ // use logger to log every requests
// 	transports: [logger],
// 	meta: false, // optional: control whether you want to log the meta data about the request (default to true)
// 	msg: `{{req.ip}} - {{res.statusCode}} - {{req.method}} - {{res.responseTime}}ms - {{req.url}} - {{req.headers['user-agent']}}`, // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
// 	expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
// 	colorize: true
// }));

var username = config.mongodb.username
var passwd = config.mongodb.password
var dbname = config.mongodb.database

// var mongoDbURL = 'mongodb://' + config.mongodb.server + ':' + config.mongodb.port + '/' + config.mongodb.database;
var mongoDbURL = "mongodb+srv://" + username + ":" + passwd + "@" + config.mongodb.server + "/" + dbname + "?retryWrites=true&w=majority"

console.log(mongoDbURL);
console.log(config.aws);
console.log(app.settings.env + " : " + process.env.IP);

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(mongoDbURL);

var db = mongoose.connection;

require('./api/routes/text.notification.routes')(app);
require('./api/routes/email.notification.routes')(app);

app.get('/', function (req, res) {
	res.json({
		"message": "notifications-api is running successfully"
	});
});

//listen for requests
var port = 4000;
app.listen(port, function () {
	console.log("Express server is listening on port %d in %s mode", port, app.settings.env);
	mongoose.connection.once('open', function () {
		console.log("connecting to mongo")
		console.log('Successfully connected to mongodb..');
	});
});