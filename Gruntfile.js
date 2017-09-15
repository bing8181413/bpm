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
            // debug: {
            //     files: [
            //         {
            //             expand: true,
            //             cwd: 'app',
            //             src: ['**/*.{css,js,png,jpg,gif,jpeg,html,svg,eot,ttf,woff,woff2,json,htm,php}'],
            //             dest: '.tmp'
            //         }
            //     ]
            // },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['**/*.{css,png,jpg,gif,jpeg,svg,eot,ttf,woff,woff2,json,php,html,htm}',
                            '**/main.min.js',
                            '**/main.js',
                            '**/app.js',
                            '**/require.js',
                            '**/jquery-extend.js',
                            '**/bootstrap.js',
                            'vendor/**/*.js', //  三方包 一般不用copy
                            '**/bootstrap.js',
                            'wap/**/*',// wap 一般不复制过去
                        ],
                        dest: '../build/bpm'
                    }
                ]
            },
            hbbdist: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: [
                            'get_common.php',
                            'styles/app.css',
                            'styles/bootstrap/index.css',
                            'index.html',
                            '**/app.js',
                            '**/app-tpl.js',
                            '**/main.min.js',
                            '**/main.js',
                            '!vendor/**/*.js', //  三方包 一般不用copy
                            '**/bootstrap.js',
                            // 'zhibo/**/*',
                        ],
                        dest: '../build/bpm'
                    }
                ]
            },
            zhibodist: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: [
                            'zhibo/**/*',
                        ],
                        dest: '../build/bpm'
                    }
                ]
            },
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
                    // 'app/scripts/views/**/*.html',
                    'app/scripts/views/container/**/*.html',
                    'app/scripts/views/main/**/*.html',
                    'app/scripts/views/biz/**/*.html',
                    'app/scripts/views/demo/**/*.html',
                    'app/scripts/views/live/**/*.html',
                    'app/scripts/views/directive/**/*.html',
                ],
                dest: 'app/scripts/app-tpl.js'
            }
        },

        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            js: {
                src: 'app/scripts/main.min.js',
                dest: '../build/bpm/scripts'
            }
        },
        filerev_replace: {
            options: {
                assets_root: '../build/bpm/index.html',
                views_root: '../build/bpm/index.html'
            },
            js: {
                src: '../build/bpm/index.html'
            }
        },

        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /timestamp/g,
                            // match: 'timestamp',
                            // replacement: new Date().getTime()
                            replacement: function () {
                                var now_time = new Date();
                                var bar = (now_time.getFullYear() + '-' + (now_time.getMonth() + 1) + '-' + now_time.getDate() + ' ' + now_time.getHours() + ':' + now_time.getMinutes() + ':00')
                                    .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
                                console.log('当前版本时间戳: ' + bar);
                                return bar; // replaces "foo" to "bar"
                            }
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['app/index.html'], dest: '../build/bpm/'}
                ]
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
                    optimize: 'none',  // 这里是一个坑  默认没有使用这个选项时值为uglify  不加这个选项会重置为最优方式 就会找不到很多依赖注入的文件 （但是呢 文件会很小 小有个毛用）
                    baseUrl: "app/scripts",
                    mainConfigFile: "app/scripts/main.js",
                    name: "bootstrap", // assumes a production build using almond
                    out: "../build/bpm/scripts/main.min.js"
                }
            },
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
        'replace:dist',
        //'compass:dev',
        'requirejs:debug',
        'open:dev',
        'watch'
    ]);
    grunt.registerTask('build', [
        'html2js:compileTpl',
        //'compass:dev',
        'copy:hbbdist',
        'replace:dist',
        'requirejs:dist',
        // 'connect:dist:keepalive'
    ]);
    grunt.registerTask('initbuild', [
        'html2js:compileTpl',
        'copy:dist',
        'replace:dist',
        // 'filerev',
        // 'filerev_replace',
        // 'copy:dist',
        'requirejs:dist',
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