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
    self.searchText = "";
    self.setSearchText = setSearchText;
    loadCompanys();

    function newCompany(text){
      var data = {line: text};
      Companys.create({company: data}, function(){
            console.log('esta ingresando');
            loadCompanysSetId(text);
          }, function(error){
              console.log(error)
          });
    }

    function loadCompanysSetId(name){
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
               setCompanyId(name);
           },function(err){
               console.log(err);
           });
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
               setEdit();
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

    function setSearchText(text){
        self.searchText = text;
    }

    function setEdit(){
        var parent_scope = $scope.$parent.$parent;
        var product_promise = parent_scope.product.$promise;
        if(product_promise != undefined){
            product_promise.then(function(product){
                if (product != undefined){
                    var results = self.querySearch(product.line);
                    if(results.length >= 1){
                        product.company_id = results[0].id
                    }
                    self.setSearchText(product.line);
                }
            },function(err){
                console.log(err);
            
            });
        }
    }

    function setCompanyId(nameCompany){
        var parent_scope = $scope.$parent.$parent;
        var product = parent_scope.product;
        var results = self.querySearch(nameCompany);
        if(results.length>=1){
            product.company_id = results[0].id;
        }
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
