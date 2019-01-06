var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
const bodyParser = require('body-parser');

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = config.sicEncDbUrl;
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const prodItemRouter = require('./routes/produtoItemRoute');
var encomendaRouter = require('./routes/encomendaRoute');
const pingRouter = require('./routes/ping');
const itinerarioRouter = require('./routes/itinerarioRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/encomenda', encomendaRouter);
app.use('/itemdeproduto', prodItemRouter);
app.use('/itinerario', itinerarioRouter);
app.use('/ping', pingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
/* experiencia de server
var http = require('http');//create a server object:
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h2> Olá mundo! </h2>'); //end the response
}).listen(8080); //the server object listens on port 8080
*/

let port = 8080;
app.listen(port, () => {
  console.log('Server is running on port number ' + port);
});