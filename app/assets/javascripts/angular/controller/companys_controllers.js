myApp
    .controller("CompanyListCtr",['$scope','$resource','$http','Companys','Company',companyListCtr])
    .controller("companyAutoCompleteCtr",['$scope','$q','$log','Companys',companyAutoCompleteCtr])

function companyAutoCompleteCtr($scope,$q,$log,Companys){
    var self = this;
    self.isDisabled = false;
    self.companys = undefined;
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;
    self.newCompany = newCompany;
    loadCompanys();

    function newCompany(){
        console.log("Caracteristica por implementar");
    }

    function loadCompanys(){
       var promise = Companys.query().$promise;
       promise
           .then(function(companys){
               self.companys = companys.map(function(company){
                   return ({
                       value: company.line.toLowerCase(),
                       line: company.line,
                       id: company.id
                   });
               });
           },function(err){
               console.log(err);
           });
    }
    
    function querySearch(query){
        var results = query ? self.companys.filter(createFilterFor(query)) : self.companys;
        return results;
    
    }

    function createFilterFor(query){
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(company){
            return (company.value.indexOf(lowercaseQuery) === 0);
        
        };
    }

    function selectedItemChange(item){
        $log.info('Item changed to ' + JSON.stringify(item));
    
    }

    function searchTextChange(text){
        $log.info('Text changed to ' + text);
    }
}

function companyListCtr($scope,$resource,$http,Companys,Companys){

    $scope.companys = Companys.query();

    function remove(companyId){
        if (confirm("Are you sure you want to delete the company?")){
          Company.delete({ id: companyId }, function(){             $scope.companys = Company.query();
            $location.path('/');
          });
        }
    }
}
