"use strict";

app.directive("training", function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            // same as '=training'
            training: "=",
            // same as '&edit'
            edit: '&',
            // same as '&remove'
            remove: '&'
        },
        templateUrl: "templates/training-template.html"
    };
});

app.directive("trainingName", function (TrainingsService) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            trainingId: "@"
        },
        template: "<span>{{name}}</span>",
        link: function (scope, element, attr) {
            TrainingsService.fetchOne(scope.trainingId).success(function (training) {
                scope.name = training.name;
            });
        }
    };
});

app.directive("checkConnection", function($location, LoginService) {
    return {
        restrict: 'AE',
        replace: false,
        scope: {},
        link: function(scope) {
            var connected = LoginService.checkConnection();
            if (!connected) {
                $location.path("/login");
            }
        }
    };
});

app.directive("btnDisconnect", function($location, LoginService) {
    return {
        restrict: 'E',
        replace: true,
        link: function(scope) {
            scope.logout = function() {
                LoginService.logout();
                $location.path("/");
            }
        },
        template: '<button class="btn btn-default btn-sm btn-logout" ng-click="logout()"><i class="glyphicon glyphicon-off"></i></button>'
    }
});

app.directive("headerMenu", function($location, LoginService) {
    return {
        restrict:   'A',
        replace: true,
        templateUrl: 'templates/menu-template.html',
        link: function(scope) {
            scope.connected = LoginService.checkConnection();
            scope.$on('logged', function(event, logged) {
                if (logged) {
                    scope.connected = true;
                } else {
                    scope.connected = false;
                }
            });

            $('#home-tab a').click(function(e) {
                // e.preventDefault();
                // $(this).Tab.activate();
                $location.path("/home");
            });
            $('#trainings-tab a').click(function(e) {
                // e.preventDefault();
                // $(this).Tab.activate();
                $location.path("/trainings");
            });
            $('#formers-tab a').click(function(e) {
                // e.preventDefault();
                // $(this).Tab.activate();
                $location.path("/formers");
            });
        }
    }
});

app.directive("datePicker", function($location, LoginService) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            selectedDate: '=ngModel'
        },
        templateUrl: "templates/date-picker-template.html",
        link: function(scope) {
            scope.today = function() {
                scope.selectedDate = new Date();
            };
            scope.today();

            scope.clear = function() {
                scope.selectedDate = null;
            };

            // Disable weekend selection
            scope.disabled = function(date, mode) {
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            };

            scope.minDate = scope.minDate ? null : new Date();
            scope.maxDate = new Date(2020, 5, 22);

            scope.openPicker = function() {
                scope.popup.opened = true;
            };

            scope.setDate = function(year, month, day) {
                scope.selectedDate = new Date(year, month, day);
            };

            scope.dateOptions = {
                startingDay: 1
            };

            scope.format = 'dd-MM-yyyy';

            scope.popup = {
                opened: false
            };
        }
    }
});

app.directive("dateSession", function($filter, SessionsService) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            trainingId: '@',
            type: '@'
        },
        templateUrl: 'templates/date-session-template.html',
        controller: function($scope) {
            if (!$scope.type) {
                console.warn("Unknown date session type");
            } else {
                SessionsService.fetchFromTrainingId($scope.trainingId, $scope.type).success(function(sessions) {
                    var session = Array.isArray(sessions) ? sessions[0] : sessions;
                    if (session) {
                        $scope.dateSession = session ? $filter("formattedDate")(session.date) : "";
                        // $scope.formerId = session ? session.formerId : "";
                        // } else {
                        // $scope.hideme = true;
                    }
                });
            }
        }
    }
});

app.directive("sessions", function(SessionsService) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            type: '@',
            sessions: '=ngModel'
        },
        templateUrl: 'templates/sessions-list-template.html',
        controller: function($scope) {
            $scope.sessions = [];
            $scope.remove = function(index) {
                SessionsService.remove($scope.sessions[index].id).success(function(resp) {
                    $scope.sessions.splice(index, 1);
                });
            };
        },
        link: function(scope, element, attrs) {
            if (scope.type === "coming") {
                scope.title = "Liste des sessions à venir";
                scope.typeMsg = "à venir";
            } else if (scope.type === "past") {
                scope.title = "Liste des sessions passées";
                scope.typeMsg = "passées";
            }
        }
    }
});

app.directive("former", function(UsersService) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            mode: '@',
            id: '@',
            formerId: '=ngModel'
        },
        templateUrl: 'templates/formers-template.html',
        controller: function($scope) {
            $scope.$watch("id", function(formerId) {
                if ($scope.mode == 'view' && formerId) {
                    UsersService.fetchOne(formerId).success(function(former) {
                        $scope.firstname = former.firstname;
                        $scope.lastname = former.lastname;
                    });
                }
            });

            if ($scope.mode == 'edit') {
                UsersService.fetchFromRole("former").success(function(formers) {
                    $scope.formers = formers;
                });
            }
        }
    };
});

app.directive("site", function() {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            mode: '@',
            site: '=ngModel'
        },
        templateUrl: 'templates/sites-template.html'
    };
});

app.directive("role", function() {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            mode: '@',
            role: '=ngModel'
        },
        templateUrl: 'templates/roles-template.html'
    };
});
