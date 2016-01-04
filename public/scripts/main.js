"use strict";

var app = angular.module("softeam-training", [ 'ngRoute', 'ngMaterial' ]);

app.config(function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html'
    }).when('/trainings', {
        templateUrl: 'templates/trainings-list.html',
        controller: 'TrainingsCtrl'
    }).when('/training', {
        templateUrl: 'templates/training.html'
    }).when('/formers', {
        templateUrl: 'templates/formers-list.html'
    }).otherwise({
        templateUrl: 'templates/home.html'
    });
});
