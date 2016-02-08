"use strict";

app.filter("duration", function () {
   return function (input) {
       var out = input + ' jour';
       if (input > 1) out += 's';
       return out;
   };
});

app.filter("hours", function () {
   return function (input) {
       var out = input + ' heure';
       if (input > 1) out += 's';
       return out;
   };
});
