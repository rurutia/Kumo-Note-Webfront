'use strict';


// Declare app level module which depends on filters, and services
angular.module('easyNote', ['ngRoute','easyNote.filters', 'easyNote.services', 'easyNote.directives', 'easyNote.controllers','ngResource']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/list', {templateUrl: 'partials/list.jsp'});
    $routeProvider.when('/detail/:noteId/:subject/:content/:type', {templateUrl: 'partials/detail.jsp', controller: 'noteDetailControl'});
    $routeProvider.otherwise({redirectTo: '/list'});
  }])
  .factory('Notes', function($resource){
	  return $resource(
			  'notes/:action/:id',
			  {action:'load', id:'@id'},
			  {update:{method:'PUT'}}
	  );
  })
  .factory('promiseTest', function($q, $timeout) {
	  var getMessages = function(isResolved) {
//		  alert(isResolved);
		var future = $q.defer();
		 $timeout(function() {
			if(isResolved) 
				future.resolve({message:"hello world!!!"});
			else {
				future.reject("Evil world!!!");
			}
		 }, 1000);
		return future.promise;
	  };
	  
	  return {
		  getMsgs : getMessages
	  };
	  
  })
  .run(function($rootScope){
	  $rootScope.appStartedTime = new Date().toLocaleString();  
  })
  ;