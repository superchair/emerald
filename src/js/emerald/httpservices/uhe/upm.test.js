'use strict';

describe('MODULE UPM', function() {

    describe('PROVIDER upm:host', function() {
        beforeEach(function() {
            module('ef:upm');
        });

        it('should exist', inject([
            'upm:host',
            function(upmHost) {
                expect(!!upmHost).toBe(true);
                expect(upmHost).toBeDefined();
            }
        ]));

        it('should be a string', inject([
            'upm:host',
            function(upmHost) {
                expect(upmHost).toBeA('string');
            }
        ]));

        it('should have a default value of "http://localhost:8081"', inject([
            'upm:host',
            function(upmHost) {
                expect(upmHost).toEqual('http://localhost:8081');
            }
        ]));

        it('should have a configurable host value', function() {
            module(['upm:hostProvider', function(upmHostProvider) {
                expect(!!upmHostProvider.setHost).toBe(true);
                expect(upmHostProvider.setHost).toBeDefined();
                expect(upmHostProvider.setHost).toBeA('function');
                upmHostProvider.setHost('test');
            }]);

            inject([
                'upm:host',
                function(upmHost) {
                    expect(upmHost).toEqual('http://test:8081');
                }
            ]);
        });

        it('should have a configurable port value', function() {
            module(['upm:hostProvider', function(upmHostProvider) {
                expect(!!upmHostProvider.setPort).toBe(true);
                expect(upmHostProvider.setPort).toBeDefined();
                expect(upmHostProvider.setPort).toBeA('function');
                upmHostProvider.setPort('1234');
            }]);

            inject([
                'upm:host',
                function(upmHost) {
                    expect(upmHost).toEqual('http://localhost:1234');
                }
            ]);
        });
    }); //PROVIDER upm:host

    describe('PROVIDER upm:households', function() {
        beforeEach(function() {
            module('ef:upm');
        });

        it('should exist', inject([
            'upm:households',
            function(upmHouseholds) {
                expect(!!upmHouseholds).toBe(true);
                expect(upmHouseholds).toBeDefined();
            }
        ]));

        it('should be an object', inject([
            'upm:households',
            function(upmHouseholds) {
                expect(upmHouseholds).toBeA('object');
            }
        ]));

        describe('METHOD getHouseholds', function() {
            it('should exist and be a function', inject([
                'upm:households',
                function(upmHouseholds) {
                    expect(!!upmHouseholds.getHouseholds).toBe(true);
                    expect(upmHouseholds.getHouseholds).toBeDefined();
                    expect(upmHouseholds.getHouseholds).toBeA('function');
                }
            ]));

            it('should call the queryBuilder', function() {
                var _queryBuilderMock;
                var _expected = {
                    url: 'http://localhost:8081/upm/households',
                    method: 'GET'
                };

                module('ef:upm', function($provide) {
                    $provide.factory('querybuilder:build', function() {
                        _queryBuilderMock = jasmine.createSpy('querybuilder:build mock').andReturn({
                            promise: null
                        });
                        return _queryBuilderMock;
                    });
                });

                inject([
                    'upm:households',
                    function(upmHouseholds) {
                        upmHouseholds.getHouseholds();
                        expect(_queryBuilderMock).toHaveBeenCalled();
                        expect(_queryBuilderMock).toHaveBeenCalledWith(_expected);
                    }
                ]);
            });
        }); //METHOD getHouseholds

        describe('METHOD getHouseholdByDeviceId', function() {
            it('should exist and be a function', inject([
                'upm:households',
                function(upmHouseholds) {
                    expect(upmHouseholds.getHouseholdByDeviceId).toBeDefined();
                    expect(upmHouseholds.getHouseholdByDeviceId).toBeA('function');
                }
            ]));

            it('should call the queryBuilder', function() {
                var _queryBuilderMock;
                var _deviceId = 'test';
                var _expected = {
                    url: 'http://localhost:8081/upm/households',
                    method: 'GET',
                    params: {
                        'filter:devices.deviceId': _deviceId
                    }
                };
                
                module('ef:upm', function($provide) {
                    $provide.factory('querybuilder:build', function() {
                        _queryBuilderMock = jasmine.createSpy('querybuilder:build mock').andReturn({
                            promise: null
                        });
                        return _queryBuilderMock;
                    });
                });

                inject([
                    'upm:households',
                    function(upmHouseholds) {
                        upmHouseholds.getHouseholdByDeviceId(_deviceId);
                        expect(_queryBuilderMock).toHaveBeenCalled();
                        expect(_queryBuilderMock).toHaveBeenCalledWith(_expected);
                    }
                ]);
            });
        }); //METHOD getHouseholdByDeviceId

    }); //PROVIDER upm:household

}); //MODULE UPM
