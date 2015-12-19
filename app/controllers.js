"use strict";

app.controller("LoginCtrl", function ($scope, $location, UsersService, LoginService) {
    if (LoginService.checkConnection()) {
        $location.path("/home");
    }

    UsersService.load();
    $scope.login = function () {
        if (LoginService.login($scope.iduser, $scope.password)) {
            $location.path("/home");
        } else {
            $scope.message = "Utilisateur inconnu ou mauvais mot de passe.";
        }
    };
});

app.controller("HomeCtrl", function ($scope, $location, UsersService, LoginService, TrainingsService) {
    if (!LoginService.checkConnection()) {
        $location.path("/");
    }
    TrainingsService.load();
    $scope.user = UsersService.fetchOne('luke');

    $scope.disconnect = function () {
        LoginService.disconnect();
        $location.path("/");
    };
 });

app.controller("TrainingsCtrl", function ($scope, $location, TrainingsService, LoginService) {
    if (!LoginService.checkConnection()) {
        $location.path("/");
    }
    $scope.trainings = TrainingsService.fetch();

    $scope.addNewTraining = function () {
        $location.path("/training");
    };
    $scope.submit = function () {
        TrainingsService.push($scope.training);
        $scope.training = {};
        $location.path("/trainings");
    };
});

app.controller("TrainingCtrl", function ($scope, $location, TrainingsService, LoginService) {
    if (!LoginService.checkConnection()) {
        $location.path("/");
    }
    $scope.remove = function (index) {
        TrainingsService.delete(index);
    };
});
