var express = require('express');
var router = express.Router();
var db = require('../db/config');

const DB_NAME = 'trainings';

console.log(':: TRAININGS ::');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.route('/server/api/trainings')
    .get(function (req, res) {
        console.log(':: TRAININGS :: get trainings');
        var trainings = db(DB_NAME);
        res.send(trainings);
    })
    .post(function (req, res) {
        console.log(':: TRAININGS :: insert training');
        db(DB_NAME).insert(req.body);
    });


router.route('/server/api/trainings/:id')
    .get(function (req, res) {
        console.log(':: TRAININGS :: get 1 training');
        var training = db(DB_NAME).getById(req.params.id);
        res.send(training);
    })
    .put(function (req, res) {
        console.log(':: TRAININGS :: put training');
    })
    .delete(function (req, res) {
        var training = db(DB_NAME).removeById(req.params.id);
        res.send(training);
    });
module.exports = router;