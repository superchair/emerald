'use strict';
(function() {
    var main = angular.module('CiscoWhitelabel', [
        'EmeraldFramework'
    ]);

    main.controller('mainCtrl', [
        '$scope',
        'env:app.name',
        'env:app.version',
        'env:value',
        'upm:households',
        function($scope, asName, asVersion, envValue, households) {
            $scope.projectName = asName;
            $scope.projectVersion = asVersion;
            $scope.deviceId = envValue.get('deviceId');
            households.getHouseholdByDeviceId(envValue.get('deviceId'));
        }
    ]);

})();
