'use strict';
(function() {
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
            $scope.deviceId = envDeviceId.get();
            households.getHouseholdByDeviceId(envDeviceId.get());
        }
    ]);

})();
