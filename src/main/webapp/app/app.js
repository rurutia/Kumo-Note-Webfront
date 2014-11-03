'use strict';


// Declare app level module which depends on filters, and services
angular.module('easyNoteApp', ['ui.router','easyNoteApp.filters', 'easyNoteApp.services', 'easyNoteApp.directives', 'easyNoteApp.controllers','ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
//	http://stackoverflow.com/questions/20482051/how-to-set-a-default-state-with-angular-ui-router
//	$urlRouterProvider.when('/list', '');
    $urlRouterProvider.otherwise('/404');
	$stateProvider.state('default', {
        url:'', 
        templateUrl: 'partials/list.jsp'
    });
	$stateProvider.state('list', {
        url:'/list', 
        templateUrl: 'partials/list.jsp'
    });
	$stateProvider.state('detail', {
        url:'/detail?noteId&subject&content&type', 
        templateUrl: 'partials/detail.jsp'
    });
	$stateProvider.state('404', {
        url:'/404', 
        templateUrl: 'partials/404.jsp'
    });

})

//.config(['$routeProvider', function($routeProvider) {
//    $routeProvider.when('/list', {templateUrl: 'partials/list.jsp'});
//    $routeProvider.when('/detail/:noteId/:subject/:content/:type', {templateUrl: 'partials/detail.jsp', controller: 'noteDetailControl'});
//    $routeProvider.otherwise({redirectTo: '/list'});
//  }])
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
  .run(function($rootScope, navBreadCrumb){
	  navBreadCrumb.push({text: 'Home', link: 'list', isActive: false});
	  $rootScope.appStartedTime = new Date().toLocaleString();  
  })
  ;