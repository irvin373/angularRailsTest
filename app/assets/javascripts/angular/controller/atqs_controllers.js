//Factory
myApp.factory('Atqs', ['$resource',function($resource){
  return $resource('/atqs.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

//Controller
myApp.controller("AtqListCtr", 
    ['$scope', '$http', '$resource', 'Atqs', '$location', 
    function($scope, $http, $resource, Atqs, $location) {

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

myApp.controller("AtqAddCtr", ['$scope', '$resource', 'Atqs', '$location',
    function($scope, $resource, Users, $location) {
  $scope.save = function () {
    if ($scope.AtqForm.$valid){
      Atqs.create({atq: $scope.atq}, function(){
        $location.path('/');
      }, function(error){
        console.log(error)
      });
    }
  }
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
    $routeProvider.otherwise({
      redirectTo: '/atqs'
    });
  }
]);