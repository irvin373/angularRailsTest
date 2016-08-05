//Factory
myApp.factory('Lots', ['$resource',function($resource){
  return $resource('/lots.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('Lot', ['$resource', function($resource){
  return $resource('/lots/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

myApp.factory('LotsSearch', ['$resource',function($resource){
  return $resource('/lots.json?search=:query', {},{
    query: { method: 'GET', params: {query: '@query'} ,isArray: true }
  })
}]);

myApp.factory('ProductAutoComplete', ['$resource',function($resource){
  return $resource('/autocomplete.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);

//Controller
myApp.controller("LotListCtr", 
    ['$scope', '$http', '$resource', 'Lots', 'LotsSearch','$location', 
    function($scope, $http, $resource, Lots, LotsSearch, $location) {

  $scope.lots = Lots.query();
  $scope.searchparams = "";
  $scope.search = function (searchparams) {
      console.log(searchparams);
      $scope.lots = LotsSearch.query({search: searchparams});
  };

  $scope.redirectShow = function (Id) {
      var route = "/lots/"+Id;
      $location.path(route);
    };
}]);

myApp.controller("LotAddCtr", ['$scope', '$resource', 'Lots','$location', '$http', '$uibModal', '$log', 'ProductAutoComplete',
    function($scope, $resource, Lots, $location, $http, $uibModal, $log,ProductAutoComplete) {
  $scope.lot = {};  
  $scope.products = ProductAutoComplete.query();
  $scope.save = function() {
    console.log($scope.lot);
    $scope.lot.product_id = test($scope.lot.product_id);
    Lots.create({lot: $scope.lot}, function(){
      var route = "/lots/";
      $location.path(route);
    }, function(error){
        console.log(error);
    });
  };

  var test = function(nameSelected){
      var temp; 
      $scope.products.forEach(function(x) {
        if ( x["comercialname"] == nameSelected) {
          temp = x["id"];
        }
      });
      return temp;
  };
}]);

myApp.controller("LotUpdateCtr", ['$scope', '$resource', 'Lot', '$location', '$routeParams', function($scope, $resource, Lot, $location, $routeParams) {
  $scope.lot = Lot.get({id: $routeParams.id})
  console.log($scope.lot);
  //$scope.lot.date_in = new Date($scope.lot.date_in); 

  $scope.update = function(){
      Lot.update({id: $scope.lot.id},{lot: $scope.lot},function(){
        $location.path("/lots");
      }, function(error) {
        console.log(error)
      });
  };
}]);

myApp.controller("LotShowCtr", ['$scope', '$resource', 'Lot', '$location', '$routeParams', 
  function($scope, $resource, Lot, $location, $routeParams) {
  $scope.lot = Lot.get({id: $routeParams.id});

  $scope.deleteLot = function (lotId) {
    if (confirm("Quiere eliminar este lote?")){
      Lot.delete({ id: lotId }, function(){
        $location.path("/lots");
      });
    }
  };
}]);


//Routes
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/lots',{
      templateUrl: '/templates/lots/index.html',
      controller: 'LotListCtr'
    });
    $routeProvider.when('/lots/new', {
      templateUrl: '/templates/lots/new.html',
      controller: 'LotAddCtr'
    });
    $routeProvider.when('/lots/:id/edit', {
      templateUrl: '/templates/lots/edit.html',
      controller: "LotUpdateCtr"
    });
    $routeProvider.when('/lots/:id/delete', {
      controller: "LotDeleteCtr"
    });
    $routeProvider.when('/lots/:id', {
      templateUrl: '/templates/lots/show.html',
      controller: "LotShowCtr"
    });
  }
]);
