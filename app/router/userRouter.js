"use strict";

var express = require('express');
var User = require('./../models/user');

let router = express.Router();

router.route('/users')
    .post(function (req, res, next) {
        console.log('Create user request');
        let user = new User(req.body);
        user.save().then(
            user => res.json({message: 'user created!', 'user': user}),
            err => next(err)
        );
    })

    .get(function (req, res, next) {
        console.log('Get users request');
        User.find().then(
            users => res.json(users),
            err => next(err)
        );
    });

router.route('/users/search')

    .post(function (req, res, next) {
        console.log('Search user request');
        User.find({
            lastName: new RegExp(req.body.lastName, 'i')
        }).then(
            user => res.json(user),
            err => next(err)
        );
    });

router.route('/users/:user_id')

    .get(function (req, res, next) {
        console.log('Get user request');
        User.findById(req.params.user_id).then(
            user => res.json(user),
            err => next(err)
        );
    })

    .put(function (req, res, next) {
        console.log('Modify user request');
        User.findById(req.params.user_id).then(
            user => {
                user.update(req.body).then(
                    user => res.json({message: 'user updated!'}),
                    err => next(err)
                );
            },
            err => next(err)
        );
    })

    .delete(function (req, res, next) {
        console.log('Delete user request');
        User.remove({_id: req.params.user_id}).then(
            user => res.json({message: 'Successfully deleted'}),
            err => next(err)
        );
    });


module.exports = router;
