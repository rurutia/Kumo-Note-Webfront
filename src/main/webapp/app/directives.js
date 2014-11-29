'use strict';

/* Directives */


angular.module('easyNoteApp.directives', ['easyNoteApp.services'])
  .directive('appInfo', function() {
    return function(scope, elm, attrs) {
    	elm
    	  .prepend($('<h5></h5>').html(scope.appInfo.getJSVersions()))
    	  .prepend($('<h5></h5>').html(scope.appInfo.getStartTime()));		  
    };  
  })
  .directive('syntaxHighlight', function($timeout, LANGUAGE) {
	  return {
		  restrict: 'A',
		  template: '<div><pre class="pre-scrollable-x-y"><code class="language-{{type}}">{{content}}</code></pre></div>',
		  scope: {
			  content: "@",
			  languageType: "@"
		  },
		  link: function(scope, elm, attrs) {
			  angular.forEach(LANGUAGE, function(value, key) {
				  if(scope.languageType.toLowerCase().indexOf(value) > -1) {
					  scope.type = value;
				  }
			  });			  
			  
			  $timeout(function () {
				  //DOM has finished rendering
				  Prism.highlightElement(elm.find("code")[0]);
			  });

		  }
	  }
  })
  .directive('highlight', function() {
	  return {
		  restrict: 'A',
		  template: '<h3><input ng-model="obj.title"></h3><h3><input ng-model="local"></h3>',
		  replace: false,
		  scope: {
			  local: "=prop"
		  },
		  link: function(scope, elm, attrs) {
//			  elm.css('color', attrs['highlight']);
//			  scope.obj = {title: "obj test from directive"};
//			  scope.reverseName = function(){
//			        scope.obj['title'] = scope.obj['title'].split('').reverse().join('');
//			    };
//			    scope.reverseName = function(){
//			        scope.title = scope.title.split('').reverse().join('');
//			    };
		  }
	  }
  })
  .directive("panel", function () {
	  return {
		  link: function (scope, element, attrs) {
			  scope.dataSource = "directive";
		  },
		  restrict: "E",
		  scope: true,
		  template: function () {
			  return angular.element(
					  document.querySelector("#template")).html();
		  },
		  transclude: true
	  }
  })
  ;
  
 
