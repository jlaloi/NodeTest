"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// MONGO
// sudo docker run -p 27017:27017 --name test-mongo -d mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/test-mongo');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 9090;
var router = express.Router();

router.use(function (req, res, next) {
    console.log('New Request');
    next();
});

router.get('/', function (req, res) {
    res.json({message: 'Hello!'});
});

require('./app/router/userRouter')(router);

app.use('/api', router);

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).json({'error': err});
});

app.listen(port);
console.log('Listening on ' + port);