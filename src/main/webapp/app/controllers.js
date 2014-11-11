'use strict';

/* models */

//var dateTime = {
//	isRefresh: true	
//};

/* Controllers */

var myAppModule = angular.module('easyNoteApp.controllers', []);

var c = function(msg) {
	console.log(msg);
};

myAppModule.
  controller('navigationControl', function($scope, navBreadCrumb) {
	  $scope.itemList = navBreadCrumb.getAll();
  });


myAppModule.  
	controller('currentDateTimeCtrl', function($scope, $interval) {
		$scope.isRefresh = true;
		var intervalPromise;
		$scope.$watch('isRefresh', function(newValue) {
			if(newValue) {
			    intervalPromise = $interval(function() {
					$scope.currentDateTime = new Date(); 
			    }, 1000);
			}
			else {
				if(intervalPromise) {
					$interval.cancel(intervalPromise);
				}
			}
		});
		
		$scope.addContent = function() {
			$scope.currentDateTime += 'added content';
		};
	}).
  controller('appInfoCtrl', function($rootScope, $scope, promiseTest, $timeout) {
	  $scope.appInfo = $rootScope.appInfo;

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
		  $scope.notCollapsed = !$scope.notCollapsed;
		  $scope.collapsed = !$scope.collapsed;
		  collapsable.collapse('toggle');
	  });
  })
  .controller('noteListCtrl', function($scope, $http, $filter, $location, navBreadCrumb, Notes, addNoteModel) {
//	  $scope.orderProp = 'id';
	  
	  $scope.notes = Notes.query();
	  
	  $scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
	  });
	  
	  $scope.deleteNote = function(note) {
		  note.$delete().then(function(){
			  // do nothing at the moment;
		  });
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