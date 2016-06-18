"use strict";

var express = require('express');
var User = require('./../models/user');

let router = express.Router();

router.route('/users')

    .post(function (req, res, next) {
        console.log('Create user request');
        let user = new User(req.body);
        user.save()
            .then(user => res.json({message: 'user created!', 'user': user}))
            .catch(next);
    })

    .get(function (req, res, next) {
        console.log('Get users request');
        User.find()
            .then(users => res.json(users))
            .catch(next);
    });

router.route('/users/search')

    .post(function (req, res, next) {
        console.log('Search user request');
        User.find({lastName: new RegExp(req.body.lastName, 'i')})
            .then(user => res.json(user))
            .catch(next);
    });

router.route('/users/:user_id')

    .get(function (req, res, next) {
        console.log('Get user request');
        User.findById(req.params.user_id)
            .then(user => res.json(user))
            .catch(next);
    })

    .put(function (req, res, next) {
        console.log('Modify user request');
        User.findById(req.params.user_id)
            .then(user => user.update(req.body))
            .then(user => res.json({message: 'user updated!'}))
            .catch(next);
    })

    .delete(function (req, res, next) {
        console.log('Delete user request');
        User.remove({_id: req.params.user_id})
            .then(user => res.json({message: 'Successfully deleted'}))
            .catch(next);
    });

module.exports = router;
