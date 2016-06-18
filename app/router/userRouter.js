var User = require('./../models/user');

var userRouter = function (router) {

    router.route('/users')
        .post(function (req, res, next) {
            console.log('Create user request');
            var user = new User();
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.save(function (err) {
                if (err)
                    next(err);
                else
                    res.json({message: 'user created!'});
            });
        })

        .get(function (req, res, next) {
            console.log('Get users request');
            User.find(function (err, users) {
                if (err)
                    next(err);
                else
                    res.json(users);
            });
        });

    router.route('/users/search')

        .post(function (req, res, next) {
            console.log('Search user request');
            User.find({
                lastName: new RegExp(req.body.lastName, 'i')
            }, function (err, users) {
                if (err)
                    next(err);
                else
                    res.json(users);
            });
        });

    router.route('/users/:user_id')

        .get(function (req, res, next) {
            console.log('Get user request');
            User.findById(req.params.user_id, function (err, user) {
                if (err)
                    next(err);
                else
                    res.json(user);
            });
        })

        .put(function (req, res, next) {
            console.log('Modify user request');
            User.findById(req.params.user_id, function (err, user) {
                if (err)
                    res.send(err);
                else {
                    user.firstName = req.body.firstName;
                    user.lastName = req.body.lastName;
                    user.save(function (err) {
                        if (err)
                            next(err);
                        else
                            res.json({message: 'user updated!'});
                    });
                }
            });
        })

        .delete(function (req, res, next) {
            console.log('Delete user request');
            User.remove({
                _id: req.params.user_id
            }, function (err, user) {
                if (err)
                    next(err);
                else
                    res.json({message: 'Successfully deleted'});
            });
        });

};

module.exports = userRouter;
