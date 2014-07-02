'use strict';
(function() {
    var main = angular.module('CiscoWhitelabel', [
        'EmeraldFramework'
    ]);

    //main.controller('mainCtrl', [
        //'$scope',
        //'env:app.name',
        //'env:app.version',
        //'env:value',
        //'upm:households',
        //'cmdc:services',
        //function($scope, asName, asVersion, envValue, households, cmdcServices) {
            //$scope.projectName = asName;
            //$scope.projectVersion = asVersion;
            //$scope.deviceId = envValue.get('deviceId');
            //households.getHouseholdByDeviceId(envValue.get('deviceId'));
            //households.getHouseholdById('rogershh');
            //cmdcServices.get(24960);
        //}
    //]);

    main.config(['upm:hostProvider', function(upmHostProvider) {
        upmHostProvider.setPort(8000);
    }]);

    main.controller('mainCtrl', [
        'uhe:services',
        'env:value',
        function(uheServices, envValue) {
            uheServices.getServicesByDeviceId(envValue.get('deviceId'));
        }
    ]);

})();
