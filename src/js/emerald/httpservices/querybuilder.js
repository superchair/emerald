'use strict';
(function() {
    var queryBuilder = angular.module('ef:QueryBuilder', []);

    queryBuilder.provider('querybuilder:build', function() {
        return {
            $get: ['$http', '$q', function($http, $q) {
                return function(httpConfig) {
                    var deferredResponse = $q.defer();

                    var httpRequest = $http(httpConfig);

                    httpRequest.success(function(data, status) {
                        deferredResponse.resolve({
                            data: data,
                            status: status
                        });
                    });

                    httpRequest.error(function(data, status) {
                        deferredResponse.reject({
                            data: data,
                            status: status
                        });
                    });

                    return deferredResponse.promise;
                };
            }]
        };
    });

})();
