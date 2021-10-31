var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var studentRouter = require('./routes/studentRoutes');
var courseRouter = require('./routes/courseRoutes');
var unitRouter = require('./routes/unitsRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/students', studentRouter);
app.use('/api/courses', courseRouter);
app.use('/api/units', unitRouter)

module.exports = app;
