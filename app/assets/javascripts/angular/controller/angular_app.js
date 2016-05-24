// app/assets/javascripts/angular/controllers/users_controllers.js
var myApp = angular.module('myapplication',['ngRoute','ngResource','ui.bootstrap']);


myApp.config([
        '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

            $routeProvider.when('/products',{
                templateUrl: '/templates/products/products.html',
                controller: 'ProductListCtr'
            
            });

            $routeProvider.otherwise({
                redirectTo: '/products'
            
            });
            
    }
]);

