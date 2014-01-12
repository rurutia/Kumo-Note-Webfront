'use strict';

/* Controllers */

var myAppModule = angular.module('easyNote.controllers', []);

myAppModule.
  controller('navigationControl', function($scope) {
	  $scope.isActive = true;
  });

myAppModule.  
	controller('currentTimeControl', function($scope, $interval) {
		$interval(function() {
			$scope.appCurrentTime = new Date().toLocaleString();  
		}, 1000);
	}).
  controller('appInfo', function($scope, MyApplication, promiseTest, $timeout) {
	  $scope.myApplication = new MyApplication("1.27", "1.10.2", "3.1.0", "1.2.0");

	  promiseTest.getMsgs(false).then(function(messageObj) {
		  $scope.msg  = messageObj.message;
	  }, function(message) {
		  $scope.msg  = message;
	  })
	  ;
  })
  .controller('addNoteControl', function($scope, $http, addNoteModel, MyApplication, Notes) {
	  $scope.categories = addNoteModel.getCategories();
	  
	  $scope.postFormData = function() {
		  var postData = $.param({subject: $scope.note.subject, content:$scope.note.content, type:$scope.note.category.join()});
		  Notes.save(
				  	{action:'save'},
				    {subject: $scope.note.subject, content:$scope.note.content, type:$scope.note.category.join()},
				    function(result) {angular.element($('#noteList')).scope().notes = Notes.query();}
				  	);
	  };

  })
  .controller('noteListControl', function($scope, $http, Notes) {
	  $scope.orderProp = 'id';
	  
	  $scope.notes = Notes.query();

	  $scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
		angular.element($('#linkHome')).scope().isDetailActive = true;
	  });
  })
  .controller('noteItemController', function($scope, $http, Notes) {
	  $scope.deleteNote = function(id) {
		  var postData = $.param({id: id});
		  Notes.delete(
				  {action:'delete', id: id}, 
				  $scope.removeDeletedNote(id)
		        );
	  }; 
	  // delete success callback
	  $scope.removeDeletedNote = function(id) {
		  for(var i = 0; i < $scope.notes.length; i++) {
	      		if( id == $scope.notes[i].id ) {
		      		$scope.notes.splice(i,1);
		      		break;
	      		}
	      	}
	  };
	  
  })
  ;


// detail view controllers
myAppModule
.controller('noteDetailControl', function($scope, $stateParams, $http, $location, addNoteModel, Notes){
	$scope.categories = addNoteModel.getCategories();
	
	angular.element($('#linkHome')).scope().isActive = false;
	$scope.note = {};
	$scope.note.noteId = $stateParams.noteId;
	$scope.note.subject = $stateParams.subject;
	$scope.note.content = $stateParams.content;
	$scope.note.type = $stateParams.type;
	
	$scope.deleteNote = function() {
	  Notes.delete(
			      {action:'delete', id: $scope.note.noteId}, 
				  function() {
			      	$location.path('#/list');}
			    );
	};
	  
	$scope.updateNote = function() {
	  var noteType = $scope.note.type;
      if(typeof $scope.note.type === 'object')
		  noteType = noteType.join();
	  var postData = $.param({id: $scope.note.noteId, subject: $scope.note.subject, content: $scope.note.content, type: noteType});
	  Notes.update(
			  {action:'update'},
			  {id: $scope.note.noteId, subject: $scope.note.subject, content: $scope.note.content, type: noteType}
	  );
	};
	  
    $scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
	  angular.element($('#linkHome')).scope().isDetailActive = false;
	});
})
;