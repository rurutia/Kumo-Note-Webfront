'use strict';

/* Controllers */

var myAppModule = angular.module('myApp.controllers', []);

myAppModule.
  controller('navigationControl', function($scope) {
	  $scope.isActive = true;
  })
  ;

myAppModule.  
  controller('noteMainControl', function($scope, MyApplication) {
	  var myApplication = new MyApplication("1.07", "1.10.2", "3.1.0", "1.2.0");
	  $scope.myApplication = myApplication.describe();
  })
  .controller('addNoteControl', function($scope, $http, addNoteModel, MyApplication, Notes) {
	  $scope.categories = addNoteModel.getCategories();
	  
	  $scope.postFormData = function() {
		  var postData = $.param({subject: $scope.note.subject, content:$scope.note.content, type:$scope.note.category.join()});
		  //		  SaveNotes.save({subject: $scope.note.subject, content:$scope.note.content, type:$scope.note.category.join()});
//		  SaveNotes.save('subject=sadf&content=asdf&type=Dart');
		  $http.post('save-note',
				     postData,
				     {
			  			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				     })
	        .success(function (data, status, headers, config) {
	        	console.log(data);
	        	angular.element($('#noteList')).scope().notes = Notes.query();
            }).error(function (data, status, headers, config) {
            	console.log('post call to save note failed');
            });
	  };

  })
  .controller('noteListControl', function($scope, $http, Notes) {
	  $scope.orderProp = 'id';
	  
	  $scope.notes = Notes.query();
	  
//	  $scope.loadNotes = function() {
//		  $http.get('load-notes').success(function(data) {
//			    $scope.notes = data;
//			  });
//	  };
//	  $scope.loadNotes();
	  
	  $scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
		angular.element($('#linkHome')).scope().isDetailActive = true;
	  });
  })
  .controller('noteItemController', function($scope, $http, Notes) {
	  $scope.deleteNote = function(id) {
		  var postData = $.param({id: id});
		  Notes.delete({action:'delete', id: id}, $scope.removeDeletedNote(id));
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
.controller('noteDetailControl', function($scope, $routeParams, $http, $location, addNoteModel, Notes){
	$scope.categories = addNoteModel.getCategories();
	
	angular.element($('#linkHome')).scope().isActive = false;
	$scope.note = {};
	$scope.note.noteId = $routeParams.noteId;
	$scope.note.subject = $routeParams.subject;
	$scope.note.content = $routeParams.content;
	$scope.note.type = $routeParams.type;
	
	$scope.deleteNote = function() {
	  Notes.delete({action:'delete', id: $scope.note.noteId}, 
				  function(data, status, headers, config) {
			      	console.log("id:" + $scope.note.noteId + " " + data);
			      	$location.path('#/list');
		  		  });
	  
//	  $http.delete("delete-note/" + $scope.note.noteId)
//	  .success(function (data, status, headers, config) {
//	      	console.log("id:" + $scope.note.noteId + " " + data);
//	      	$location.path('#/list');
//      }).error(function (data, status, headers, config) {
//      	console.log('post call to delete note failed');
//      });
	};
	  
	$scope.updateNote = function() {
	  var noteType = $scope.note.type;
      if(typeof $scope.note.type === 'object')
		  noteType = noteType.join();
	  var postData = $.param({id: $scope.note.noteId, subject: $scope.note.subject, content: $scope.note.content, type: noteType});
	  
	  $http.post(
			  "update-note/", 
			  postData,
			  {
		  		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			  })
	  .success(function (data, status, headers, config) {
	      	console.log("id:" + $scope.note.noteId + " " + data);
	      	$location.path('#/list');
      }).error(function (data, status, headers, config) {
      	console.log('post call to delete note failed');
      });
	};
	  
    $scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
	  angular.element($('#linkHome')).scope().isDetailActive = false;
	});
})
;