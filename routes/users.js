var express = require('express');
var router = express.Router();
var db = require('../db/config');
var _ = require('underscore');

const DB_NAME = 'users';

console.log(':: USERS ::');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('USERS');
});


router.route('/server/api/users')
    .get(function (req, res) {
        console.log(':: USERS :: get users');
        var users = db(DB_NAME);
        res.send(users);
    })
    .post(function (req, res) {
        console.log(':: USERS :: insert user');
        db(DB_NAME).insert(req.body).then(function (user) {
            res.send(user);
        }, function (err) {
            res.status(500).send({ error: err });
        });
    });


router.route('/server/api/users/:id')
    .get(function (req, res) {
        console.log(':: USERS :: get user / id : ' + req.params.id);
        var user = db(DB_NAME).getById(req.params.id);
        res.send(user);
    })
    .put(function (req, res) {
        console.log(':: USERS :: update user / id : ' + req.params.id);
        var id = req.params.id;
        db(DB_NAME).updateById(id, req.body);
        res.send();
    })
    .delete(function (req, res) {
        console.log(':: USERS :: delete user / id : ' + req.params.id);
        var user = db(DB_NAME).removeById(req.params.id);
        res.send(user);
    });


router.route('/server/api/users/role/:role')
    .get(function (req, res) {
        console.log(':: USERS :: get user for role : ' + req.params.role);
        var users = db(DB_NAME);
        var filtred = _(users.toArray())
            .chain()
            .where({
                role: req.params.role
            });
        res.send(filtred);
    });
module.exports = router;
