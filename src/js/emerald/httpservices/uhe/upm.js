'use strict';
(function() {
    var upm = angular.module('ef:upm', [
        'ef:QueryBuilder'
    ]);

    upm.provider('upm:host', function() {
        var _host = 'localhost';
        var _port = '8081';

        return {
            setHost: function(host) {
                _host = host;
            },

            setPort: function(port) {
                _port = port;
            },

            $get: function() {
                return 'http://' + _host + ':' + _port;
            }
        };
    });

    upm.provider('upm:households', function() {
        var api = '/upm/households';

        return {
            $get: [
                'upm:host',
                'querybuilder:build',
                function(upmHost, queryBuilder) {
                    return {
                        getHouseholds: function() {
                            var httpConfig = {
                                url: upmHost + api,
                                method: 'GET'
                            };

                            return queryBuilder(httpConfig);
                        },

                        getHouseholdByDeviceId: function(deviceId) {
                            var httpConfig = {
                                url: upmHost + api,
                                method: 'GET',
                                params: {
                                    'filter:devices.deviceId': deviceId
                                }
                            };

                            return queryBuilder(httpConfig);
                        },

                        getHouseholdById: function(householdId) {
                            var httpConfig = {
                                url: upmHost + api + '/' + householdId,
                                method: 'GET',
                            };
                            return queryBuilder(httpConfig);
                        }
                    };
                }
            ]
        };
    });

})();
