myApp
    .factory('Products', ['$resource',productsFactory])
    .factory('Product',['$resource',productFactory])
    .factory('ProductSearch',['$resource',ProductSearch])
    .factory('expirationProducts',['$resource',expirationProducts])

function productFactory($resource){
    return $resource('/products/:id.json',{},{
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'}}
    });
}

function productsFactory($resource){
    return $resource('/products.json',{},{
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    });
}

function ProductSearch($resource){
    return $resource('/products.json?search=:query&filter=:filter', {},{
    query: { method: 'GET', params: {query: '@query', filter:'@filter'} ,isArray: true }
    });
}

function expirationProducts($resource){
    return $resource('/report_expiration.json',{},{
        query: { method: 'GET', isArray: true }
    });
}