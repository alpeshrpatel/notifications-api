const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('./logger'); //our logger module
const expressWinston=require('express-winston'); // it will help in using logger as middleware

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');

app.use(expressWinston.logger({ // use logger to log every requests
  transports: [logger],
  meta: false, // optional: control whether you want to log the meta data about the request (default to true)
  msg: `{{req.ip}} - {{res.statusCode}} - {{req.method}} - {{res.responseTime}}ms - {{req.url}} - {{req.headers['user-agent']}}`, // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true
}));

app.use('/api', require('./controllers/user/index.js'));
app.listen(process.env.PORT || 5000, () => {
  
});