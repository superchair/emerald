'use strict';
(function() {
    var uhe = angular.module('ef:uhe', [
        'ef:env',
        'ef:upm',
        'ef:cmdc'
    ]);

    uhe.provider('uhe:services', [
        'upm:hostProvider',
        'cmdc:hostProvider',
        function(upmHostProvider, cmdcHostProvider) {
            return {
                setProxy: function(host, port) {
                    upmHostProvider.setHost(host);
                    upmHostProvider.setPort(port);
                    cmdcHostProvider.setHost(host);
                    cmdcHostProvider.setPort(port);
                },

                $get: [
                    '$q',
                    'env:value',
                    'cmdc:services',
                    'upm:households',
                    function($q, envValue, cmdcServices, upmHouseholds) {
                        return {
                            getServicesByDeviceId: function(deviceId) {
                                var deferred = $q.defer();
                                var region = envValue.get('region');

                                if(region) {
                                    // we can just get the service list
                                    cmdcServices.get(region).then(
                                        function(response) {
                                            console.log('got services', response);
                                        },
                                        function() {
                                            // error
                                            console.log('failed serviers', arguments);
                                        }
                                    );
                                }
                                else if(deviceId) {
                                    // with deviceId, we can get the region
                                    upmHouseholds.getHouseholdByDeviceId(deviceId).then(
                                        function(response) {
                                            console.log('got household', response);
                                        },
                                        function() {
                                            // error
                                            console.log('failed household', arguments);
                                        }
                                    );
                                }
                                else {
                                    console.log('i did not even have device id');
                                }

                                return deferred;
                            }
                        };
                    }
                ]
            };
        }
    ]);

})();
