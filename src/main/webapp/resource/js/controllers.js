'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('addNoteControl', function($scope, addNoteModel) {
	  $scope.categories = addNoteModel.getCategories();
  })
  .controller('noteListControl', function($scope, $http) {
	  $scope.orderProp = 'id';
	  $http.get('http://localhost:8080/maven-webapp/load-notes').success(function(data) {
	    $scope.tasks = data;
	  });
  });