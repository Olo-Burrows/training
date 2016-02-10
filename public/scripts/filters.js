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
       var out = input ? input + ' heure' : '';
       if (input > 1) out += 's';
       return out;
   };
});

app.filter("formattedDate", function () {
    var dateNumberFormat = function(num) {
        return num > 9 ? num : "0" + num;
    };
    return function(input) {
        var date, day, month, year;
        date = new Date(input);
        day = dateNumberFormat(date.getDate());
        month = dateNumberFormat(date.getMonth() + 1);
        year = date.getFullYear();
        return day + "-" + month + "-" + year;
    };
});
