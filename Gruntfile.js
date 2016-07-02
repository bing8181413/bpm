/**
 * 自动化脚本定义
 */
module.exports = function (grunt) {
    'use strict';

    var cfg = {
        livereload: 35730,
        serverPort: 3002,
        serverHost: '0.0.0.0'
    };

    //load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        cfg: cfg,
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            options: {
                port: cfg.serverPort,
                hostname: cfg.serverHost,
                base: '.'
            },
            dev: {
                options: {
                    middleware: function (connect) {
                        return [
                            require('connect-livereload')({port: cfg.livereload}),
                            require('./grunt_server')('.tmp')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        //globalSetting.activeFolder = globalSetting.buildFolder;
                        return [
                            //require('connect-livereload')({port: cfg.livereload}),
                            require('./grunt_server')('build')
                        ];
                    }
                }
            }
        },
        copy: {
            debug: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['**/*.{css,js,png,jpg,gif,jpeg,html,svg,eot,ttf,woff,woff2,json,htm,php}'],
                        dest: '.tmp'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['**/*.{css,png,jpg,gif,jpeg,svg,eot,ttf,woff,woff2,json,php,html,htm}',
                            '**/main.min.js',
                            '**/main.js',
                            '**/app.js',
                            //'vendor/**/*.js', //  三方包 一般不用copy
                            '**/bootstrap.js'
                        ],
                        dest: '../build/huijiame_admin2'
                    }
                ]
            },
            hbbdist: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['styles/app.css',
                            'index.html',
                            '**/app.js',
                            '**/app-tpl.js',
                            '**/main.min.js',
                            '**/main.js',
                            '!vendor/**/*.js', //  三方包 一般不用copy
                            '**/bootstrap.js'
                        ],
                        dest: '../build/huijiame_admin2'
                    }
                ]
            }
        },
        html2js: {
            options: {
                htmlmin: {
                    collapseWhitespace: true
                },
                useStrict: true,
                module: 'app-tpl',
                rename: function (moduleName) {
                    //console.log(moduleName, 'moduleName');
                    var newName = moduleName.replace('../', '');
                    return newName;
                }
            },
            compileTpl: {
                src: [
                    //'app/scripts/partials/**/*.html',
                    'app/scripts/views/**/*.html'
                ],
                dest: 'app/scripts/app-tpl.js'
            }
        },

        watch: {
            options: {
                livereload: true
            },
            message: {
                files: ['app/scripts/drds/nls/src/*.js'],
                tasks: ['message']
            },
            scripts: {
                files: ['app/scripts/**/*.{js,css,html,png,jpg,jpeg,webp,gif,map}',
                    'app/style/**/*.{css,png,jpg,jpeg,webp,gif,map,woff,ttf,svg}'],
                tasks: ['html2js:compileTpl', 'copy:debug']
            },
            //compass: {
            //  files: ['app/**/*.{scss,sass}'],
            //  tasks: ['compass:dev']
            //},
            // jade: {
            //   files: ['app/**/*.jade'],
            //   tasks: ['jade:debug']
            // },
            html: {
                files: ['app/**/*.html'],
                tasks: ['copy:debug']
            },
            // coffee: {
            //   files: ['app/scripts/{,*/}*.coffee'],
            //   tasks: ['coffee:debug']
            // },
            html2js: {
                files: ['app/scripts/*/views/**/*.html',
                    'app/scripts/*/partials/**/*.html'],
                tasks: ['html2js:compileTpl']
            }
        },
        //compass: {                  // Task
        //  dist: {                   // Target
        //    options: {              // Target options
        //      sassDir: 'app/styles/',        //      cssDir: 'build/',
        //      environment: 'production'
        //    }
        //  },
        //  dev: {                    // Another target
        //    options: {
        //      sassDir: 'app/',
        //      cssDir: '.tmp/'
        //    }
        //  }
        //},
        requirejs: {
            options: {
                //optimize: 'none'
            },
            debug: {
                options: {
                    optimize: 'none',
                    baseUrl: "app/scripts",
                    mainConfigFile: "app/scripts/main.js",
                    name: "bootstrap", // assumes a production build using almond
                    out: ".tmp/scripts/main.min.js"
                }
            },
            dist: {
                options: {
                    optimize: 'none',  // 这里是一个坑  默认没有使用这个选项 不加这个选项会重置为最优方式 就会找不到很多依赖注入的文件 （但是呢 文件会很小 小有个毛用）
                    baseUrl: "app/scripts",
                    mainConfigFile: "app/scripts/main.js",
                    name: "bootstrap", // assumes a production build using almond
                    out: "../build/huijiame_admin2/scripts/main.min.js"
                }
            },
            //newdist: {
            //    options: {
            //        optimize: 'none',  // 这里是一个坑  默认没有使用这个选项 不加这个选项会重置为最优方式 就会找不到很多依赖注入的文件 （但是呢 文件会很小 小有个毛用）
            //        baseUrl: "app/scripts",
            //        mainConfigFile: "app/scripts/main.js",
            //        name: "bootstrap", // assumes a production build using almond
            //        //out: "../build/huijiame_admin/scripts/main.min.js",
            //        web: {
            //            include: [
            //                "jQuery",
            //                "angular",
            //                "ui.router",
            //                "angular-file-upload",
            //                "bindonce",
            //                "ab-base64",
            //                "ui.bootstrap",
            //                "twitter",
            //                "ngSanitize",
            //                "ngCsv",
            //                "app-tpl"
            //            ],
            //            out: "../build/huijiame_admin/scripts/libs.js"
            //        },
            //        app: {
            //            exclude: [
            //                "jQuery",
            //                "angular",
            //                "ui.router",
            //                "angular-file-upload",
            //                "bindonce",
            //                "ab-base64",
            //                "ui.bootstrap",
            //                "twitter",
            //                "ngSanitize",
            //                "ngCsv",
            //                "app-tpl"
            //            ],
            //            out: "../build/huijiame_admin/scripts/apps.js"
            //        }
            //    }
            //}
        },
        open: {
            dev: {
                url: 'http://localhost:' + cfg.serverPort
            }
        }
    });
    grunt.registerTask('default', [
        'connect:dev',
        'html2js:compileTpl',
        'copy:debug',
        //'compass:dev',
        'requirejs:debug',
        'open:dev',
        'watch'
    ]);
    grunt.registerTask('build', [
        'html2js:compileTpl',
        //'compass:dev',
        'copy:dist',
        'requirejs:dist',
        'connect:dist:keepalive'
    ]);
    grunt.registerTask('hbbbuild', [
        'html2js:compileTpl',
        //'compass:dev',
        'copy:hbbdist',
        'requirejs:dist',
        'connect:dist:keepalive'
    ]);
    grunt.registerTask('localhtml2js', [
        'html2js:compileTpl'
    ]);
    //grunt.registerTask('newbuild', [
    //    //'html2js:compileTpl',
    //    //'compass:dev',
    //    //'copy:hbbdist',
    //    'requirejs:newdist',
    //    'connect:dist:keepalive'
    //]);

};