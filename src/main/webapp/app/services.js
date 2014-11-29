'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('easyNoteApp.services', [])
  .value('version', '0.1')
  .value('LANGUAGE', {
	  CSS: 'css',
	  JAVASCRIPT: 'javascript',
	  JAVA: 'java',
	  SQL: 'sql'
  })
  .factory('addNoteModel', function() {
	  var categories = [
	                    {value:'JavaScript', label:'JavaScript', group:'Language'}, 
	                    {value:'Java', label:'Java', group:'Language'},
	                    {value:'jQuery',label:'jQuery', group:'Web'},
	                    {value:'HTML5',label:'HTML5', group:'Web'},
	                    {value:'CSS3',label:'CSS3', group:'Web'},
	                    {value:'MySQL', label:'MySQL', group:'Database'},
	                    {value:'Hibernate', label:'Hibernate', group:'Database'},
	                    {value:'MyBatis',label:'MyBatis', group:'Database'},
	                    {value:'Ubuntu',label:'Ubuntu', group:'Operating System'},
	                    {value:'Red Hat',label:'Red Hat', group:'Operating System'},
	                    {value:'Windows',label:'Windows', group:'Operating System'},
	                    {value:'Dev Tools',label:'Dev Tools', group:'Others'}
	                   ];
	  
	  return {
				getCategories: function() {
					return categories;
			 } 
	  };
  })
  .factory('navBreadCrumb', function() {
	  var itemList = [];
	  return {
		  push: function(item) {
			  itemList.push(item);
		  },
		  pop: function(item) {
			  return itemList.pop();
		  },
		  getAll: function(item) {
			  return itemList;
		  }
	  };
  })
  .factory('MyApplication', function() {
	function result(angularVersion, jqueryVersion, springVersion, MyBatisVersion) {
		this.angularVersion = angularVersion;
		this.jqueryVersion = jqueryVersion;
		this.springVersion= springVersion;
		this.MyBatisVersion = MyBatisVersion;
	}
	
	result.prototype.getJSVersions = function() {
		return "AngularJS: v" + this.angularVersion + " jQuery v:" + this.jqueryVersion;
	};
	
	result.prototype.getStartTime = function() {
		return this.startTime;
	};
	
	result.prototype.setStartTime = function(startTime) {
		this.startTime = startTime;
	};
	
	return result;
  })
  ;