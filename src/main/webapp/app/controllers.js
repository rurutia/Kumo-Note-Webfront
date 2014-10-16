'use strict';

/* models */

var dateTime = {
	isRefresh: true	
};

/* Controllers */

var myAppModule = angular.module('easyNote.controllers', []);

var c = function(msg) {
	console.log(msg);
};

myAppModule.
  controller('navigationControl', function($scope) {
	  $scope.isActive = true;
  });

myAppModule.  
	controller('currentTimeControl', function($scope, $interval) {
		$scope.dateTime = dateTime;
		
		var f = function() {
			return $interval(function() {
				$scope.appCurrentTime = new Date().toLocaleString(); 
			}, 1000);
		};
		
		var intervalPromise = f();
		
		$scope.change = function() {
			if($scope.dateTime.isRefresh) {
				intervalPromise = f();
			}
			else {
				$interval.cancel(intervalPromise);
			}
		};
		

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
		  var mainType = null;
		  angular.forEach($scope.categories, function(category) {
			  if(category.value === $scope.note.category.join()) {
				  mainType = category.group;
			  }
		  });
		  
		  // postData never used?
		  var postData = $.param({subject: $scope.note.subject, content:$scope.note.content, type:$scope.note.category.join(), mainType: mainType});
  		  
		  Notes.save(
		  	{action:'save'},
		    {subject: $scope.note.subject, content:$scope.note.content, type:$scope.note.category.join(), mainType: mainType},
		    function(result) {angular.element($('#noteList')).scope().notes = Notes.query();}
		  	);
	  };
	  
	  $('div#addNoteCollapseHeading').click(function(){
		  $('#addNoteAccordion .panel-collapse').collapse('toggle');
	  });
  })
  .controller('noteListControl', function($scope, $http, Notes) {
	  $scope.orderProp = 'id';
	  
	  $scope.notes = Notes.query();
	  
	  $scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
		angular.element($('#linkHome')).scope().isDetailActive = true;
	  });
  })
  .controller('noteItemCtrl', function($scope, $http, $filter, Notes, addNoteModel) {
      // category drop down buttons	  
	  $scope.groups = {};
	  angular.forEach(addNoteModel.getCategories(), function(category) {
		  var group = category.group; 
		  if(typeof this[group] === 'undefined') {
			  this[group] = [];
		  }
		  this[group].push(category.label);
	  }, $scope.groups);
	  
	  
	  var selectedCategory = null;
	  var selectedMainType = null;
	  
	  $scope.selectCategory = function(category) {
		  selectedCategory = category;
		  for(var mainType in $scope.groups) {
			  angular.forEach($scope.groups[mainType], function(cat) {
				  if(cat === selectedCategory) {
					  selectedMainType = mainType;
				  }
			  });
		  }
	  };
	  
	  $scope.selectMainType = function(mainType) {
		  selectedMainType = mainType;
	  };
	  
	  $scope.changeBtnStyle = function(mainType, fixedClass) {
		  if(fixedClass) {
			  return selectedMainType === mainType ? 'btn btn-success ' + fixedClass : 'btn btn-default ' + fixedClass;
		  }
		  else {
			  return selectedMainType === mainType ? 'btn btn-success': 'btn btn-default';

		  }
	  };
	  
	  $scope.categoryFilterFn = function(note) {
		  return selectedCategory == null && selectedMainType == null || note.type == selectedCategory || note.mainType == selectedMainType;
	  };
	  
	  $scope.resetFilter = function() {
		  selectedCategory = selectedMainType = null;
	  };
	  
	  
	  
	  
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