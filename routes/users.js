var express = require('express');
var router = express.Router();
var db = require('../db/config');

const DB_NAME = 'users';

console.log(':: USERS ::');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.route('/server/api/users')
    .get(function (req, res) {
        console.log(':: USERS :: get users');
        var users = db(DB_NAME);
        res.send(users);
    })
    .post(function (req, res) {
        console.log(':: USERS :: insert user');
        db(DB_NAME).insert(req.body);
    });


router.route('/server/api/users/:id')
    .get(function (req, res) {
        console.log(':: USERS :: get user / id : ' + req.params.id);
        var user = db(DB_NAME).getById(req.params.id);
        res.send(user);
    })
    .put(function (req, res) {
        console.log(':: USERS :: update user / id : ' + req.params.id);
        var id = req.params.id,
            user = req.body;
        var upUser = db(DB_NAME).updateById(id, user);
        res.send(upUser);
    })
    .delete(function (req, res) {
        console.log(':: USERS :: delete user / id : ' + req.params.id);
        var user = db(DB_NAME).removeById(req.params.id);
        res.send(user);
    });
module.exports = router;