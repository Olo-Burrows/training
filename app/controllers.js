"use strict";

app.controller("HomeCtrl", function($scope, Users) {
   $scope.user = Users.fetchOne(0);
});

app.controller("TrainingsCtrl", function($scope, $location, Trainings) {
    $scope.trainings = Trainings.fetch();

    $scope.addNewTraining = function () {
        $location.path("training");
    };
    $scope.add = function () {
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
