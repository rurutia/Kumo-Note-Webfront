'use strict';

define(['app'], function (app) {

    var filter = function () {

        return function (records, filterValue) {
            if (!filterValue) return records;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < records.length; i++) {
                var record = records[i];
                if (record.type && record.type.toLowerCase().indexOf(filterValue) > -1 ||
                    record.subject && record.subject.toLowerCase().indexOf(filterValue) > -1 ||
                    record.content && record.content.toLowerCase().indexOf(filterValue) > -1 || 
                    record.mainType && record.mainType.toLowerCase().indexOf(filterValue) > -1) {

                    matches.push(record);
                }
            }
            return matches;
        };
    };

    app.filter('noteFilter', filter);

});