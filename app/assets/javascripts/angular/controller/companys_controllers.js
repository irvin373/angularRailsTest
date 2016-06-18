myApp
    .controller("CompanyListCtr",['$scope','$resource','$http','Companys','Company',companyListCtr])
    .controller("CompanyAutoCompletCtr",['$scope','Companys',companyAutoCompleteCtr])

function companyAutoCompleteCtr($scope,Companys){
    var self = this;
    self.companys = loadCompanys();
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;
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
