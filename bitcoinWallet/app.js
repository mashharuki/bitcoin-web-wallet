/**
 * メインとなるAPPファイル
 */

// 必要なモジュールをインポートする。
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const routes = require('./routes/index');
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');
const setUser = require('./setUser');
const send = require('./routes/send');
const app = express();
const engine = require('ejs-locals');

// nodeサーバーについて設定する。
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// ルーティングを設定
app.use('/', setUser, routes);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/send', send);

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
// 外部に公開する。
module.exports = app;
