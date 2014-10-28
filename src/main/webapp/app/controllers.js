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
  controller('navigationControl', function($scope, navBreadCrumb) {
//	  $scope.isActive = true;
	  $scope.itemList = navBreadCrumb.getAll();
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
  .controller('addNoteCtrl', function($scope, $http, addNoteModel, MyApplication, Notes) {
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
	  
	  $scope.notCollapsed = false;
	  $scope.collapsed = true;
	  $('div#addNoteCollapseHeading').click(function(){
		  var collapsable = $('#addNoteAccordion .panel-collapse');
		  if(collapsable.hasClass('collapse')) {
			  $scope.notCollapsed = true;
			  $scope.collapsed = false;
		  }
		  else {
			  $scope.notCollapsed = false;
			  $scope.collapsed = true;
		  }
		  collapsable.collapse('toggle');
	  });
  })
  .controller('noteListCtrl', function($scope, $http, $filter, $location, navBreadCrumb, Notes, addNoteModel) {
	  $scope.orderProp = 'id';
	  
	  $scope.notes = Notes.query();
	  
	  $scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
	  });
	  
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
	  
      // filter info
	  $scope.filterInfo = null;
	  
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
		  selectedMainType = null;
		  selectedCategory = category;
		  for(var mainType in $scope.groups) {
			  angular.forEach($scope.groups[mainType], function(cat) {
				  if(cat === selectedCategory) {
					  selectedMainType = mainType;
				  }
			  });
		  }
		  if(!$scope.filterInfo) {
			  $scope.filterInfo = {};
		  }
		  $scope.filterInfo.category = selectedCategory;
		  $scope.filterInfo.mainType = selectedMainType;
	  };
	  
	  $scope.selectMainType = function(mainType) {
		  selectedCategory = null;
		  selectedMainType = mainType;
		  if(!$scope.filterInfo) {
			  $scope.filterInfo = {};
		  }
		  $scope.filterInfo.mainType = selectedMainType;
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
		  return (selectedCategory == null && selectedMainType == null)
	  		|| (note.type == selectedCategory && note.mainType == selectedMainType)
	  		|| (selectedCategory == null &&  note.mainType == selectedMainType);	  
      };
	  
	  $scope.resetFilter = function() {
		  selectedCategory = selectedMainType = $scope.filterInfo = null;
	  };
	  
	  
	  $scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
		  navBreadCrumb.pop();
	  });
  })
  ;


// detail view controllers
myAppModule
.controller('noteDetailControl', function($scope, $stateParams, $location, navBreadCrumb, addNoteModel, Notes){
	Notes.get({id: $stateParams.noteId}, function(data) {
		$scope.note = data;
		navBreadCrumb.push({text: $scope.note.subject, isActive: true})
	});
	
	$scope.categories = addNoteModel.getCategories();
	
	$scope.deleteNote = function() {
	  Notes.delete(
				      {action:'delete', id: $scope.note.id}, 
					  function() {
				      	$location.path('#/list');
				      }
			      );
	};
	  
	$scope.updateNote = function() {
	  var noteType = $scope.note.type;
      if(typeof $scope.note.type === 'object')
		  noteType = noteType.join();
	  var postData = $.param({id: $scope.note.id, subject: $scope.note.subject, content: $scope.note.content, type: noteType});
	  Notes.update(
			  {action:'update'},
			  {id: $scope.note.id, subject: $scope.note.subject, content: $scope.note.content, type: noteType}
	  );
	};
	  
})
;