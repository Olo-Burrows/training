var express = require('express');
var router = express.Router();
var db = require('../db/config');
var _ = require('underscore');

const DB_NAME = 'sessions';

console.log(':: SESSIONS ::');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'SESSIONS'
    });
});

router.route('/server/api/sessions')
    .get(function(req, res) {
        console.log(':: SESSIONS :: get sessions');
        var sessions = db(DB_NAME);
        var filtred = _(sessions.toArray())
            .chain()
            .sortBy(function(session) {
                return session.date;
            })
            .value();

        res.send(filtred);
    })
    .post(function(req, res) {
        console.log(':: SESSIONS :: insert session');
        db(DB_NAME).insert(req.body).then(function(session) {
            res.send(session);
        }, function(err) {
            // Rejet de la promesse
        });
    });

router.route('/server/api/sessions/:id')
    .get(function(req, res) {
        console.log(':: SESSIONS :: get session / id : ' + req.params.id);
        var session = db(DB_NAME).getById(req.params.id);
        res.send(session);
    })
    .put(function(req, res) {
        console.log(':: SESSIONS :: update session / id : ' + req.params.id);
        var id = req.params.id;
        db(DB_NAME).updateById(id, req.body);
        res.send();
    })
    .delete(function(req, res) {
        console.log(':: SESSIONS :: delete session / id : ' + req.params.id);
        var session = db(DB_NAME).removeById(req.params.id);
        res.send(session);
    });

router.route('/server/api/sessions/trainingId/:trainingId/type/:type')
    .get(function(req, res) {
        var trainingId = req.params.trainingId,
            type = req.params.type;
        console.log(':: SESSIONS :: get sessions by trainingId : ' + trainingId + ' - type : ' + type);

        var sessions = db(DB_NAME);
        var filtred = _(sessions.toArray())
            .chain()
            .where({
                trainingId: trainingId
            })
            .filter(function (session) {
                if (type == 'past') return new Date(session.date) < new Date();
                else if (type == 'coming') return new Date(session.date) >= new Date();
                else {
                    console.warn("Type is undefined");
                    return [];
                }
            })
            .sortBy(function(session) {
                if (type == 'past') return !session.date;
                if (type == 'coming') return session.date;
            })
            .value();

        // console.log(filtred);
        res.send(filtred);
    });

//
module.exports = router;
