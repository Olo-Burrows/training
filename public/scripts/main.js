"use strict";

var app = angular.module("softeam-training", [ 'ngRoute', 'ngMaterial' ]);

app.config(function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'templates/home.html'
    }).when('/trainings', {
        templateUrl: 'templates/trainings-list.html',
        controller: 'TrainingsCtrl'
    }).when('/training', {
        templateUrl: 'templates/training.html'
    }).when('/formers', {
        templateUrl: 'templates/formers-list.html'
    }).otherwise({
        templateUrl: 'templates/login.html'
    });
});
