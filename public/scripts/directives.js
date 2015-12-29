"use strict";

app.directive("sftmTraining", function () {
    return {
        restrict: 'E',
        replace: true,
        scope : {
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
