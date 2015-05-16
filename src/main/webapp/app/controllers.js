'use strict';

var myAppModule = angular.module('kumoNoteApp.controllers', []);

var c = function(msg) {
	console.log(msg);
};

myAppModule.
  controller('navigationControl', function($scope, navBreadCrumb) {
	  $scope.itemList = navBreadCrumb.getAll();
  })
  ;


myAppModule
.value('testonly1', {abc:'testonly1234111'})

.factory('testonly', function(testonly1) {
	return testonly1;
})
.directive('dateTimer', function ($interval, $filter) {
      return {
          restrict: 'AE',
          template: '<span>{{currentDateTime}}</span><input type="checkbox" id="ch" ng-model="isRefresh" />',
          controller: function ($scope) {
        	  $scope.isRefresh = true;
				var intervalPromise;
				$scope.$watch('isRefresh', function(newValue) {
					if(newValue) {
					    intervalPromise = $interval(function() {
							$scope.currentDateTime = $filter('date')(new Date(), "dd/MMM/yyyy hh:mm:ss"); 
						    }, 1000);
					}
				    else {
						$interval.cancel(intervalPromise);
					}
				});
          },
      };
  })
.controller('currentDateTimeCtrl', function($scope, $interval) {
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
			    function(result) {
			    	angular.element($('#noteList')).scope().notes = Notes.query();
			    }
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
  .controller('noteListCtrl', function($scope, $rootScope, $http, $filter, $location, navBreadCrumb, Notes, addNoteModel, $timeout, testonly) {

	  $scope.testonly = testonly.abc;
//	  $scope.orderProp = 'id';
//	  $rootScope.$on('$viewContentLoaded', function (event) {
////          alert('lock & loaded')
//  });

//      $scope.$on('ngRepeatFinished', function(event) {
//    	  $('[data-toggle="tooltip"]').tooltip({title:'dddddd'});
//    	 console.log(33333); 
//      });
//  
//	  $scope.showDebugInfo = function(nodeId) {
//	    	 console.log(44444); 
//
//		  $('[data-toggle="tooltip"]').tooltip({
//			  title: 'id:' + nodeId,
//			  placement: 'top'
//		  });
//	  };
	  
	  $scope.notes = Notes.query(function() {
//		  console.log($scope.notes[0].id);
	  });
	  
	  $scope.getRowStyle = function(note) {
		  var styleMap = {};
		  if(note.isSelected) {
			  styleMap['selected'] = true;
		  }
		  return styleMap;
	  };
	  
	  $scope.toggleRowSelection = function(note, isSelected, isBulk) {
		  if(isBulk) {
			  angular.element('#bulkMarkBtn').toggleClass('btn-default').toggleClass('btn-warning');
			  $scope.notes.isAllMarked = !$scope.notes.isAllMarked;
			  angular.forEach($scope.notes, function(nt, key) {
				  nt.isSelected = $scope.notes.isAllMarked;
				  nt.isMarked = $scope.notes.isAllMarked;
			  });
		  }
		  else {
			  if(note.isMarked) {
				  note.isSelected = true;
			  }
			  else {
				  note.isSelected = isSelected;
			  }
		  }
	  };
	  
	  $scope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
	  });

	  $rootScope.$on('RecordDragEvent', function(event, msg) {
		  // update record order in record-list table based on indexes in msg
		  if(typeof(msg.newIndex) === 'undefined') {
			  return;
		  }
		  
		  var temp = [];
		  angular.copy($scope.notes, temp);
		  
		  var currentNote = temp.splice(msg.currentIndex, 1);
		  
		  temp.splice(msg.newIndex, 0, currentNote[0]);

		  $scope.notes = temp;
	  });
	  
	  
	  $scope.deleteNote = function(note) {
		  note.$delete().then(function(){
			  $scope.notes = Notes.query(function() { });
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
			  return selectedMainType === mainType ? 'btn btn-success' : 'btn btn-default';
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
	console.log($stateParams);
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
      
	  var mainType = null;
	  angular.forEach($scope.categories, function(category) {
		  if(category.value === noteType) {
			  mainType = category.group;
		  }
	  });
      
	  Notes.update(
			  {action:'update'},
			  {id: $scope.note.id, subject: $scope.note.subject, content: $scope.note.content, type: noteType, mainType: mainType}
	  );
	};
	  
})
;