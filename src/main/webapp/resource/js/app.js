'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/list', {templateUrl: 'partials/list.jsp', controller: 'noteMainControl'});
    $routeProvider.when('/detail/:noteId/:subject/:content/:type', {templateUrl: 'partials/detail.jsp', controller: 'noteDetailControl'});
    $routeProvider.otherwise({redirectTo: '/list'});
  }]);