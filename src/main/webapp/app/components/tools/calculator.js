'use strict';

// Declare app level module which depends on filters, and services
angular.module('calculator', [])
.controller('calculatorCtrl', function($scope) {
	$scope.items = [];
  $scope.total = {};

	$scope.exchangeRate = 5.0;
  $scope.deliveryRate = 10.0;

  var calculateTotal = function() {
    $scope.total.purchaseCost = $scope.total.deliveryCost = $scope.total.sellPrice = 0.0;
    var totalWeight = 0;
    angular.forEach($scope.items, function(item) {
      $scope.total.purchaseCost += parseFloat(item.costAud * item.quantity * $scope.exchangeRate);
      totalWeight += parseInt(item.weight * item.quantity );
      $scope.total.sellPrice += parseFloat(item.sellCny * item.quantity);
    });
    $scope.total.deliveryCost = Math.ceil(totalWeight/1000.0) * $scope.deliveryRate * $scope.exchangeRate;
  };

  $scope.$watch('items', function(newVal, oldVal) {
    calculateTotal();
  }, true);

  $scope.$watch('exchangeRate', function(newVal, oldVal) {
    calculateTotal();
  }, true);

  $scope.$watch('deliveryRate', function(newVal, oldVal) {
    calculateTotal();
  }, true);

	$scope.addItem = function() {
		$scope.items.push({editable: true});
	};

  $scope.deleteAllItem = function() {
    $scope.items = [];
  };


  $scope.editItem = function(item) {
      item.editable = true;
      item.copy = {};
      angular.copy(item, item.copy);
  };

  $scope.deleteItem = function(item, index) {
    // alert(index);
    $scope.items.splice(index, 1);
  };

	$scope.saveItem = function(item) {
		angular.copy(item.copy, item);
    console.log(item.copy);
		item.editable = false;
	};

	$scope.cancelEditItem = function(item) {
  		item.editable = false;
  		delete item.copy;
    };


	// $scope.items.push({
 //  		description: 'swiss',
 //  		costAud: '3',
 //  		sellCny: '32',
 //  		quantity: '5',
 //  		weight: '12'
 //  	});
 //  	$scope.items.push({
 //  		description: 'swiss',
 //  		costAud: '3',
 //  		sellCny: '32',
 //  		quantity: '5',
 //  		weight: '12'
 //  	});

})
;