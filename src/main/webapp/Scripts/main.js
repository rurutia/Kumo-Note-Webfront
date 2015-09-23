require.config({
    baseUrl: 'app',
//    urlArgs: 'v=1.0'
    urlArgs: 'bust=' + (new Date()).getTime() 
});

require(
    [
        'customersApp/animations/listAnimations',
        'app',
        'customersApp/directives/wcUnique',
        'customersApp/services/routeResolver',
        'customersApp/services/config',
        'customersApp/services/customersBreezeService',
        'customersApp/services/authService',
        'customersApp/services/customersService',
        'customersApp/services/dataService',
        'customersApp/services/modalService',
        'customersApp/services/httpInterceptors',
        'customersApp/filters/noteFilter',
        'customersApp/filters/nameProductFilter',
        'customersApp/filters/textTruncationFilter',
        'customersApp/controllers/navbarController',
        'customersApp/controllers/orders/orderChildController',
        'kumonoteApp/controllers/historyController',
    ],
    function () {
        angular.bootstrap(document, ['customersApp']);
    });
