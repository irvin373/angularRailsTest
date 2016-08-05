//Factory
myApp.factory('Atqs', ['$resource',function($resource){
  return $resource('/atqs.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('AtqsSearch', ['$resource',function($resource){
  return $resource('/atqs.json?search=:query', {},{
    query: { method: 'GET', params: {query: '@query'} ,isArray: true }
  })
}]);

myApp.factory('Atq', ['$resource', function($resource){
  return $resource('/atqs/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

myApp.factory('ProductAtq', ['$resource',function($resource){
  return $resource('/products.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);

myApp.factory('AsignAtq', ['$resource',function($resource){
  return $resource('/atqs/asign', {},{
    query: { method: 'POST', params: {idProd: '@idP', idAtq: '@idA'} }
  })
}]);

//Controller
myApp.controller("AtqListCtr", 
    ['$scope', '$http', '$resource','Auth', 'Atqs', 'AtqsSearch', '$location', 
    function($scope, $http, $resource, Auth, Atqs, AtqsSearch, $location) {

  $scope.atqs = Atqs.query();
  $scope.query = "";
  $scope.search = function (query) {
      $scope.atqs = AtqsSearch.query({search: query});
  };  

  $scope.redirectShow = function (Id) {
      var route = "/atqs/"+Id;
      $location.path(route);
  };
}]);

myApp.controller("AtqAddCtr", ['$scope', '$resource', 'Atqs','$location', '$http',
    function($scope, $resource, Atqs, $location, $http) {
  $scope.save = function () {
    Atqs.create({atq: $scope.atq}, function(){
      $location.path('/atqs');
    }, function(error){
        console.log(error)
    });
  }
}]);

myApp.controller("AtqUpdateCtr", ['$scope', '$resource', 'Atq', '$location', '$routeParams', function($scope, $resource, Atq, $location, $routeParams) {
  $scope.atq = Atq.get({id: $routeParams.id})
  $scope.update = function(){
      Atq.update({id: $scope.atq.id},{atq: $scope.atq},function(){
        $location.path('/atqs');
      }, function(error) {
        console.log(error)
      });
  };
}]);

myApp.controller("AtqShowCtr", ['$scope', '$resource', 'Atq', '$location', '$routeParams', 
  function($scope, $resource, Atq, $location, $routeParams) {
  $scope.atq = Atq.get({id: $routeParams.id});

  $scope.deleteAtq = function (atqId) {
    if (confirm("quiere eliminar esta accion terapeutica?")){
      Atq.delete({ id: atqId }, function(){
        $location.path("/atqs");
      });
    }
  };
}]);

myApp.controller("AsignAtqCtr", ['$scope', '$resource', 'ProductAtq', 'AsignAtq', 'Atq', '$location', '$routeParams', 
  function($scope, $resource, ProductAtq, AsignAtq ,Atq, $location, $routeParams) {
  $scope.atq = Atq.get({id: $routeParams.id})
  $scope.products = ProductAtq.query();
  
  $scope.asign = function(IdAsign){
      alert('asignado a' + $scope.atq.detail);
      AsignAtq.query({idProd: IdAsign},{idAtq: $scope.atq.id},function(){
        console.log('Entro');    
      }, function(error) {
        console.log(error)
      });
  };
}]);

//Routes
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/atqs',{
      templateUrl: '/templates/atqs/index.html',
      controller: 'AtqListCtr'
    });
    $routeProvider.when('/atqs/new', {
      templateUrl: '/templates/atqs/new.html',
      controller: 'AtqAddCtr'
    });
    $routeProvider.when('/atqs/:id/edit', {
      templateUrl: '/templates/atqs/edit.html',
      controller: "AtqUpdateCtr"
    });
    $routeProvider.when('/atqs/:id/delete', {
      controller: "AtqDeleteCtr"
    });
    $routeProvider.when('/atqs/:id', {
      templateUrl: '/templates/atqs/show.html',
      controller: "AtqShowCtr"
    });
    $routeProvider.when('/atqs/:id/asignar', {
      templateUrl: '/templates/atqs/asignar.html',
      controller: "AsignAtqCtr"
    });
    $routeProvider.otherwise({
      redirectTo: '/atqs'
    });
  }
]);