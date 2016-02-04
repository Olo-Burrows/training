"use strict";

app.directive("sftmTraining", function () {
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

app.directive("checkConnection", function ($location, LoginService) {
    return {
        restrict: 'AE',
        replace: false,
        scope: {},
        link: function (scope) {
            var connected = LoginService.checkConnection();
            if (!connected) {
                $location.path("/login");
            }
        }
    };
});

app.directive("btnDisconnect", function ($location, LoginService) {
    return {
        restrict: 'E',
        replace: true,
        link: function (scope) {
            scope.disconnect = function () {
                LoginService.disconnect();
                $location.path("/");
            }
        },
        template: '<div><button class="btn btn-primary btn-sm" ng-click="disconnect()">Déconnexion</button></div>'
    }
});

app.directive("sftmDatePicker", function ($location, LoginService) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            selectedDate: '=ngModel'
        },
        templateUrl: "templates/date-picker-template.html",
        link: function (scope) {
            scope.today = function () {
                scope.selectedDate = new Date();
            };
            scope.today();

            scope.clear = function () {
                scope.selectedDate = null;
            };

            // Disable weekend selection
            scope.disabled = function (date, mode) {
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            };

            scope.minDate = scope.minDate ? null : new Date();
            scope.maxDate = new Date(2020, 5, 22);

            scope.openPicker = function () {
                scope.popup.opened = true;
            };

            scope.setDate = function (year, month, day) {
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
