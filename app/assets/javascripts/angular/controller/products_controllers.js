myApp.controller("ProductListCtr",['$scope','$resource',function($scope,$resource){

    $scope.filterProduct = "";
    $scope.products =[ 
        {
            codigo:'A1',
            nombre_comercial: 'Rivotril',
            nombre_generico: 'Clonazepam',
            precio_unitario:2,
            empresas:[
                {
                    linea: 'Roche'
                },
            ],
        },
        {
            codigo:'A2',
            nombre_comercial: 'Valium',
            nombre_generico: 'Diazepam',
            precio_unitario:4,
            empresas:[
                {
                    linea: 'Roche'
                },
            ],
        },
        {
            codigo:'A3',
            nombre_comercial: 'Bayaspirina',
            nombre_generico: 'Aspirina',
            precio_unitario:3,
            empresas:[
                {
                    linea: 'Bayer'
                },
            ],
        },
        {
            codigo:'A4',
            nombre_comercial: 'Eliur',
            nombre_generico: 'Furosemida',
            precio_unitario:25,
            empresas:[
                {
                    linea: 'Biomep'
                },
            ],
        },
        {
            codigo:'A5',
            nombre_comercial: 'Aforex',
            nombre_generico: 'albendazol',
            precio_unitario:30,
            empresas:[
                {
                    linea: 'Alcos'
                },
            ],
        },
        {
            codigo:'A6',
            nombre_comercial: 'Alcoderm',
            nombre_generico: 'Alcoderm',
            precio_unitario:45,
            empresas:[
                {
                    linea: 'Alcos'
                },
            ],
        },
        {
            codigo:'A7',
            nombre_comercial: 'Alcolax',
            nombre_generico: 'Bisacodilo',
            precio_unitario:58,
            empresas:[
                {
                    linea: 'Alcos'
                },
            ],
        },
        {
            codigo:'A8',
            nombre_comercial: 'AlcosKectil',
            nombre_generico: 'Cotrimoxazol',
            precio_unitario:64,
            empresas:[
                {
                    linea: 'Alcos'
                },
            ],
        },
        {
            codigo:'A9',
            nombre_comercial: 'Actilab',
            nombre_generico: 'Pseudoefedrina',
            precio_unitario:71,
            empresas:[
                {
                    linea: 'Alcos'
                },
            ],
        },
        {
            codigo:'A10',
            nombre_comercial: 'Dioxadol',
            nombre_generico: 'Antipiretico analgesico',
            precio_unitario:3,
            empresas:[
                {
                    linea: 'Bago'
                },
            ],
        },
    ]

    $scope.addProductLine = function(product, name){
        var line = {
            linea:name
        }
        product.empresas.push(line);
    }
    console.log($scope.product);


}]);
