'use strict';
(function() {
    var angularSeed = angular.module('Emerald', [
        'UPM'
    ]);

    angularSeed.constant('asName', 'Emerald');
    angularSeed.constant('asVersion', '0.0.1');

    angularSeed.controller('asMainCtrl', ['$scope', 'asName', 'asVersion', function($scope, asName, asVersion) {
        $scope.projectName = asName;
        $scope.projectVersion = asVersion;
    }]);

    angularSeed.controller('test', ['$scope', 'upm:household', function($scope, upmHousehold) {
        console.log('arguments', upmHousehold, $scope);
        upmHousehold.get();
    }]);

})();
