myApp
    .config(['$routeProvider','$locationProvider',productRoutes])
    .controller("ProductAddCtr",['$scope','$resource','$location','Products','Companys',productAddCtr])
    .controller("ProductListCtr",['$scope','$resource','$http','$location','ProductSearch','Product','Products',productListCtr])
    .controller("ProductUpdateCtr",['$scope','$resource','$location','$routeParams','Product',productUpdateCtr])
    .controller("ProductShowCtr", ['$scope', '$resource','$location', '$routeParams','Product',productShowCtr])


function productRoutes($routeProvider, $locationProvider) {
    $routeProvider.when('/products',{
        templateUrl: '/templates/products/index.html',
        controller: 'ProductListCtr'
    });

    $routeProvider .when('/products/new',{
        templateUrl: '/templates/products/new.html',
        controller: 'ProductAddCtr'
    });
        
    $routeProvider .when('/products/:id/edit',{
        templateUrl: '/templates/products/edit.html',
        controller: 'ProductUpdateCtr'
    });
        
    $routeProvider.when('/products/:id/show',{
        templateUrl: '/templates/products/show.html',
        controller: 'ProductShowCtr'
    });
        
    $routeProvider.when('/products/:id/delete',{
        controller: 'ProductDeleteCtr'
    });
}

function productAddCtr($scope,$resource,$location,Products,Companys){
    $scope.product = {};
    $scope.save = save; 
    function save(){
        Products.create({
            product: $scope.product
        },
        function(){
            $location.path('/products');
        },
        function(err){
            console.log(err);
            console.log($scope.product)
        });
    }

    function loadCompanys(){
        $scope.companys = Companys.query();
        console.log($scope.companys) 
    }
}

function productListCtr($scope,$resource,$http,$location,ProductSearch,Product,Products){
    $scope.selectedFilter = "comercialname";
    $scope.search = {};
    $scope.query = "";
    $scope.products = Products.query();
    $scope.remove = remove;
    $scope.redirectShow = redirectShow;
    $scope.redirectNew = redirectNew;
    $scope.clearFilter = clearFilter;
    $scope.filters = {
        comercialname: "nombre comercial",
        code: "codigo",
        line: "linea",
        genericname: "nombre generico"
    }

    $scope.searchProduct = function(query,filter) {
        $scope.products = ProductSearch.query({search: query, filter: filter});
    }

    function redirectShow(id){
        var route = "/products/"+id+"/show";
        $location.path(route);
    }

    function redirectNew(){
        $location.path("/products/new");
    }

    function remove(productId){
        if (confirm("Are you sure you want to delete the product?")){
          Product.delete({ id: productId }, function(){
            $scope.products = Product.query();
            $location.path('/products');
          });
        }
    }

    function clearFilter(){
        $scope.search = {}; 
    }
}

function productUpdateCtr($scope,$resource,$location,$routeParams,Product){
    $scope.product = Product.show({id: $routeParams.id});
    console.log($scope.product);
    $scope.update = update;
    function update(){
        Product.update({
            id: $scope.product.id
        },{
            product: $scope.product
        },
        function(){
            $location.path('/products');
        },
        function(err){
            console.log(err);
        });
    }
}

function productShowCtr($scope, $resource, $location, $routeParams,Product) {
    $scope.product = Product.show({id: $routeParams.id});
    $scope.remove = remove;
    $scope.redirectEdit = redirectEdit;
    
    function redirectEdit(){
        var route = "/products/"+$routeParams.id+"/edit";
        console.log(route);
        $location.path(route);
    }

    function remove(){
        if (confirm("Are you sure you want to delete the product?")){
          Product.delete({ id: $routeParams.id }, function(){
            $scope.products = Product.query();
            $location.path('/products');
          });
        }
    }
}
