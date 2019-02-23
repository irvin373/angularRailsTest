myApp
    .config(['$routeProvider','$locationProvider',userRoutes])
    .controller('UserController',[
        '$scope',
        '$location',
        '$resource',
        'Auth',
        'Session',
        'Pharmacys',
        userController])
    .directive('password', passwordValidator)
    .directive('confirmation', confirmationValidator);

    function passwordValidator() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.password = function(modelValue, viewValue) {
                    let res = false;
                    if (/^.{8,}$/.test(viewValue)) {
                        res = true;
                    }
                    return res;
                };
            }
        };
    }

    function confirmationValidator() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.confirmation = function(modelValue, viewValue) {
                    let res = false;
                    if (viewValue == scope.user.password) {
                        res = true;
                    }
                    return res;
                };
            }
        };
    }


    function userController($scope,$location,$resource,Auth,Session,Pharmacys){
        $scope.user = {};
        $scope.password = "";
        $scope.pharmacys = Pharmacys.query();
        $scope.size = "";
        $scope.isAdmin = Session.isAdmin();
        console.log($scope.pharmacys);
        console.log(window.location.pathname);
        console.log("Login Controller");

        $scope.register = function(valid){
            if(valid) {
                Auth.register($scope.user).then(function () {
                    console.log($scope.user);
                    window.location.href = "/";
                }, function (error) {
                    console.log(error);
                });
            }
        }
    }

    function userRoutes($routeProvider,$locationProvider){
        $routeProvider.when('/sign_up',{
            templateUrl: '/templates/register/register.html',
            controller: 'UserController'
        });
    }