"use strict";

app.directive("sftmTraining", function () {
    return {
        restrict: 'E',
        replace: true,
        scope : {
            training: "=training"
        },
        templateUrl: "templates/training-template.html"
    };
});