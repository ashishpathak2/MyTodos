var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var Session = require("express-session");
var bodyParser = require("body-parser")
var indexRouter = require('./routes/index');
var UserRouter = require("./routes/users")
var usersRouter = require('./collections/usersModel');
var passport = require('passport');
var monogoStore = require("connect-mongo")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
  origin:["https://my-todos-1koj.vercel.app","https://mytodos.site"],
  // origin:["http://localhost:5173"],
  methods:["GET","POST","DELETE","PUT","OPTIONS"],
  credentials:true
}));
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(Session({
  resave:false,
  saveUninitialized:false,
  secret:"heyashishhere",
  cookie:{
    secure:true,
    // secure:false,
    httpOnly: false,
    sameSite:"none",
    maxAge:24*60*60*1000,
  },
  store:monogoStore.create({
    mongoUrl:"mongodb+srv://pathak1420:pathak1420@cluster0.0qepf.mongodb.net/Mytodos?retryWrites=true&w=majority&appName=Cluster0",
    autoRemove: 'disabled',
    touchAfter: 24 * 3600 ,

  })
}))

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());
app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', UserRouter);

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
