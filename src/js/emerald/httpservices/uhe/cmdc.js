'use strict';
(function() {
    var cmdc = angular.module('ef:cmdc', [
        'ef:QueryBuilder'
    ]);

    cmdc.provider('cmdc:host', function() {
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

    cmdc.provider('cmdc:services', function() {
        var api = '/cmdc/services';

        return {
            $get: [
                'cmdc:host',
                'querybuilder:build',
                function(cmdcHost, queryBuilder) {
                    return {
                        get: function(region) {
                            var httpConfig = {
                                url: cmdcHost + api,
                                method: 'GET',
                                params: {
                                    'sort': 'logicalChannelNumber',
                                    'count': 255,
                                    'lang': 'eng',
                                    'region': region
                                }
                            };
                            return queryBuilder(httpConfig);
                        }
                    };
                }
            ]
        };
    });
})();
