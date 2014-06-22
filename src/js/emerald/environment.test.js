'use strict';

describe('MODULE ef:env', function() {

    beforeEach(function() {
        module('ef:env');
    });

    describe('CONSTANT env:app.name', function() {
        it('should exist', inject([
            'env:app.name',
            function(envAppName) {
                expect(envAppName).toBeDefined();
                expect(envAppName).toBeA('string');
            }
        ]));
    }); //CONSTANT env:app.name

    describe('CONSTANT env:app.version', function() {
        it('should exist', inject([
            'env:app.version',
            function(envAppName) {
                expect(envAppName).toBeDefined();
                expect(envAppName).toBeA('string');
            }
        ]));
    }); //CONSTANT env:app.version

    describe('PROVIDER env:deviceId', function() {
        it('should exist', inject([
            'env:deviceId',
            function(envDeviceId) {
                expect(envDeviceId).toBeDefined();
                expect(envDeviceId).toBeA('object');
            }
        ]));

        it('should have a get and set method', inject([
            'env:deviceId',
            function(envDeviceId) {
                expect(envDeviceId.get).toBeDefined();
                expect(envDeviceId.get).toBeA('function');
                expect(envDeviceId.set).toBeDefined();
                expect(envDeviceId.set).toBeA('function');

                var newValue = 'test';
                var initialValue = envDeviceId.get();
                expect(initialValue).not.toBe(newValue);
                envDeviceId.set(newValue);
                var observedValue = envDeviceId.get();
                expect(initialValue).not.toBe(observedValue);
                expect(observedValue).toBe(newValue);
            }
        ]));

        it('should be configurable', function() {
            var expectedValue = 'test';

            module([
                'env:deviceIdProvider',
                function(envDeviceIdProvider) {
                    expect(envDeviceIdProvider).toBeDefined();
                    expect(envDeviceIdProvider.set).toBeDefined();
                    envDeviceIdProvider.set(expectedValue);
                }
            ]);

            inject([
                'env:deviceId',
                function(envDeviceId) {
                    var observedValue = envDeviceId.get();
                    expect(observedValue).toBe(expectedValue);
                }
            ]);
        });
    }); //PROVIDER env:deviceId

}); //MODULE ef:env
