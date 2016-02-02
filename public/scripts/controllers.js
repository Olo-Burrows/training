"use strict";

app.controller("LoginCtrl", function ($scope, $location, LoginService) {
    $scope.login = function () {
        LoginService.login($scope.iduser, $scope.password);
        $scope.$on('logged', function (event, logged) {
            if (logged) {
                $location.path("/home");
            } else {
                $scope.message = "Utilisateur inconnu ou mauvais mot de passe.";
            }
        });
    };
});

app.controller("HomeCtrl", function ($scope, LoginService) {
    $scope.user = LoginService.getUser();
 });

app.controller("TrainingsCtrl", function ($scope, $location, TrainingsService) {
    TrainingsService.fetch().success(function (resp) {
        $scope.trainings = resp;
    }).error(function (data, status, headers, config) {
        console.error(data);
    });

    $scope.addNewTraining = function () {
        $location.path("/training");
    };
    $scope.remove = function (index) {
        TrainingsService.remove($scope.trainings[index].id).success(function (resp) {
            $scope.trainings.splice(index, 1);
        });
    };
});

app.controller("TrainingCtrl", function ($scope, $location, TrainingsService) {
    $scope.submit = function () {
        TrainingsService.create($scope.training);
        $scope.training = {};
        $location.path("/trainings");
    };
});

app.controller("EditTrainingCtrl", function ($scope, $location, $routeParams, TrainingsService) {
    
    var trainingId = $routeParams.id;
    
    TrainingsService.fetchOne(trainingId).success(function (resp) {
        $scope.training = resp;
    });
    
    $scope.update = function () {
//        console.log(training);
        TrainingsService.update($scope.training);
        $scope.training = {};
        $location.path("/trainings");
    };
    
    $scope.back = function () {
        $location.path("/trainings");
    };
});
