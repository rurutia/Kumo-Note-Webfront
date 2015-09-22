'use strict';

define(['app'], function(app) {
	app.controller('historyCtrl', function(msg) {
		var vm = this;
		vm.name = "historyCtrl";
		vm.msg = msg;
	});
});