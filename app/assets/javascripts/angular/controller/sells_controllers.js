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

myApp.factory('Last', ['$resource',function($resource){
  return $resource('/sells/last.json',{},{
    get: { method: 'GET' }
  })
}]);

myApp.factory('Reportday', ['$resource',function($resource){
  return $resource('reports/day/:day.json',{},{
    query: { method: 'GET', isArray: true }
  })
}]);

myApp.factory('Reportday', ['$resource',function($resource){
  return $resource('reports/mounth/:day.json',{},{
    query: { method: 'GET', isArray: true }
  })
}]);

//Controller
myApp.controller("SellListCtr", 
    ['$scope', '$http', '$resource', 'Sells', 'Sell', '$location', 
    function($scope, $http, $resource, Sells, Sell, $location) {

  $scope.sells = Sells.query();

  $scope.redirectShow = function (Id) {
      var route = "/sells/"+Id;
      $location.path(route);
    };
}]);

myApp.controller("SellAddProductCtr", ['$scope', '$resource', 'Product', 'Asign', 'Sell', '$location', '$routeParams', 
  function($scope, $resource, Product, Asign ,Sell, $location, $routeParams) {
  $scope.sell = Sell.get({id: $routeParams.id})
  $scope.products = Product.query();
  $scope.quantity = 1;
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


myApp.controller("SellAddCtr", ['$scope', '$resource', 'Sells','$location', '$http', 'Last',
    function($scope, $resource, Sells, $location, $http, Last) {
  $scope.save = function () {
    Sells.create({sell: $scope.sell}, function(){
      $scope.last = Last.get();
      $scope.last.$promise.then(function(data) {
        $location.path("/sells/"+data.id);
      });
    }, function(error){
        console.log(error)
    });
  }
}]);

myApp.controller("SellUpdateCtr", ['$scope', '$resource', 'Sell', '$location', '$routeParams',
  function($scope, $resource, Sell, $location, $routeParams) {
  $scope.sell = Sell.get({id: $routeParams.id})
  console.log($scope.sell);
  $scope.update = function(){
      Sell.update({id: $scope.sell.id},{sell: $scope.sell},function(){
        $location.path("/sells");
      }, function(error) {
        console.log(error)
      });
  };
}]);

myApp.controller("SellShowCtr", ['$scope', '$resource', 'Sell', '$location', '$routeParams', 
  function($scope, $resource, Sell, $location, $routeParams) {
  $scope.sell = Sell.get({id: $routeParams.id});

  $scope.deleteSell = function (sellId) {
    if (confirm("quiere eliminar la venta?")){
      Sell.delete({ id: sellId }, function(){
        $location.path("/sells");
      });
    }
  };
}]);

myApp.controller("ReportsCtr", ['$scope', '$resource', '$location', '$routeParams', 
  function($scope, $resource, $location, $routeParams) {
    var date = new Date();
    $scope.day = date;
    $scope.mounth = 0;
    $scope.day_selected = function (){
      dates = $scope.day.getFullYear() + '-' + ($scope.day.getMonth()+1) + '-' +$scope.day.getDate(); 
      $location.path("/reports/day/"+dates);
    };
    $scope.mounth_selected = function (){
      dates = date.getFullYear() + '-' + ($scope.mounth) + '-' +1;
      $location.path("/reports/mounth/"+dates);
    };
}]);

myApp.controller("ReportsCtrDay", ['$scope', '$resource', '$location','Reportday', '$routeParams', 
  function($scope, $resource, $location, Reportday,$routeParams) {
    $scope.day = {day: $routeParams.day};
    $scope.sells = Reportday.query({day: $routeParams.day});
    $scope.CalculateTotal = function(){
      return $scope.sells.reduce(function(total, i){ return total += i.total},0);
    }
}]);

//Routes
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when("/sells",{
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
    $routeProvider.when('/reports', {
      templateUrl: '/templates/reports/index.html',
      controller: "ReportsCtr"
    });
    $routeProvider.when('/reports/day/:day', {
      templateUrl: '/templates/reports/reportsDay.html',
      controller: "ReportsCtrDay"
    });
    $routeProvider.when('/reports/mounth/:day', {
      templateUrl: '/templates/reports/reportsDay.html',
      controller: "ReportsCtrDay"
    });
  }
]);
