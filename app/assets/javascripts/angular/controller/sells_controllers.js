//Factory
myApp.factory('Sells', ['$resource',function($resource){
  return $resource('/sells.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('Sell', ['$resource', function($resource){
  return $resource('/sells/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

myApp.factory('Asign', ['$resource',function($resource){
  return $resource('/sells/asign',{},{
    query: { method: 'POST' }
  })
}]);

//Controller
myApp.controller("SellListCtr", 
    ['$scope', '$http', '$resource', 'Sells', 'Sell', '$location', 
    function($scope, $http, $resource, Sells, Sell, $location) {

  $scope.sells = Sells.query();

  $scope.deleteSell = function (sellId) {
    if (confirm("Are you sure you want to delete this sell?")){
      Sell.delete({ id: sellId }, function(){
        $scope.sells = Sells.query();
        $location.path('/');
      });
    }
  };
}]);

myApp.controller("SellAddProductCtr", ['$scope', '$resource', 'Product', 'Asign', 'Sell', '$location', '$routeParams', 
  function($scope, $resource, Product, Asign ,Sell, $location, $routeParams) {
  $scope.sell = Sell.get({id: $routeParams.id})
  $scope.products = Product.query();
  $scope.quantity = 0;
  $scope.sell_price = 0;
  
  $scope.doSomething = function(id_product,id_sell,quantity,sellPrice){
    Asign.query({id: id_sell},{product_id: id_product,sell_id: id_sell, quantity: quantity,sellpromo:sellPrice}, function(){
      alert('asignado a la factura');
      }, function(error) {
        alert('Agregado');
        console.log(error)
      });
  };
}]);


myApp.controller("SellAddCtr", ['$scope', '$resource', 'Sells','$location', '$http',
    function($scope, $resource, Sells, $location, $http) {
  
  $scope.save = function () {
    Sells.create({sell: $scope.sell}, function(){
      $location.path('/sells');
    }, function(error){
        console.log(error)
    });
  }
}]);

myApp.controller("SellUpdateCtr", ['$scope', '$resource', 'Sell', '$location', '$routeParams', function($scope, $resource, Sell, $location, $routeParams) {
  $scope.sell = Sell.get({id: $routeParams.id})
  console.log($scope.sell);
  //$scope.sell.date_in = new Date($scope.sell.date_in); 
  $scope.update = function(){
      Sell.update({id: $scope.sell.id},{sell: $scope.sell},function(){
        $location.path('/sells');
      }, function(error) {
        console.log(error)
      });
  };
}]);

myApp.controller("SellShowCtr", ['$scope', '$resource', 'Sell', '$location', '$routeParams', 
  function($scope, $resource, Sell, $location, $routeParams) {
  $scope.sell = Sell.get({id: $routeParams.id});
}]);


//Routes
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/sells',{
      templateUrl: '/templates/sells/index.html',
      controller: 'SellListCtr'
    });
    $routeProvider.when('/sells/new', {
      templateUrl: '/templates/sells/new.html',
      controller: 'SellAddCtr'
    });
    $routeProvider.when('/sells/:id/edit', {
      templateUrl: '/templates/sells/edit.html',
      controller: "SellUpdateCtr"
    });
    $routeProvider.when('/sells/:id/delete', {
      controller: "SellDeleteCtr"
    });
    $routeProvider.when('/sells/:id/add', {
      templateUrl: '/templates/sells/agregar.html',
      controller: "SellAddProductCtr"
    });
    $routeProvider.when('/sells/:id', {
      templateUrl: '/templates/sells/show.html',
      controller: "SellShowCtr"
    });
    $routeProvider.otherwise({
      redirectTo: '/sells'
    });
  }
]);
