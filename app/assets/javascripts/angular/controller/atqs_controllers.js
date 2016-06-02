//Factory
myApp.factory('Atqs', ['$resource',function($resource){
  return $resource('/atqs.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('Atq', ['$resource', function($resource){
  return $resource('/atqs/:id.json', {}, {
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

myApp.factory('Asign', ['$resource',function($resource){
  return $resource('/atqs/asign', {},{
    query: { method: 'POST', params: {idProd: '@idP', idAtq: '@idA'} }
  })
}]);

//Controller
myApp.controller("AtqListCtr", 
    ['$scope', '$http', '$resource', 'Atqs', 'Atq', '$location', 
    function($scope, $http, $resource, Atqs, Atq, $location) {

  $scope.atqs = Atqs.query();

  $scope.deleteAtq = function (atqId) {
    if (confirm("Are you sure you want to delete this atq?")){
      Atq.delete({ id: atqId }, function(){
        $scope.atqs = Atqs.query();
        $location.path('/');
      });
    }
  };
}]);

myApp.controller("AtqAddCtr", ['$scope', '$resource', 'Atqs','$location', '$http',
    function($scope, $resource, Atqs, $location, $http) {
  $scope.save = function () {
    Atqs.create({atq: $scope.atq}, function(){
      $location.path('/');
    }, function(error){
        console.log(error)
    });
  }
}]);

myApp.controller("AtqUpdateCtr", ['$scope', '$resource', 'Atq', '$location', '$routeParams', function($scope, $resource, Atq, $location, $routeParams) {
  $scope.atq = Atq.get({id: $routeParams.id})
  $scope.update = function(){
      Atq.update({id: $scope.atq.id},{atq: $scope.atq},function(){
        $location.path('/');
      }, function(error) {
        console.log(error)
      });
  };
}]);

myApp.controller("AtqShowCtr", ['$scope', '$resource', 'Atq', '$location', '$routeParams', 
  function($scope, $resource, Atq, $location, $routeParams) {
  $scope.atq = Atq.get({id: $routeParams.id})
}]);

myApp.controller("AsignAtqCtr", ['$scope', '$resource', 'Product', 'Asign', 'Atq', '$location', '$routeParams', 
  function($scope, $resource, Product, Asign ,Atq, $location, $routeParams) {
  $scope.atq = Atq.get({id: $routeParams.id})
  $scope.products = Product.query();
  
  $scope.asign = function(IdAsign){
      alert('asignado a' + $scope.atq.detail);
      Asign.query({idProd: IdAsign},{idAtq: $scope.atq.id},function(){
        console.log('Entro');    
      }, function(error) {
        Alert('Fue asignado');
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