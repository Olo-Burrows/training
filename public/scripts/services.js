"use strict";

app.service("LoginService", function (UsersService, $rootScope) {

    return {
        login: function (iduser, password) {
            var user,
                logged = false;
            
            UsersService.fetchOne(iduser).success(function (user) {
                if (user && user.password == password) {
                    logged = true;
                    var loggedUser = angular.fromJson(angular.toJson(user));
                    var loggedUser_stringify = JSON.stringify(loggedUser);
                    sessionStorage.setItem("loggedUser", loggedUser_stringify);
                }
                sessionStorage.setItem("logged", logged);
                $rootScope.$broadcast('logged', logged);
            });
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

app.service("UsersService", function ($http) {
    var API_URI = '/server/api/users';

    return {
        fetch: function () {
            return $http.get(API_URI);
        },

        fetchOne: function (id) {
            return $http.get(API_URI + '/' + id);
        },

        create: function (user) {
            return $http.post(API_URI, user);
        },
        
        update: function (user) {
            return $http.put(API_URI + "/" + user.id, user);
        },

        remove: function (id) {
            return $http.delete(API_URI + "/" + id);
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

app.service("SessionsService", function ($http) {
    var API_URI = '/server/api/sessions';

    return {
        fetch: function () {
            return $http.get(API_URI);
        },

        fetchOne: function (id) {
            return $http.get(API_URI + '/' + id);
        },
        
        fetchPastFromTrainingId: function (trainingId) {
            return $http.get(API_URI + '/past/trainingId/' + trainingId);
        },
        
        fetchComingFromTrainingId: function (trainingId) {
            return null;
        },

        create: function (session) {
            return $http.post(API_URI, session);
        },
        
        update: function (session) {
            return $http.put(API_URI + "/" + session.id, session);
        },

        remove: function (id) {
            return $http.delete(API_URI + "/" + id);
        }
    };
});
