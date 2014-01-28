'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('easyNote.services', []).
  value('version', '0.1')
  .factory('addNoteModel', function() {
	  var categories = [
	                    {value:'Dart', label:'Dart', group:'front & back end'}, 
	                    {value:'Java', label:'Java', group:'back end'}, 
	                    {value:'JavaScript',label:'JavaScript', group:'front end'},
	                    {value:'CSS',label:'CSS', group:'front end'},
	                    {value:'MyBatis',label:'MyBatis', group:'back end'}
	                   ];
	  
	  return {
				getCategories: function() {
					return categories;
			 } 
	  };
  })
  .factory('MyApplication', function() {
	function MyApplication(angularVersion, jqueryVersion, springVersion, MyBatisVersion) {
		this.angularVersion = angularVersion;
		this.jqueryVersion = jqueryVersion;
		this.springVersion= springVersion;
		this.MyBatisVersion = MyBatisVersion;
	}
	
	MyApplication.prototype.describe = function() {
		return "AngularJS: v" + this.angularVersion + " jQuery v:" + this.jqueryVersion;
	};
	
	MyApplication.rule = function() {
		var rule = {MAX_CHARS_INPUT:100};
		return rule;
	};
	
	return MyApplication;
  })
  ;