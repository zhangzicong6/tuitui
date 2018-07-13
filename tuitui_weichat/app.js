var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
var weichat = require('./routes/weichat');
var adzone = require('./routes/adzone');
var alipay = require('./routes/alipay');
var piclink = require('./routes/piclink');
var top10 = require('./routes/top10');
var reading = require('./routes/reading');
var youhuiquan = require('./routes/youhuiquan');
var fetchLink = require('./routes/fetchLink');
var goodsInfo = require('./routes/goodsInfo');
var baokuan = require('./routes/baokuan');
var tuiguang = require('./routes/tuiguang');
var qr_code = require('./routes/qr_code');
var transfer = require('./routes/transfer');

var app = express();

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header('Access-Control-Allow-Credentials', true);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'mingxingshuo',
    name: 'xiaoshuo',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 1000*60*60*24 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

app.use('/', index);
app.use('/users', users);
app.use('/weichat',weichat);
app.use('/adzone',adzone);
app.use('/books',books);
app.use('/alipay',alipay);
app.use('/piclink',piclink);
app.use('/top10',top10);
app.use('/reading',reading);
app.use('/youhuiquan',youhuiquan);
app.use('/fetchlink', fetchLink);
app.use('/goodsinfo', goodsInfo);
app.use('/baokuan', baokuan);
app.use('/tuiguang', tuiguang);
app.use('/qr_code', qr_code);
app.use('/transfer', transfer);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
