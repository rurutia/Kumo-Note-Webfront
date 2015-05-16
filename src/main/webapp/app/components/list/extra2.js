angular.module('extra2', [])
.service('helloWorldFromService', function() {
    this.sayHello2222 = function() {
        return "Hello, World!"
    };
})