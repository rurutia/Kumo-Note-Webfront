'use strict';

/* Directives */


angular.module('easyNoteApp.directives', [])
  .directive('appInfo', function() {
    return function(scope, elm, attrs) {
    	elm
    	  .prepend($('<h5></h5>').html(scope.appInfo.getJSVersions()))
    	  .prepend($('<h5></h5>').html(scope.appInfo.getStartTime()));		  
    };  
  })
  ;
  
 
