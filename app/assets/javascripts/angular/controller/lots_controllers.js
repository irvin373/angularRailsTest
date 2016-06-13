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

myApp.factory('Product', ['$resource',function($resource){
  return $resource('/products.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);

//Controller
myApp.controller("LotListCtr", 
    ['$scope', '$http', '$resource', 'Lots', 'Lot', '$location', 
    function($scope, $http, $resource, Lots, Lot, $location) {

  $scope.lots = Lots.query();

  $scope.deleteLot = function (lotId) {
    if (confirm("Are you sure you want to delete this lot?")){
      Lot.delete({ id: lotId }, function(){
        $scope.lots = Lots.query();
        $location.path('/');
      });
    }
  };
}]);

myApp.controller("LotAddCtr", ['$scope', '$resource', 'Lots','$location', '$http', '$uibModal', '$log',
    function($scope, $resource, Lots, $location, $http, $uibModal, $log) {
  
  $scope.doSomething = function(typedthings){
    console.log("Do something like reload data with this: " + typedthings );
    };
  
  $scope.save = function () {
    Lots.create({lot: $scope.lot}, function(){
      $location.path('#/lots');
    }, function(error){
        console.log(error)
    });
  }
}]);

myApp.controller("LotUpdateCtr", ['$scope', '$resource', 'Lot', '$location', '$routeParams', function($scope, $resource, Lot, $location, $routeParams) {
  $scope.lot = Lot.get({id: $routeParams.id})
  console.log($scope.lot);
  //$scope.lot.date_in = new Date($scope.lot.date_in); 
  $scope.update = function(){
      Lot.update({id: $scope.lot.id},{lot: $scope.lot},function(){
        $location.path('/lots');
      }, function(error) {
        console.log(error)
      });
  };
}]);

myApp.controller("LotShowCtr", ['$scope', '$resource', 'Lot', '$location', '$routeParams', 
  function($scope, $resource, Lot, $location, $routeParams) {
  $scope.lot = Lot.get({id: $routeParams.id});
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