"use strict";

app.controller("HomeCtrl", function($scope, Users, Trainings) {
    Users.load();
    Trainings.load();
    $scope.user = Users.fetchOne('luke');
});

app.controller("TrainingsCtrl", function($scope, $location, Trainings) {
    $scope.trainings = Trainings.fetch();

    $scope.addNewTraining = function () {
        $location.path("training");
    };
    $scope.add = function () {
        $scope.newTraining.id = Trainings.getNewId();
        Trainings.push($scope.newTraining);
        $scope.newTraining = {};
        $location.path("trainings");
    };
});

app.controller("TrainingCtrl", function($scope, Trainings) {
    $scope.remove = function(index) {
        Trainings.delete(index);
    };
});
