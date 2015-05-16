angular.module('extra', [])
.service('helloWorldFromService', function() {
    this.sayHello = function() {
        return "Hello, World!"
    };
})