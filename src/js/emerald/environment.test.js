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

    describe('PROVIDER env:value', function() {
        it('should exist', inject([
            'env:value',
            function(envValue) {
                expect(envValue).toBeDefined();
                expect(envValue).toBeA('object');
            }
        ]));

        it('should get and set environment parameters', inject([
            'env:value',
            function(envValue) {
                var parameter = 'testParameter';
                var expectedValue = 'testValue';

                expect(envValue.get).toBeDefined();
                expect(envValue.get).toBeA('function');
                expect(envValue.set).toBeDefined();
                expect(envValue.set).toBeA('function');

                var initialValue = envValue.get(parameter);
                expect(initialValue).not.toBeDefined();
                envValue.set(parameter, expectedValue);
                var observedValue = envValue.get(parameter);
                expect(observedValue).toBe(expectedValue);
            }
        ]));

        it('should be configurable', function() {
            var configParams = {
                'test1': 'val1',
                'test2': 'val2'
            };
            
            module('ef:env', [
                'env:valueProvider',
                function(envValueProvider) {
                    expect(envValueProvider).toBeDefined();
                    expect(envValueProvider).toBeA('object');
                    expect(envValueProvider.set).toBeDefined();
                    expect(envValueProvider.set).toBeA('function');

                    envValueProvider.set(configParams);
                }
            ]);

            inject([
                'env:value',
                function(envValue) {
                    expect(envValue.get('test1')).toBe('val1');
                    expect(envValue.get('test2')).toBe('val2');
                }
            ]);
        });

        it('should allow multiple conifguration calls', function() {
            var configA = {
                'a': 1,
                'b': 1
            };
            var configB = {
                'b': 2,
                'c': 2
            };

            module('ef:env', [
                'env:valueProvider',
                function(envValueProvider) {
                    envValueProvider.set(configA);
                }
            ]);

            module('ef:env', [
                'env:valueProvider',
                function(envValueProvider) {
                    envValueProvider.set(configB);
                }
            ]);

            inject([
                'env:value',
                function(envValue) {
                    expect(envValue.get('a')).toBe(1);
                    expect(envValue.get('b')).toBe(2);
                    expect(envValue.get('c')).toBe(2);
                }
            ]);
        });
    });

}); //MODULE ef:env
