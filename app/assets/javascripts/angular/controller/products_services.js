myApp
    .factory('Products', ['$resource',productsFactory])
    .factory('Product',['$resource',productFactory])

function productFactory($resource){
    return $resource('/products/:id.json',{},{
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    
    
    });



}

function productsFactory($resource){
    return $resource('/products.json',{},{
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    
    });


}
