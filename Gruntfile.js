'use strict';

module.exports = function(grunt) {

    // load all grunt tasks for use
    require('load-grunt-tasks')(grunt);
    var nconf = require('nconf');

    // get the config file
    var cfgFile = './Gruntfile.properties';
    nconf.use('file', {
        file: './Gruntfile.properties',
        format: nconf.formats.json
    });
    nconf.load();
    var config = nconf.get();

    // task configurations
    grunt.initConfig({

        // load config parameters
        config: config,

        // watch config parameters
        watch: {
            dev: {
                options: {
                    livereload: config.ports.watch
                },
                files: [
                    '<%= config.paths.src %>/**/*.html',
                    '<%= config.paths.src %>/**/*.css',
                    '<%= config.paths.src %>/js/**/*.js',
                    '<%= config.paths.src %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= config.paths.test %>/**/*.js'
                ],
                tasks: [
                    'jshint:dev',
                    'karma:dev:run'
                ]
            }
        }, // watch config parameters

        // connect config parameters
        connect: {
            dev: {
                options: {
                    port: config.ports.livereload,
                    hostname: '0.0.0.0',
                    base: '<%= config.paths.src %>',
                    middleware: function(connect, options) {
                        return [
                            require('connect-livereload')({
                                port: config.ports.watch
                            }),
                            connect.static(options.base)
                        ]
                    }
                }
            }
        }, // connect config parameters

        // open config parameters
        open: {
            // opens the live reload url
            dev: {
                url: 'http://localhost:<%= connect.dev.options.port %>'
            }
        }, // open config parameters

        // vwsemu config parameters
        vwsemu: {
            dev: {
                options: {
                    proxyport: config.ports.vwsemu
                },
                uhe: {
                    cmdc: {
                        host: config.uhe.cmdc.host,
                        port: config.uhe.cmdc.port
                    },
                    upm: {
                        host: config.uhe.upm.host,
                        port: config.uhe.upm.port
                    },
                    hep: {
                        host: config.uhe.hep.host,
                        port: config.uhe.hep.port
                    },
                    pps: {
                        host: config.uhe.pps.host,
                        port: config.uhe.pps.port
                    }
                }
            }
        }, // vwsemu config parameters

        // copy files
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        src: [
                            'bower_libs/jquery/dist/jquery.js',
                            'bower_libs/angular/angular.js'
                        ],
                        dest: 'src/lib/',
                        flatten: true
                    }
                ]
            }
        }, // copy files

        // jshint config parameters
        jshint: {
            // for development environment, report to stdio only
            dev: {
                options: {
                    jshintrc: '.jshintrc',
                    ignores: [
                        '<%= config.paths.src %>/lib/**/*.js',
                        '<%= config.paths.test %>/lib/**/*.js'
                    ]
                },
                src: [
                    '<%= config.paths.src %>/**/*.js',
                    '<%= config.paths.test %>/**/*.js'
                ]
            },

            // for CI environment, creates checkstyle report
            ci: {
                options: {
                    jshintrc: '.jshintrc',
                    ignores: [
                        '<%= config.paths.src %>/lib/**/*.js',
                        '<%= config.paths.test %>/lib/**/*.js'
                    ],
                    reporter: 'checkstyle',
                    reporterOutput: '<%= config.paths.reports %>/checkstyle.xml',
                    force: true
                },
                src: [
                    '<%= config.paths.src %>/**/*.js',
                    '<%= config.paths.test %>/**/*.js'
                ]
            }
        }, // jshint config parameters

        // karma config parameters
        karma: {
            // for development environment, report to stdio only
            dev: {
                configFile: 'karma.conf.js',
                browsers: ['Chrome'],
                singleRun: false,
                background: true
            },

            // for CI environment, creates junit coverage report
            ci: {
                configFile: 'karma.conf.js',
                colors: false,
                browsers: ['Firefox', 'Chrome'],
                reporters: ['junit', 'progress', 'coverage'],
                junitReporter: {
                    outputFile: '<%= config.paths.reports %>/test-results.xml'
                },
                preprocessors: {
                    'src/js/**/*.js': 'coverage',
                },
                coverageReporter: {
                    type: 'cobertura',
                    dir: '<%= config.paths.reports %>/coverage/'
                }
            }
        } // karma config parameters
    });

    // grunt target definitions

    // prepare and run development environment
    grunt.registerTask('devenv', function() {
        grunt.task.run([
            'vwsemu',
            'copy:dev',
            'connect:dev',
            'karma:dev', // start the server
            'open:dev',
            'watch:dev'
        ]);
    });

    // run CI test suite
    grunt.registerTask('ci', function() {
        grunt.task.run([
            'jshint:ci',
            'karma:ci'
        ]);
    });

};
