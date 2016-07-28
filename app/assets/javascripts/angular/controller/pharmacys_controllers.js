//Factory
myApp.factory('Pharmacys', ['$resource',function($resource){
  return $resource('/pharmacy.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('PharmacyChange', ['$resource',function($resource){
  return $resource('/pharmacy/:idP/change.json', {},{
    query: { method: 'GET', params: {idP: '@id'} }
  })
}]);

myApp.factory('Pharmacy', ['$resource', function($resource){
  return $resource('/pharmacy/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

//Controller
myApp.controller("PharmacyListCtr", ['$scope', '$http', '$resource', 'Pharmacys', 'PharmacyChange','$location', 
    function($scope, $http, $resource, Pharmacys, PharmacyChange, $location) {

    $scope.pharmacys = Pharmacys.query();
    $scope.change = function (id) {
      PharmacyChange.query({idP: id});
      alert('cambiando de Farmacia');
    };
}]);

myApp.controller("PharmacyAddCtr", ['$scope', '$resource', 'Pharmacys','$location', '$http',
    function($scope, $resource, Pharmacys, $location, $http) {
  $scope.save = function () {
    Pharmacys.create({pharmacy: $scope.pharmacy}, function(){
      $location.path('/pharmacys');
    }, function(error){
        console.log(error)
    });
  }
}]);

myApp.controller("PharmacyUpdateCtr", ['$scope', '$resource', 'Pharmacy', '$location', '$routeParams', function($scope, $resource, Pharmacy, $location, $routeParams) {
  $scope.pharmacy = Pharmacy.get({id: $routeParams.id})
  $scope.update = function(){
      Pharmacy.update({id: $scope.pharmacy.id},{pharmacy: $scope.pharmacy},function(){
        $location.path('/pharmacys');
      }, function(error) {
        console.log(error)
      });
  };
}]);

//Routes
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/pharmacys',{
      templateUrl: '/templates/pharmacys/index.html',
      controller: 'PharmacyListCtr'
    });
    $routeProvider.when('/pharmacys/new', {
      templateUrl: '/templates/pharmacys/new.html',
      controller: 'PharmacyAddCtr'
    });
    $routeProvider.when('/pharmacys/:id/edit', {
      templateUrl: '/templates/pharmacys/edit.html',
      controller: "PharmacyUpdateCtr"
    });
    $routeProvider.when('/pharmacys/:id/delete', {
      controller: "PharmacyDeleteCtr"
    });
    $routeProvider.otherwise({
      redirectTo: '/pharmacys'
    });
  }
]);