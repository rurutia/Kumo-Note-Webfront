'user restrict';

define(['app'], function(app) {
	var DEFAULT_LENGTH = 20;
	var DEFAULT_SUBSTITUTION = "...";
	
	var filter = function() {
		return function(text, length) {
			if(!length || length <= DEFAULT_SUBSTITUTION + 1) length = DEFAULT_LENGTH;
			
			
			if(text.length > length) {
				text = text.substring(0, length - DEFAULT_SUBSTITUTION.length - 1) + DEFAULT_SUBSTITUTION;
			}
			console.log(text);
			return text;
			
		};
	};
	
	app.filter("textTruncationFilter", filter);
	
});