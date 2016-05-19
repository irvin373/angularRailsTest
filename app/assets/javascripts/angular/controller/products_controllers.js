var myApp = angular.module('myapplication', ['ngRoute', 'ngResource']); 

//Factory
myApp.factory('Products', ['$resource',function($resource){
  return $resource('/products.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('Product', ['$resource', function($resource){
  return $resource('/products/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

//Controller
myApp.controller("ProductListCtr", ['$scope', '$http', '$resource', 'Products', 'Product', '$location', function($scope, $http, $resource, Products, Product, $location) {

  $scope.products = Products.query();

  $scope.deleteProduct = function (productId) {
    if (confirm("Are you sure you want to delete this product?")){
      Product.delete({ id: productId }, function(){
        $scope.products = Products.query();
        $location.path('/');
      });
    }
  };
}]);

//Routes
myApp.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/products',{
      templateUrl: '/templates/products/index.html',
      controller: 'ProductListCtr'
    });

    $routeProvider.otherwise({
      redirectTo: '/products'
    });
  }
]);