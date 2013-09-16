'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('addNoteControl', function($scope, $http, addNoteModel) {
	  $scope.categories = addNoteModel.getCategories();
	  $scope.postFormData = function() {
		  alert($scope.note.category.join());
		  var postData = $.param({subject: $scope.note.subject, content:$scope.note.content, type:$scope.note.category.join()});
	      $http({
	            url: 'save-note',
	            method: "post",
	            data: postData,
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	        }).success(function (data, status, headers, config) {
	        	console.log(data);
	            }).error(function (data, status, headers, config) {
	            	console.log('post call to save note failed');
	            });
	  };
  })
  .controller('noteListControl', function($scope, $http) {
	  $scope.orderProp = 'id';
	  $http.get('load-notes').success(function(data) {
	    $scope.tasks = data;
	  });
  });