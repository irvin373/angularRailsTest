//Factory 
myApp.factory('ProductSell', ['$resource',function($resource){
  return $resource('/product_sell.json', {},{
    query: { method: 'GET', isArray: true }
  })
}]);

myApp.factory('Rol', ['$resource', function($resource){
  return $resource('/rols/:id.json', {}, {
    query: { method: 'GET' }
  });
}]);

myApp.factory('SellSearch', ['$resource',function($resource){
  return $resource('/sells.json?search=:query', {},{
    query: { method: 'GET', params: {query: '@query'} ,isArray: true }
  })
}]);

myApp.factory('Sells', ['$resource',function($resource){
  return $resource('/sells.json', {},{
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
}]);

myApp.factory('Sell', ['$resource', function($resource){
  return $resource('/sells/:id.json', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
}]);

myApp.factory('AsignSell', ['$resource',function($resource){
  return $resource('/sells/asign',{},{
    query: { method: 'POST' }
  })
}]);

myApp.factory('Last', ['$resource',function($resource){
  return $resource('/sells/last.json',{},{
    get: { method: 'GET' }
  })
}]);

myApp.factory('Report2day', ['$resource',function($resource){
  return $resource('/reports/day/:date1/:date2.json',{},{
    query: { method: 'GET', isArray: true }
  })
}]);

myApp.factory('Reportday', ['$resource',function($resource){
  return $resource('/reports/mounth/:day.json',{},{
    query: { method: 'GET', isArray: true }
  })
}]);

//Controller
myApp.controller("SellListCtr", 
    ['$scope', '$http', '$resource', 'Sells', 'SellSearch', 'Auth','Rol','$location', 
    function($scope, $http, $resource, Sells, SellSearch, Auth,Rol,$location) {

  $scope.sells = Sells.query();
  var role = "";

  $scope.search = function (query) {
      $scope.sells = SellSearch.query({search: query});
  };
  
  Auth.currentUser().then(function(user) {
        role = Rol.query({id: user.role_id});
            //console.log(user); // => {id: 1, ect: '...'}
        }, function(error) {
            console.log(error);
  });

  $scope.reports = function () {
      var route = "/reports/";
      $location.path(route);
  };

  $scope.redirectShow = function (Id) {
      var route = "/sells/"+Id;
      $location.path(route);
    };
}]);

myApp.controller("SellAddProductSellCtr", ['$scope', '$resource', 'ProductSell', 'AsignSell', 'Sell', '$location', '$routeParams', 
  function($scope, $resource, ProductSell, AsignSell ,Sell, $location, $routeParams) {
  $scope.sell = Sell.get({id: $routeParams.id})
  $scope.products = ProductSell.query();
  $scope.quantity = 1;
  
  console.log($scope.products);
  $scope.doSomething = function(id_product,id_sell,quantity,sellPrice, almacen){
    almacen=parseInt(almacen);
    if (quantity <= 0) {
      alert("por favor ingrese valores mayores a 0");
    }
    else{
      if (quantity <= almacen) {
          AsignSell.query({id: id_sell},{product_id: id_product,sell_id: id_sell, quantity: quantity,sellpromo:sellPrice}, function(){
          alert('asignado a la factura');
          }, function(error) {
            alert('Agregado');
            console.log(error)
          });
          $scope.products = ProductSell.query();
      }
      else{
        alert('la cantidad que intenta vender no se encuentra en el Almacen')
      }
    }
  };
}]);


myApp.controller("SellAddCtr", ['$scope', '$resource', 'Sells','$location', '$http', 'Last',
    function($scope, $resource, Sells, $location, $http, Last) {
        $scope.save = function () {
            console.log($scope.sell);
            Sells.create({sell: $scope.sell}, function(){
              $scope.last = Last.get();
              $scope.last.$promise.then(function(data) {
                $location.path("/sells/"+data.id);
              });
            }, function(error){
                console.log(error)
            });
        }
}]);

myApp.controller("SellUpdateCtr", ['$scope', '$resource', 'Sell', '$location', '$routeParams',
  function($scope, $resource, Sell, $location, $routeParams) {
  $scope.sell = Sell.get({id: $routeParams.id})
  console.log($scope.sell);
  $scope.update = function(){
      Sell.update({id: $scope.sell.id},{sell: $scope.sell},function(){
        $location.path("/sells");
      }, function(error) {
        console.log(error)
      });
  };
}]);

myApp.controller("SellShowCtr", ['$scope', '$resource', 'Sell', 'Session', '$location', '$routeParams', 
  function($scope, $resource, Sell, Session, $location, $routeParams) {
  $scope.sell = Sell.get({id: $routeParams.id});
  $scope.isAdmin = Session.isAdmin();

  $scope.deleteSell = function (sellId) {
    if (confirm("quiere eliminar la venta?")){
      Sell.delete({ id: sellId }, function(){
        $location.path("/sells");
      });
    }
  };
}]);

myApp.controller("ReportsCtr", ['$scope', '$resource', '$location', '$routeParams', 
  function($scope, $resource, $location, $routeParams) {
    var date = new Date();
    var date1 = new Date();
    var date2 = new Date();
    $scope.day = date;
    $scope.mounth = 0;
    $scope.year = 2019;
    $scope.day_selected_pdf = function (){
      dates = $scope.day.getFullYear() + '-' + ($scope.day.getMonth()+1) + '-' +$scope.day.getDate(); 
      window.location.pathname = "/pdf/report/day/"+dates+".pdf";
    };

    $scope.mounth_selected_pdf = function (){
      dates = $scope.year + '-' + ($scope.mounth) + '-' +1;
      window.location.pathname = "/pdf/report/mounth/"+dates+".pdf";
    };

    $scope.dateSelectorPdf = function (){
      date1 = $scope.date1.getFullYear() + '-' + ($scope.date1.getMonth()+1) + '-' +$scope.date1.getDate(); 
      date2 = $scope.date2.getFullYear() + '-' + ($scope.date2.getMonth()+1) + '-' +$scope.date2.getDate(); 
      window.location.pathname = "/pdf/report/day/"+date1+'/'+date2+".pdf";
    };

    $scope.day_selected = function (){
      dates = $scope.day.getFullYear() + '-' + ($scope.day.getMonth()+1) + '-' +$scope.day.getDate(); 
      $location.path("/reports/day/"+dates);
    };
    $scope.mounth_selected = function (){
      dates = $scope.year + '-' + ($scope.mounth) + '-' +1;
      $location.path("/reports/mounth/"+dates);
    };

    $scope.dateSelector = function (){
      date1 = $scope.date1.getFullYear() + '-' + ($scope.date1.getMonth()+1) + '-' +$scope.date1.getDate(); 
      date2 = $scope.date2.getFullYear() + '-' + ($scope.date2.getMonth()+1) + '-' +$scope.date2.getDate(); 
      $location.path("/reports/day/"+date1+'/'+date2);
    };

    $scope.reporteAlmacenPdf = function (){
        window.location.pathname = "/pdf/report/lots.pdf";
    }
}]);

myApp.controller("ReportsCtrDay", ['$scope', '$resource', '$location','Reportday', '$routeParams', 
  function($scope, $resource, $location, Reportday, $routeParams) {
    $scope.day = $routeParams.day;
    $scope.sells = Reportday.query({day: $routeParams.day});
    $scope.CalculateTotal = function(){
      return $scope.sells.reduce(function(total, i){ return total += i.total},0);
    }

    $scope.redirectShow = function (Id) {
      var route = "/sells/"+Id;
      $location.path(route);
    };
}]);

myApp.controller("ReportsCtr2Day", ['$scope', '$resource', '$location', 'Report2day','$routeParams', 
  function($scope, $resource, $location, Report2day,$routeParams) {
    $scope.day = $routeParams.day1 + " al " + $routeParams.day2;
    // $scope.day = {date1: $routeParams.day1, date2: $routeParams.day2};
    // $scope.day += {date2: $routeParams.day};
    $scope.sells = Report2day.query({date1: $routeParams.day1, date2: $routeParams.day2});
    $scope.CalculateTotal = function(){
      return $scope.sells.reduce(function(total, i){ return total += i.total},0);
    }

    $scope.redirectShow = function (Id) {
      var route = "/sells/"+Id;
      $location.path(route);
    };
}]);

//Routes
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when("/sells",{
      templateUrl: '/templates/sells/index.html',
      controller: 'SellListCtr'
    });
    $routeProvider.when('/sells/new', {
      templateUrl: '/templates/sells/new.html',
      controller: 'SellAddCtr'
    });
    $routeProvider.when('/sells/:id/edit', {
      templateUrl: '/templates/sells/edit.html',
      controller: "SellUpdateCtr"
    });
    $routeProvider.when('/sells/:id/delete', {
      controller: "SellDeleteCtr"
    });
    $routeProvider.when('/sells/:id/add', {
      templateUrl: '/templates/sells/agregar.html',
      controller: "SellAddProductSellCtr"
    });
    $routeProvider.when('/sells/:id', {
      templateUrl: '/templates/sells/show.html',
      controller: "SellShowCtr"
    });
    $routeProvider.when('/reports', {
      templateUrl: '/templates/reports/index.html',
      controller: "ReportsCtr"
    });
    $routeProvider.when('/reports/day/:day', {
      templateUrl: '/templates/reports/reportsDay.html',
      controller: "ReportsCtrDay"
    });
    $routeProvider.when('/reports/day/:day1/:day2', {
      templateUrl: '/templates/reports/reportsDay.html',
      controller: "ReportsCtr2Day"
    });
    $routeProvider.when('/reports/mounth/:day', {
      templateUrl: '/templates/reports/reportsDay.html',
      controller: "ReportsCtrDay"
    });
  }
]);
