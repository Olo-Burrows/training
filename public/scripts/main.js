"use strict";

var app = angular.module("softeam-training", [ 'ngRoute', 'ui.bootstrap', 'ui.grid' ]);

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
        templateUrl: 'templates/training.html',
        controller: 'EditTrainingCtrl'
    }).when('/trainings/view/:id', {
        templateUrl: 'templates/training.html',
        controller: 'ViewTrainingCtrl'
    }).when('/formers', {
        templateUrl: 'templates/formers-list.html',
        controller: 'UsersCtrl'
    }).when('/user', {
        templateUrl: 'templates/user.html',
        controller: 'UserCtrl'
    }).when('/users/edit/:id', {
        templateUrl: 'templates/user.html',
        controller: 'EditUserCtrl'
    }).when('/admin', {
        templateUrl: 'templates/admin.html',
        controller: 'AdminCtrl'
    }).when('/users-admin', {
        templateUrl: 'templates/users-list.html',
        controller: 'UsersCtrl'
    }).when('/sessions-admin', {
        templateUrl: 'templates/sessions-list.html',
        controller: 'SessionsCtrl'
    }).when('/help', {
        templateUrl: 'templates/help.html'
    }).otherwise({
        templateUrl: 'templates/home.html'
    });
});
