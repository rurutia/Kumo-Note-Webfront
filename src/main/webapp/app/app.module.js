'use strict';

$(document).ready(function () {
	$('a.navbar-brand').click(function (e) {
		angular.element(currentDateTime).scope().$apply('addContent()');
	});
	
	({
		// here you can define setting values
		// a.k.a. configuration constants
		maxwidth: 600,
		maxheight: 400,
		// you can also define utility methods
		gimmeMax: function () {
		return this.maxwidth + "x" + this.maxheight;
		},
		// initialize
		init: function () {
		console.log(this.gimmeMax());
		// more init tasks...
		}
	}).init();
	
	
});


// Declare app level module which depends on filters, and services
angular.module('easyNoteApp', ['ui.router','easyNoteApp.filters', 'easyNoteApp.services', 'easyNoteApp.directives', 'easyNoteApp.controllers','ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
//	http://stackoverflow.com/questions/20482051/how-to-set-a-default-state-with-angular-ui-router
//	$urlRouterProvider.when('/list', '');
    $urlRouterProvider.otherwise('/404');
	$stateProvider.state('default', {
        url:'', 
        templateUrl: 'app/components/list/list.jsp'
    });
	$stateProvider.state('list', {
        url:'/list', 
        templateUrl: 'app/components/list/list.jsp'
    });
	$stateProvider.state('detail', {
        url:'/detail?noteId&subject&content&type', 
        templateUrl: 'app/components/detail/detail.jsp'
    });
	$stateProvider.state('404', {
        url:'/404', 
        templateUrl: 'app/shared/404.jsp'
    });

})
  .factory('Notes', function($resource){
	  return $resource(
			  '/kumo-note-restapi/notes/:action/:id',
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
  .run(function($rootScope, MyApplication, navBreadCrumb){
	  var appInfo = new MyApplication("1.27", "1.10.2", "3.1.0", "1.2.0");
	  appInfo.setStartTime(new Date().toLocaleString());
	  $rootScope.appInfo = appInfo;

	  navBreadCrumb.push({text: 'Home', link: 'list', isActive: false}); 
  })
  ;