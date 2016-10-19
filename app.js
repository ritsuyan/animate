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
var router = require('express').Router();
var config = require('./config');
mongoose.connect(config.mongodb);

// passport setup
/*
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
*/
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





var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: '用户名不存在.' });
            }
            console.log(user)
            if (!user.validPassword(password)) {    // mean the user post pwd
                return done(null, false, { message: '密码不匹配.' });
            }


            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {//保存user对象
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    done(null, user);//可以通过数据库方式操作
});



//app.get('/', routes.index);
app.post('/account/login',
    passport.authenticate('local', {
        successRedirect: '/home/profile',
        failureRedirect: '/'
    }));

app.all('/home/profile', isLoggedIn);
//app.get('/users', user.list);
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}