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

    // display mode by default
    $scope.tableView = false;
    // icon by mode by default
    $scope.tableViewIcon = 'glyphicon glyphicon-th';
    
    // function called when changing view mode
    $scope.toogleView = function () {
        $scope.tableView = !$scope.tableView;

        if ($scope.tableView === false) {
            $scope.tableViewIcon = 'glyphicon glyphicon-th';
        } else {
            $scope.tableViewIcon = 'glyphicon glyphicon-th-list';
        }
    };

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
    
    $scope.mode = "Creation";
    $scope.trainingClass = "training-form";
    
    $scope.submit = function () {
        TrainingsService.create($scope.training);
        $scope.training = {};
        $location.path("/trainings");
    };
    
    $scope.cancel = function () {
        $location.path("/trainings");
    };
});

app.controller("EditTrainingCtrl", function ($scope, $location, $routeParams, TrainingsService) {
    
    var trainingId = $routeParams.id;
    $scope.trainingClass = "training-form";
    
    $scope.mode = "Edit";
    
    TrainingsService.fetchOne(trainingId).success(function (resp) {
        $scope.training = resp;
    });
    
    $scope.submit = function () {
//        console.log(training);
        TrainingsService.update($scope.training);
        $scope.training = {};
        $location.path("/trainings");
    };
    
    $scope.cancel = function () {
        $location.path("/trainings");
    };
});

app.controller("ViewTrainingCtrl", function ($scope, $location, $routeParams, TrainingsService) {
    
    var trainingId = $routeParams.id;
    $scope.trainingClass = "training-view";
    
    $scope.mode = "View";
    
    TrainingsService.fetchOne(trainingId).success(function (resp) {
        $scope.training = resp;
    });
    
});

app.controller("UsersCtrl", function ($scope, $location, UsersService) {
    UsersService.fetch().success(function (users) {
        $scope.users = users;
    }).error(function (data, status, headers, config) {
        console.error(data);
    });

    $scope.addNewUser = function () {
        // TODO check current user has Admin role
        $location.path("/user");
    };
    $scope.remove = function (index) {
        // TODO check current user has Admin role
        UsersService.remove($scope.users[index].id).success(function (resp) {
            $scope.users.splice(index, 1);
        });
    };
});

app.controller("UserCtrl", function ($scope, $location, UsersService) {
    $scope.submit = function () {
        UsersService.create($scope.user);
        $scope.user = {};
        $location.path("/formers");
    };
    
    $scope.back = function () {
        $scope.user = {};
        $location.path("/formers");
    };
});

app.controller("EditUserCtrl", function ($scope, $location, $routeParams, UsersService) {
    
    var userId = $routeParams.id;
    
    UsersService.fetchOne(userId).success(function (user) {
        $scope.user = user;
    });
    
    $scope.submit = function () {
        UsersService.update($scope.user);
        $scope.user = {};
        $location.path("/formers");
    };
    
    $scope.back = function () {
        $scope.user = {};
        $location.path("/formers");
    };
});
