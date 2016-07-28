myApp
    .config(['$routeProvider','$locationProvider',loginRoutes])
    .controller('LoginController',['$scope','$location','$resource',loginController])

    function loginController($scope,$location,$resource){
        $scope.user = "";
        $scope.password = "";
        $scope.login = login;
        checkUserActive();
        console.log(window.location.pathname);

        function checkUserActive(){
            if(window.location.pathname == "/sys/"){
                $location.path("/products"); 
            }
        }

        function login(){
            window.location.pathname = "/sys/";
            if ($scope.user === "beta"){
                if($scope.password === "beta"){
                    window.location.pathname = "/sys/";
                }
            }
        }
    }

    function loginRoutes($routeProvider,$locationProvider){
        $routeProvider.when('/',{
            templateUrl: '/templates/login/login.html',
            controller: 'LoginController'
        });
    }
