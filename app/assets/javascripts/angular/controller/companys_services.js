myApp
    .factory('Companys',['$resource',companysFactory])
    .factory('Company',['$resource',companyFactory])

function companysFactory($resource){
    return $resource('/companies.json',{},{
        query : { method: 'GET', isArray: true },
        create: { method: 'POST' }    
    });
}

function companyFactory($resource){
    return $resource('/companies/:id.json',{},{
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'}}
    });
}
