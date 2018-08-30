//Factory
myApp.factory('Pharmacys', ['$resource',function($resource){
  return $resource('/pharmacy.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('User', ['$resource',function($resource){
  return $resource('/users.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);

myApp.factory('UserDelete', ['$resource',function($resource){
  return $resource('/deleteuser/:id.json', {},{
    query: { method: 'GET', params: {id: '@id'} }
  })
}]);

myApp.factory('UserRol', ['$resource',function($resource){
  return $resource('/users/:idP/change.json', {},{
    query: { method: 'GET', params: {idP: '@id'} }
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
myApp.controller("PharmacyListCtr", ['$scope', '$http', '$resource', 'Pharmacys', 'PharmacyChange','Auth','Rol','$location', 
    function($scope, $http, $resource, Pharmacys, PharmacyChange,Auth,Rol,$location) {

    $scope.pharmacys = Pharmacys.query();
    var role = "";
    $scope.change = function (id) {
      PharmacyChange.query({idP: id});
    };

    Auth.currentUser().then(function(user) {
        role = Rol.query({id: user.role_id});
            //console.log(user); // => {id: 1, ect: '...'}
        }, function(error) {
            console.log(error);
    });

    $scope.users = function () {
      if (role.name == "admin") {
        var route = "/users/";
        $location.path(route);  
      }
      else{
        alert("no tiene los permisos para esta vista");
      }
    };
}]);

myApp.controller("UserListCtr", ['$scope', '$http', '$resource', 'User','UserDelete', 'UserRol','$location', 
    function($scope, $http, $resource, User,UserDelete, UserRol,$location) {

    $scope.users = User.query();
    $scope.change_role = function (id) {
      UserRol.query({idP: id});
      $scope.users = User.query();
    };

    $scope.delete = function (id) {
      UserDelete.query({id: id});
      $scope.users = User.query();
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
    $routeProvider.when('/pharmacy',{
      templateUrl: '/templates/pharmacys/index.html',
      controller: 'PharmacyListCtr'
    });
    $routeProvider.when('/users',{
      templateUrl: '/templates/pharmacys/users.html',
      controller: 'UserListCtr'
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
  }
]);
