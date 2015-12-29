"use strict";

app.filter("duration", function () {
   return function (input) {
       var out = input + ' jour';
       if (input > 1) out += 's';
       return out;
   };
});
