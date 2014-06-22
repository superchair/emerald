'use strict';
(function() {
    var env = angular.module('ef:env', []);

    env.constant('env:app.name', '<%= emerald.build.name %>');
    env.constant('env:app.version', '<%= emerald.build.version %>');

    env.provider('env:value', function() {
        var _configParams = {};
        return {
            set: function(configParams) {
                angular.forEach(configParams, function(value, key) {
                    _configParams[key] = value;
                });
            },

            $get: function() {
                return {
                    get: function(parameter) {
                        return _configParams[parameter];
                    },

                    set: function(parameter, value) {
                        _configParams[parameter] = value;
                    }
                };
            }
        };
    });
})();
