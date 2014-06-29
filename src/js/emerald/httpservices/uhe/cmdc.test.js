'use strict';

describe('MODULE ef:cmdc', function() {
    
    describe('PROVIDER cmdc:host', function() {
        beforeEach(function() {
            module('ef:cmdc');
        });

        it('should exist', inject([
            'cmdc:host',
            function(cmdcHost) {
                expect(cmdcHost).toBeDefined();
                expect(cmdcHost).toBeA('string');
            }
        ]));

        it('should have a default value of "http://localhost:8081"', inject([
            'cmdc:host',
            function(cmdcHost) {
                expect(cmdcHost).toBe('http://localhost:8081');
            }
        ]));

        it('should have a configurable host value', function() {
            module([
                'cmdc:hostProvider',
                function(cmdcHostProvider) {
                    expect(cmdcHostProvider).toBeDefined();
                    expect(cmdcHostProvider.setHost).toBeDefined();
                    expect(cmdcHostProvider.setHost).toBeA('function');
                    cmdcHostProvider.setHost('test');
                }
            ]);

            inject([
                'cmdc:host',
                function(cmdcHost) {
                    expect(cmdcHost).toBe('http://test:8081');
                }
            ]);
        });

        it('should have a configurable port value', function() {
            module([
                'cmdc:hostProvider',
                function(cmdcHostProvider) {
                    expect(cmdcHostProvider).toBeDefined();
                    expect(cmdcHostProvider.setPort).toBeDefined();
                    expect(cmdcHostProvider.setPort).toBeA('function');
                    cmdcHostProvider.setPort('test');
                }
            ]);

            inject([
                'cmdc:host',
                function(cmdcHost) {
                    expect(cmdcHost).toBe('http://localhost:test');
                }
            ]);
        });
    }); //PROVIDER cmdc:host

    describe('PROVIDER cmdc:services', function() {
        beforeEach(function() {
            module('ef:cmdc');
        });

        it('should exist', inject([
            'cmdc:services',
            function(cmdcServices) {
                expect(cmdcServices).toBeDefined();
            }
        ]));

    }); //PROVIDER cmdc:services

}); //MODULE ef:cmdc
