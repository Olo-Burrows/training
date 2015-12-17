"use strict";

var app = angular.module("softeam-training", [ 'ngRoute', 'ngMaterial' ]);

app.config(function($routeProvider) {
    $routeProvider.when('/trainings', {
        templateUrl: 'app/templates/trainings-list.html',
        controller: 'TrainingsCtrl'
    }).when('/training', {
        templateUrl: 'app/templates/training.html'
    }).when('/formers', {
        templateUrl: 'app/templates/formers-list.html'
    }).otherwise({
        templateUrl: 'app/templates/home.html'
    });
});
