"use strict";

var app = angular.module("softeam-training", [ 'ngRoute', 'ngMaterial' ]);

app.config(function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html'
    }).when('/trainings', {
        templateUrl: 'templates/trainings-list.html',
        controller: 'TrainingsCtrl'
    }).when('/training', {
        templateUrl: 'templates/training.html',
        controller: 'TrainingCtrl'
    }).when('/trainings/edit/:id', {
        templateUrl: 'templates/edit-training.html',
        controller: 'EditTrainingCtrl'
    }).when('/formers', {
        templateUrl: 'templates/formers-list.html',
        controller: 'UsersCtrl'
    }).when('/user', {
        templateUrl: 'templates/user.html',
        controller: 'UserCtrl'
    }).otherwise({
        templateUrl: 'templates/home.html'
    });
});
