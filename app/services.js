"use strict";

app.service("Users", function ($http) {
    var users = [{
        id: 0,
        name: 'Luke SKYWALKER'
    }, {
        id: 1,
        name: 'Han SOLO'
    }, {
        id: 3,
        name: 'Leia ORGANA'
    }];

    return {
        fetch: function () {
            return users;
        },

        fetchOne: function (id) {
            return users[id];
        }
    };
});


app.service("Trainings", function ($http) {
    var trainings,
        getById;

    trainings = [
        {
            id: 0,
            name: "AngularJS",
            description: "La formation AngularJS est top !",
            link: "https://git.softeam.fr/angularjs-formation",
            duration: 3
        }, {
            id: 1,
            name: "Java POO",
            description: "Formation à Java et la programmation orientée objets.",
            link: "https://git.softeam.fr/java-poo-formation",
            duration: 4
        }, {
            id: 2,
            name: "JSF2",
            description: "Formation JSF2 pour tout savoir sur JavaServer Faces v2.",
            link: "https://git.softeam.fr/jsf2-formation",
            duration: 2
        }, {
            id: 3,
            name: "Formation HTML JavaScript",
            description: "Cette formation détient les bases sur HTML et JavaScript.",
            link: "https://git.softeam.fr/html-js-formation",
            duration: 2
        }/*, {
            id: 0,
            name: "",
            description: "",
            link: "",
            duration: 0
        }*/
    ];

    getById = function (id) {
        var training;
        for (var i = 0; i < trainings.length; i++) {
            if (trainings[i].id == id) {
                training = trainings[i];
                break;
            }
        }
        return training;
    };

    return {
        fetch: function () {
            return trainings;
        },

        fetchOne: function (id) {
            return getById(id);
        },

        push: function (training) {
            trainings.push(training);
        },

        delete: function (index) {
            trainings.splice(index, 1);
        }
    };
});
