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
            name: "AngularJS",
            description: "AngularJS est un framework JavaScript libre et open-source développé par Google.",
            requirement: "Maîtrise du langage JavaScript",
            link: "https://git.fake-url.fr/angularjs-formation",
            duration: 4
        });
        db('trainings').insert({
            name: "Java POO",
            description: "Java est le nom de marque d'une technique informatique développée initialement par Sun Microsystems puis par Oracle : la « technologie Java™ ».\n\nJava est utilisé dans une grande variété de plates-formes depuis les systèmes embarqués et les téléphones mobiles, les ordinateurs individuels, les serveurs, les applications d’entreprise, les superordinateurs, etc.",
            requirement: "",
            link: "https://git.fake-url.fr/java-poo-formation",
            duration: 4
        });
        db('trainings').insert({
            name: "JSF2",
            description: "JavaServer Faces (abrégé en JSF) est un framework Java, pour le développement d'applications Web.",
            requirement: "Maîtrise du développement Java, connaissances du pattern MVC.",
            link: "https://git.fake-url.fr/jsf2-formation",
            duration: 2
        });
        db('trainings').insert({
            name: "Formation HTML et CSS",
            description: "L’Hypertext Markup Language, généralement abrégé HTML, est le format de données conçu pour représenter les pages web.\n\nLes feuilles de style en cascade1, généralement appelées CSS de l'anglais Cascading Style Sheets, forment un langage informatique qui décrit la présentation des documents HTML et XML.",
            requirement: "",
            link: "https://git.fake-url.fr/html-css-formation",
            duration: 2
        });
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
            mail: 'julienbouyer@gmail.com',
            password: 'jb',
            site: 'Nantes',
            role: ''
        });
        db('users').insert({
            id: 'admin',
            lastname: 'admin',
            firstname: '',
            mail: 'admin@fake-url.com',
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
