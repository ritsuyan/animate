var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var multipart = require('connect-multiparty');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var authRequired = require('./utils/auth-required.js');
var hbs = require('hbs');
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('./models/user');
var config = require('./config');
mongoose.connect(config.mongodb);

// passport setup
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var app = express();

app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
require('./utils/hbs-helper')(hbs);

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(multipart({uploadDir: __dirname + '/public/uploads'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'hello! TMY', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./utils/locals'));

app.use('/', require('./routes/home'));
app.use('/account', require('./routes/account'));
app.use('/admin', authRequired, require('./routes/admin'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// run!
app.listen(app.get('port'), function() {
    console.log('listening on port ' + app.get('port'));
});


// test
//var Cat = mongoose.model({
//       name:String,
//       age : Number,
//});
//var kitt = new Cat({name:'Ritsu',age:26});
//kitt.save(function (err) {
//    if(err)return;
//})
