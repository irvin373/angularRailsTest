myApp.controller("LogoutCtr", 
    ['$scope', '$http', '$resource','Auth', '$location', 
    function($scope, $http, $resource, Auth, $location) {

  var config = {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
            }
        };
        // Log in user...
        // ...
  $scope.salir = function(){
    Auth.logout(config).then(function(oldUser) {
              alert(oldUser.name + "you're signed out now.");
              window.location.href = "/";
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