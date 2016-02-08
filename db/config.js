// DB
const low = require('lowdb');
const storage = require('lowdb/file-async');

const db = low('_data/db.json', { storage: storage });
db._(require('underscore'));
db._.mixin(require('underscore-db'));

//const _   = require('underscore');
//const _db = require('underscore-db');
//_.mixin(_db);


//console.log(module);

(function (db) {
    console.log(':: DB CONFIG :: trainings');
//    console.log(db);

    var trainings = db('trainings');
    console.log(':: DB CONFIG :: trainings size');
    console.log(trainings.size());

    if (trainings.size() == 0) {
        console.log(':: DB CONFIG :: init trainings');

        db('trainings').insert({
//            id: 0,
            name: "AngularJS",
            description: "La formation AngularJS est top !",
            link: "https://git.softeam.fr/angularjs-formation",
            duration: 3
        });
        db('trainings').insert({
//            id: 1,
            name: "Java POO",
            description: "Formation à Java et la programmation orientée objets.",
            link: "https://git.softeam.fr/java-poo-formation",
            duration: 4
        });
        db('trainings').insert({
//            id: 2,
            name: "JSF2",
            description: "Formation JSF2 pour tout savoir sur JavaServer Faces v2.",
            link: "https://git.softeam.fr/jsf2-formation",
            duration: 2
        });
        db('trainings').insert({
//            id: 3,
            name: "Formation HTML JavaScript",
            description: "Cette formation détient les bases sur HTML et JavaScript.",
            link: "https://git.softeam.fr/html-js-formation",
            duration: 2
        });
        db('trainings').insert({
//            id: 4,
            name: "ABC",
            description: "Formation Alphabet",
            link: "www",
            duration: 10
        });
//        console.log(db);
    }
})(db);

(function (db) {
    console.log(':: DB CONFIG :: users');
//    console.log(db);

    var users = db('users');
    console.log(':: DB CONFIG :: users size');
    console.log(users.size());

    if (users.size() == 0) {
        console.log(':: DB CONFIG :: init users');

        db('users').insert({
            id: 'jb',
            lastname: 'BOUYER',
            firstname: 'Julien',
            password: 'jb',
            site: 'Nantes',
            role: ''
        });
        db('users').insert({
            id: 'admin',
            lastname: 'admin',
            firstname: '',
            password: 'admin',
            site: 'Nantes',
            role: 'admin'
        });
    }
})(db);

(function (db) {
    console.log(':: DB CONFIG :: sessions');
//    console.log(db);

    var sessions = db('sessions');
    console.log(':: DB CONFIG :: sessions size');
    console.log(sessions.size());

    if (sessions.size() == 0) {
        console.log(':: DB CONFIG :: init sessions');
    }
})(db);

module.exports = db;
