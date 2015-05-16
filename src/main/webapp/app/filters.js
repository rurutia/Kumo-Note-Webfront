'use strict';

/* Filters */

angular.module('kumoNoteApp.filters', []).
  filter('interpolate', ['version', function(version,testonly) {
    return function(text) {
    	console.log(testonly);
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
