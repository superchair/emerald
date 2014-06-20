'use strict';
(function() {
    var upm = angular.module('UPM', []);

    upm.provider('upm:household', function() {
        var deviceId = '123';
        var api;

        return {
            setDeviceId: function(id) {
                deviceId = id;
            },

            $get: ['$http', '$q', function($http, $q) {
                if(!api) {
                    api = {
                        get: function() {
                            var deferredResponse = $q.defer();

                            var httpRequest = $http({
                                method: 'GET',
                                url: 'http://10.90.18.225:6040/upm/households?filter:devices.deviceId=' + deviceId
                            });

                            httpRequest.success(function(data, status, headers, config) {
                                console.log('success', data, status, headers, config);
                                deferredResponse.resolve('success');
                            });

                            httpRequest.error(function(data, status, headers, config) {
                                console.log('error', data, status, headers, config);
                                deferredResponse.reject('error');
                            });

                            return deferredResponse.promise;
                        }
                    };
                }
                return api;
            }]
        };
    });

})();
