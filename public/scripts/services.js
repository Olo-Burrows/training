"use strict";

app.service("LoginService", function (UsersService) {

    return {
        login: function (iduser, password) {
            var user,
                logged = false;
            user = UsersService.fetchOne(iduser);
            if (user && user.password == password) {
                logged = true;
                var loggedUser = angular.fromJson(angular.toJson(user));
                var loggedUser_stringify = JSON.stringify(loggedUser);
                sessionStorage.setItem("loggedUser", loggedUser_stringify);
            }
            sessionStorage.setItem("logged", logged);
            return logged;
        },
        getUser: function () {
            var user_json = sessionStorage.getItem("loggedUser");
            return JSON.parse(user_json);
        },
        checkConnection: function () {
            var logged = sessionStorage.getItem("logged");
            return !logged || logged.toLowerCase() == 'false' ? false : true;
        },
        disconnect: function () {
            sessionStorage.setItem("logged", false);
        }
    }
});

app.service("UsersService", function () {
    var init,
        load,
        loaded = false,
        save,
        users;

    init = function () {
        console.log("init users");
        users = [{
            _id: 'luke',
            name: 'Luke SKYWALKER',
            password: 'luke'
        }, {
            _id: 'han',
            name: 'Han SOLO',
            password: 'han'
        }, {
            _id: 'leia',
            name: 'Leia ORGANA',
            password: 'leia'
        }];
        save();
    };

    load = function () {
        if (!loaded) {
            console.log("loading users");
            var users_json = localStorage.getItem("users");
            users = JSON.parse(users_json);
            loaded = true;
        }
    };

    save = function () {
        users = angular.fromJson(angular.toJson(users));
        var users_stringify = JSON.stringify(users);
        localStorage.setItem("users", users_stringify);
    };

    return {
        load: function () {
            if (!localStorage.getItem("users")) {
                init();
            }
            load();
        },

        fetch: function () {
            this.load();
            return users;
        },

        fetchOne: function (id) {
            this.load();
            var user;
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == id) {
                    user = users[i];
                    break;
                }
            }
            return user;
        },

        push: function (user) {
            users.push(user);
            save();
        },

        delete: function (index) {
            users.splice(index, 1);
            save();
        }
    };
});


app.service("TrainingsService", function ($http) {
    var API_URI = '/server/api/trainings';

    return {

        fetch: function () {
            return $http.get(API_URI);
        },

        fetchOne: function (id) {
            return $http.get(API_URI + '/' + id);
        },

        create: function (training) {
            return $http.post(API_URI, training);
        },
        
        update: function (training) {
            return $http.put(API_URI + "/" + training.id, training);
        },

        remove: function (id) {
            return $http.delete(API_URI + "/" + id);
        }
    };
});
