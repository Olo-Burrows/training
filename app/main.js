
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
        templateUrl: 'app/templates/home.html',
    });
    
});

app.controller("TrainingsCtrl", function($scope) {
    $scope.trainings = [
        {
            name: "AngularJS",
            description: "La formation AngularJS est top !",
            link: "https://git.softeam.fr/angularjs-formation",
            duration: 3
        }, {
            name: "Java POO",
            description: "Formation à Java et la programmation orientée objets.",
            link: "https://git.softeam.fr/java-poo-formation",
            duration: 4
        }, {
            name: "JSF2",
            description: "Formation JSF2 pour tout savoir sur JavaServer Faces v2.",
            link: "https://git.softeam.fr/jsf2-formation",
            duration: 2
        }, {
            name: "Formation HTML JavaScript",
            description: "Cette formation détient les bases sur HTML et JavaScript.",
            link: "https://git.softeam.fr/html-js-formation",
            duration: 2
        }/*, {
            name: "",
            description: "",
            link: "",
            duration: 0
        }*/
    ];

    $scope.addNewTraining = function () {
        $scope.trainings.push($scope.newTraining);
        $scope.newTraining = {};
    };
});


app.controller("TrainingCtrl", function($scope) {
    $scope.remove = function(index) {
        $scope.trainings.splice(index, 1);
    };
});