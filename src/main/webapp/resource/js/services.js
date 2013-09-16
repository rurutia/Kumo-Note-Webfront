'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
  .factory('addNoteModel', function() {
	  var categories = [
	                    {value:'Dart',text:'Dart'}, 
	                    {value:'Java',text:'Java'}, 
	                    {value:'MyBatis',text:'MyBatis'}
	                   ];
	  
	  return {
				getCategories: function() {
					return categories;
			 } 
	  };
  })
  ;
