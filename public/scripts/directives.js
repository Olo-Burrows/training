"use strict";

app.directive("sftmTraining", function() {
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

app.directive("sftmMenu", function ($location, LoginService) {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'templates/menu-template.html',
        link: function (scope) {
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

app.directive("sftmDatePicker", function($location, LoginService) {
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
            //
            //            scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            scope.format = 'dd-MM-yyyy';
            //            scope.altInputFormats = ['M!/d!/yyyy'];

            scope.popup = {
                opened: false
            };
        }
    }
});

app.directive("sftmDateSession", function($filter, SessionsService) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            trainingId: '@',
            type: '@'
        },
        templateUrl: 'templates/sftm-date-session-template.html',
        link: function(scope) {
            if (!scope.type) {
                console.warn("Unknown date session type");
            } else {
                SessionsService.fetchFromTrainingId(scope.trainingId, scope.type).success(function(sessions) {
                    if (sessions) {
                        var session = Array.isArray(sessions) ? sessions[0] : sessions;
                        scope.dateSession = session ? $filter("formattedDate")(session.date) : "";
                    }
                });
            }
        }
    }
});
