'use strict';
(function() {
    var angularSeed = angular.module('AngularSeed', [
    ]);

    angularSeed.constant('asName', 'Angular Seed');
    angularSeed.constant('asVersion', '0.0.1');

    angularSeed.controller('asMainCtrl', ['$scope', 'asName', 'asVersion', function($scope, asName, asVersion) {
        $scope.projectName = asName;
        $scope.projectVersion = asVersion;
    }]);

})();
