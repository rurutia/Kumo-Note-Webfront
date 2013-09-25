'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers','ngResource']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/list', {templateUrl: 'partials/list.jsp', controller: 'noteMainControl'});
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
  .factory('PromiseTest', function($q, $timeout) {
	  var getMessages = function(test) {
		this.test = test;
		var future = $q.defer();
		 $timeout(function() {
			future.resolve("a hello world message");
		 }, 1000);
		return future.promise;
	  };
	  
	  return {
		  getMessages : getMessages
	  };
	  
  })
  ;