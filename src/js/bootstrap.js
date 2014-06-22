'use strict';

$(document).ready(function() {
    
    var cfgRequest = jQuery.ajax({
        type: 'GET',
        url: 'env.cfg',
        dataType: 'json',
        async: false
    });

    cfgRequest.then(
        function(data) {
            if(!data.bootstrap.appname) {
                data.bootstrap.appname = 'CiscoWhitelabel';
            }

            var bootstrap = angular.module('app.bootstrap', [
                data.bootstrap.appname
            ]);

            bootstrap.config(['env:valueProvider', function(envValueProvider) {
                envValueProvider.set(data.app);
            }]);

            angular.bootstrap(document, ['app.bootstrap']);
        },

        function(jqXHR, httpStatus, errorThrown) {
            //TODO do something more useful here
            console.log('error!', jqXHR, httpStatus, errorThrown);
        }
    );
});
