myApp.factory('Rol', ['$resource', function($resource){
  return $resource('/rols/:id.json', {}, {
    query: { method: 'GET' }
  });
}]);

myApp.controller("LogoutCtr", 
    ['$scope', '$http', '$resource','Auth', 'Rol','$location', 
    function($scope, $http, $resource, Auth, Rol,$location) {
  
  $scope.isAdmin = false;
  Auth.currentUser().then(function(user) {
        if (user.role_id == 2) {
          $scope.isAdmin = true;
        }
          console.log($scope.isAdmin);
            //console.log(user); // => {id: 1, ect: '...'}
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
              alert(oldUser.name + "you're signed out now.");
              // window.location.href = "/users/sign_in";
              $location.path("/users/sign_in");
          }, function(error) {
              console.log(error);
    });
  };
}]);

  // var config = {
  //           headers: {
  //               'X-HTTP-Method-Override': 'DELETE'
  //           }
  //       };
  //       // Log in user...
  //       // ...
  // $scope.salir = function(){
  //   Auth.logout(config).then(function(oldUser) {
  //             alert(oldUser.name + "you're signed out now.");
  //         }, function(error) {
  //             console.log(error);
  //   });
  // };

  // Auth.currentUser().then(function(user) {
  //           // User was logged in, or Devise returned
  //           // previously authenticated session.
  //           console.log(user); // => {id: 1, ect: '...'}
  //       }, function(error) {
  //           console.log(error);
  // });