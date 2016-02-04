var express = require('express');
var router = express.Router();
var db = require('../db/config');

const DB_NAME = 'sessions';

console.log(':: SESSIONS ::');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'SESSIONS'
    });
});

router.route('/server/api/sessions')
    .get(function (req, res) {
        console.log(':: SESSIONS :: get sessions');
        var sessions = db(DB_NAME);
        res.send(sessions);
    })
    .post(function (req, res) {
        console.log(':: SESSIONS :: insert session');
        db(DB_NAME).insert(req.body).then(function (session) {
            res.send(session);
        }, function (err) {
            // Rejet de la promesse
        });
    });

router.route('/server/api/sessions/:id')
    .get(function (req, res) {
        console.log(':: SESSIONS :: get session / id : ' + req.params.id);
        var session = db(DB_NAME).getById(req.params.id);
        res.send(session);
    })
    .put(function (req, res) {
        console.log(':: SESSIONS :: update session / id : ' + req.params.id);
        var id = req.params.id;
        db(DB_NAME).updateById(id, req.body);
        res.send();
    })
    .delete(function (req, res) {
        console.log(':: SESSIONS :: delete session / id : ' + req.params.id);
        var session = db(DB_NAME).removeById(req.params.id);
        res.send(session);
    });

router.route('/server/api/sessions/past/trainingId/:trainingId')
    .get(function (req, res) {
        console.log(':: SESSIONS :: get past sessions / trainingId : ' + req.params.trainingId);
        var sessions = db(DB_NAME).find({trainingId: req.params.trainingId});
        res.send(sessions);
    });

//
module.exports = router;