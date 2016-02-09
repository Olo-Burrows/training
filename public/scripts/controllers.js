"use strict";

app.controller("LoginCtrl", function($scope, $location, LoginService) {
    $scope.login = function() {
        LoginService.login($scope.iduser, $scope.password);
        $scope.$on('logged', function(event, logged) {
            if (logged) {
                $location.path("/home");
            } else {
                $scope.message = "Utilisateur inconnu ou mauvais mot de passe.";
            }
        });
    };
});

app.controller("HomeCtrl", function($scope, LoginService) {
    $scope.user = LoginService.getUser();
});

app.controller("TrainingsCtrl", function($scope, $location, $filter, TrainingsService, SessionsService) {

    // display mode by default
    $scope.tableView = false;
    // icon by mode by default
    $scope.tableViewIcon = 'glyphicon glyphicon-th';

    // function called when changing view mode
    $scope.toogleView = function() {
        $scope.tableView = !$scope.tableView;

        if ($scope.tableView === false) {
            $scope.tableViewIcon = 'glyphicon glyphicon-th';
        } else {
            $scope.tableViewIcon = 'glyphicon glyphicon-th-list';
        }
    };

    $scope.gridTrainings = {
        enableSorting: true,
        columnDefs: [{
            name: '#',
            field: 'index',
            enableCellEdit: false
        }, {
            name: 'Nom',
            field: 'name',
            enableCellEdit: false
        }, {
            name: 'Durée',
            field: 'duration',
            enableCellEdit: false
        }, {
            name: 'Lien',
            field: 'link',
            enableCellEdit: false,
            cellTemplate: '<a href="row.entity.link" target="_blank">row.entity</a>'
        }, {
            name: 'Prochaine session',
            field: 'getComingSession()',
            enableCellEdit: false,
            cellTemplate: '<sftm-date-session id="{{row.entity.id}}" type="coming"></sftm-date-session>'
        }, {
            name: 'Dernière session',
            field: 'getPastSession()',
            enableCellEdit: false,
            cellTemplate: '<sftm-date-session training-id="{{row.entity.id}}" type="past"></sftm-date-session>'
        }, {
            name: '',
            field: 'actions',
            enableCellEdit: false,
            enableSorting: false,
            cellTemplate: '<a class="btn btn-primary btn-xs" aria-label="Consulter" href="#/trainings/view/id">' +
                '<i class="glyphicon glyphicon-eye-open"></i>' +
                '</a>' +
                '<a class="btn btn-success btn-xs" aria-label="Modifier" href="#/trainings/edit/id">' +
                '<i class="glyphicon glyphicon-edit"></i>' +
                '</a>' +
                '<button class="btn btn-danger btn-xs" aria-label="Supprimer" ng-click="grid.appScope.remove(index)">' +
                '<i class="glyphicon glyphicon-remove"></i>' +
                '</button>'
        }],
        data: []
    };

    TrainingsService.fetch().success(function(resp) {
        resp.forEach(function(training, i) {
            var row = {},
                training = resp[i];
            row.index = i + 1;
            row.name = training.name;
            row.duration = $filter('duration')(training.duration);
            row.link = training.link;
            row.actions = training.id;
            $scope.gridTrainings.data.push(row);
        });

        $scope.trainings = resp;
    }).error(function(data, status, headers, config) {
        console.error(data);
    });

    $scope.addNewTraining = function() {
        $location.path("/training");
    };
    $scope.remove = function(index) {
        TrainingsService.remove($scope.trainings[index].id).success(function(resp) {
            $scope.trainings.splice(index, 1);
        });
    };
});

app.controller("TrainingCtrl", function($scope, $location, TrainingsService) {

    $scope.mode = "Creation";
    $scope.trainingClass = "training-form";

    $scope.submit = function() {
        TrainingsService.create($scope.training);
        $scope.training = {};
        $location.path("/trainings");
    };

    $scope.cancel = function() {
        $location.path("/trainings");
    };
});

app.controller("EditTrainingCtrl", function($scope, $location, $routeParams, TrainingsService) {

    var trainingId = $routeParams.id;
    $scope.trainingClass = "training-form";

    $scope.mode = "Edit";

    TrainingsService.fetchOne(trainingId).success(function(resp) {
        $scope.training = resp;
    });

    $scope.submit = function() {
        //        console.log(training);
        TrainingsService.update($scope.training);
        $scope.training = {};
        $location.path("/trainings");
    };

    $scope.cancel = function() {
        $location.path("/trainings");
    };
});

app.controller("ViewTrainingCtrl", function($scope, $location, $routeParams, $uibModal, TrainingsService, SessionsService)  {
    var trainingId, getSessions;

    $scope.trainingClass = "training-view";
    $scope.mode = "View";

    trainingId = $routeParams.id;

    TrainingsService.fetchOne(trainingId).success(function(resp) {
        $scope.training = resp;
    });

    $scope.pastSession = {};
    $scope.comingSession = {};

    $scope.addSession = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'templates/add-session-modal.html',
            controller: 'CreateSessionCtrl',
            resolve: {
                trainingId: function() {
                    return $scope.training.id;
                }
            }
        });

        modalInstance.result.then(function(session) {
            if (session.date < new Date()) {
                $scope.pastSession.reload();
            } else {
                $scope.comingSession.reload();
            }
        });
    };
});

app.controller("CreateSessionCtrl", function($scope, $uibModalInstance, trainingId, SessionsService) {

    $scope.showAlert = false;

    $scope.addSession = function(session) {
        session.trainingId = trainingId;
        SessionsService.create(session).success(function(resp) {
            $scope.session = {};
            $scope.showAlert = false;
            $uibModalInstance.close(resp);
        });
    };

    $scope.close = function() {
        $scope.session = {};
        $scope.showAlert = false;
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller("UsersCtrl", function($scope, $location, UsersService) {
    UsersService.fetch().success(function(users) {
        $scope.users = users;
    }).error(function(data, status, headers, config) {
        console.error(data);
    });

    $scope.addNewUser = function() {
        // TODO check current user has Admin role
        $location.path("/user");
    };
    $scope.remove = function(index) {
        // TODO check current user has Admin role
        UsersService.remove($scope.users[index].id).success(function(resp) {
            $scope.users.splice(index, 1);
        });
    };
});

app.controller("UserCtrl", function($scope, $location, UsersService) {
    $scope.submit = function() {
        UsersService.create($scope.user);
        $scope.user = {};
        $location.path("/formers");
    };

    $scope.back = function() {
        $scope.user = {};
        $location.path("/formers");
    };
});

app.controller("EditUserCtrl", function($scope, $location, $routeParams, UsersService) {

    var userId = $routeParams.id;

    UsersService.fetchOne(userId).success(function(user) {
        $scope.user = user;
    });

    $scope.submit = function() {
        UsersService.update($scope.user);
        $scope.user = {};
        $location.path("/formers");
    };

    $scope.back = function() {
        $scope.user = {};
        $location.path("/formers");
    };
});
