angular.module('directive.toolbar', [])
.directive('toolbarHover', function($state) {
	  return {
		  restrict: 'A',
		  scope: {
			  note: "=",
			  deleteNote: "&",
		  },
		  link: function(scope, elm, attrs) {
			  var toolbar = angular.element('<div class="btnContainer"></div>');
			  var toolbarView = 
				  angular
				  .element('<div><span class="glyphicon glyphicon-eye-open" title="View"></span></div>')
				  .click(function() {
					  $state.go('detail', {noteId: scope.note.id});
				  });
			  var toolbarDelete = 
				  angular
				  .element('<div><span class="glyphicon glyphicon-remove-circle" title="Delete"></span></div>')
				  .click(function() {
					  if(confirm('This record will be deleted if clicking yes')) {
						  scope.deleteNote({theNote: scope.note});
					  }
				  });
			  var toolbarMark = 
				  angular
				  .element('<div><span class="glyphicon glyphicon-pushpin" title="Mark"></span></div>')
				  .click(function() {
					  scope.note.isMarked = !scope.note.isMarked;
					  angular.element(this).toggleClass('marked');
				  });
			  toolbar.append(toolbarView).append(toolbarDelete).append(toolbarMark).hide();

			  scope.$watch('note.isMarked', function(newValue, oldValue) {
					if(newValue) {
						toolbarMark.addClass('marked');
					}
					else {
						toolbarMark.removeClass('marked');
					}
				});  
			  
			  elm.find('td').last().css('position', 'relative').append(toolbar);
			  elm.mouseover(function() {
				  toolbar.show();
			  });
			  
			  elm.mouseout(function() {
				  toolbar.hide();  
			  });
			  
		  }
	  }
})