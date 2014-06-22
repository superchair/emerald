'use strict';
(function() {
    // boostrap
    var cfg = jQuery.ajax({
        type: 'GET',
        url: 'env.cfg',
        dataType: 'json',
        async: false
    });

    cfg.then(
        function(data) {
            //success
            var main = angular.module('CiscoWhitelabel', [
                'EmeraldFramework'
            ]);

            main.controller('mainCtrl', [
                '$scope',
                'env:app.name',
                'env:app.version',
                'env:deviceId',
                'upm:households',
                function($scope, asName, asVersion, envDeviceId, households) {
                    $scope.projectName = asName;
                    $scope.projectVersion = asVersion;
                    households.getHouseholdByDeviceId(envDeviceId.get());
                    households.getHouseholds();
                }
            ]);

            main.config(['env:deviceIdProvider', function(envDeviceIdProvider) {
                envDeviceIdProvider.set(data.deviceId);
            }]);

            // bootsrap the application
            $(document).ready(function() {
                angular.bootstrap(document, ['CiscoWhitelabel']);
            });
        },

        function(jqXHR, httpStatus, errorThrown) {
            console.log('error!', jqXHR, httpStatus, errorThrown);
        }
    );
})();
