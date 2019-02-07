git myApp.factory('Rol', ['$resource', function($resource){
  return $resource('/rols/:id.json', {}, {
    query: { method: 'GET' }
  });
}]);

myApp.service('Session',function () {
    this.create = function (userId, userEmail, userRole) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.userRole = userRole;
    };

    this.isAdmin = function() {
        return (this.userRole == 2);
    };

    this.destroy = function() {
        this.userId = null;
        this.userEmail = null;
        this.userRole = null;
    };
});

myApp.controller("LogoutCtr",
    ['$scope', '$http', '$resource','Auth','Session', 'Rol','$location', 
    function($scope, $http, $resource, Auth, Session, Rol,$location) {
  
  $scope.isAdmin = false;
  Auth.currentUser().then(function(user) {
        console.log(user);
        Session.create(user.id,user.email,user.role_id);
        console.log(Session.userEmail);
        console.log(Session.userRole);
        if (user.role_id == 2) {
          $scope.isAdmin = true;
        }
          console.log($scope.isAdmin);
        }, function(error) {
            console.log(error);
  });

  var config = {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
            }
        };
    
  $scope.salir = function(){
    Auth.logout(config).then(function(oldUser) {
              window.location.href = "/";
              //$location.path("/users/sign_in");
          }, function(error) {
              console.log(error);
    });
  };
}]);