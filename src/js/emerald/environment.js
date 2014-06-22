'use strict';
(function() {
    var env = angular.module('ef:env', []);

    env.constant('env:app.name', '<%= emerald.build.name %>');
    env.constant('env:app.version', '<%= emerald.build.version %>');

    env.provider('env:deviceId', function() {
        var _deviceId;
        return {
            set: function(deviceId) {
                _deviceId = deviceId;
            },

            $get: function() {
                return {
                    get: function() {
                        return _deviceId;
                    },
                    set: function(deviceId) {
                        _deviceId = deviceId;
                    }
                };
            }
        };
    });

    env.provider('env:init', [
        'env:deviceIdProvider',
        function(deviceIdProvider) {
            return {
                init: function(configParams) {
                    deviceIdProvider.set(configParams.deviceId);
                },

                $get: function() {
                    return null;
                }
            };
        }
    ]);

})();
