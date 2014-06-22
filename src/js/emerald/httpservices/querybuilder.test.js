'use strict';

describe('MODULE ef:QueryBuilder', function() {

    describe('PROVIDER querybuilder:build', function() {
        beforeEach(function() {
            module('ef:QueryBuilder');
        });

        it('should exist', inject([
            'querybuilder:build',
            function(queryBuilder) {
                expect(queryBuilder).toBeDefined();
                expect(queryBuilder).toBeA('function');
            }
        ]));

        it('should make an http request using the httpConfig input', function() {
            var url = 'http://test.com';
            inject([
                'querybuilder:build',
                '$httpBackend',
                function(queryBuilder, $httpBackend) {
                    $httpBackend.when('GET', url).respond({});
                    $httpBackend.expectGET(url);
                    queryBuilder({
                        method: 'GET',
                        url: url
                    });
                    $httpBackend.flush();
                }
            ]);
        });

        it('should return a promise that resolves the correct value', function() {
            var url = 'http://test.com';
            var returnValue = {
                testValue: 'test'
            };
            inject([
                'querybuilder:build',
                '$httpBackend',
                function(queryBuilder, $httpBackend) {
                    $httpBackend.when('GET', url).respond(200, returnValue);
                    var promise = queryBuilder({
                        method: 'GET',
                        url: url
                    });
                    var promiseResolveHandler = jasmine.createSpy('Resolve Handler');
                    promise.then(promiseResolveHandler);
                    expect(promise.then).toBeDefined();
                    expect(promise.then).toBeA('function');

                    $httpBackend.flush();

                    expect(promiseResolveHandler).toHaveBeenCalled();
                    expect(promiseResolveHandler).toHaveBeenCalledWith({
                        data: jasmine.any(Object),
                        status: jasmine.any(Number)
                    });

                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                }
            ]);
        });

        it('should return a promise that rejects on an http error status', function() {
            var url = 'http://test.com';
            var returnValue = {
                testValue: 'test'
            };
            inject([
                'querybuilder:build',
                '$httpBackend',
                function(queryBuilder, $httpBackend) {
                    $httpBackend.when('GET', url).respond(404, returnValue);
                    var promise = queryBuilder({
                        method: 'GET',
                        url: url
                    });
                    var promiseResolveHandler = jasmine.createSpy('Resolve Handler');
                    var promiseRejectHandler = jasmine.createSpy('Reject Handler');

                    promise.then(promiseResolveHandler, promiseRejectHandler);

                    $httpBackend.flush();

                    expect(promiseResolveHandler).not.toHaveBeenCalled();
                    expect(promiseRejectHandler).toHaveBeenCalled();
                    expect(promiseRejectHandler).toHaveBeenCalledWith({
                        data: returnValue,
                        status: 404
                    });

                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                }
            ]);
        });

    }); //PROVIDER querybuilder:build

}); //MODULE ef:QueryBuilder
