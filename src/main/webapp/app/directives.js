'use strict';

/* Directives */


angular.module('easyNoteApp.directives', []).
  directive('hightlight', function() {
    return function(scope, elm, attrs) {
      console.log(scope.myApplication);
      elm.css('color', 'red');
    };
  });
