var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// MONGO
//sudo docker run -p 27017:27017 --name test-mongo -d mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/test-mongo');

var User = require('./app/models/user');

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

router.route('/users')

    .post(function (req, res) {
        console.log('Create user request');
        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'user created!'});
        });

    })

    .get(function (req, res) {
        console.log('Get users request');
        User.find(function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

router.route('/users/search')

    .post(function (req, res) {
        console.log('Search user request');
        User.find({
            lastName: new RegExp(req.body.lastName, 'i')
        }, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });


router.route('/users/:user_id')

    .get(function (req, res) {
        console.log('Get user request');
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    .put(function (req, res) {
        console.log('Modify user request');
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.save(function (err) {
                if (err)
                    res.send(err);
                res.json({message: 'user updated!'});
            });

        });
    })

    .delete(function (req, res) {
        console.log('Delete user request');
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);
            res.json({message: 'Successfully deleted'});
        });
    });


app.use('/api', router);

app.listen(port);
console.log('Listening on ' + port);