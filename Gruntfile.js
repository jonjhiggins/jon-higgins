module.exports = function(grunt) {

    var paths = {
        src: './src',
        dist: './dist',
        tests: './tests'
    };

    var vendors = 'jquery backbone backbone.marionette'.split(' ');

    var historyApiFallback = require('connect-history-api-fallback');

    // Project configuration.
    grunt.initConfig({

        paths: paths,
        vendors: vendors,

        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            // just the app
            // app: {
            //     src: ['<%= paths.src %>/js/main.js'],
            //     dest: '<%= paths.dist %>/assets/js/app.js',
            //     options: {
            //         debug: true,
            //         external: vendors
            //     }
            // },
            // // just vendors
            // vendors: {
            //     files: {
            //         '<%= paths.dist %>/assets/js/vendors.js': []
            //     },
            //     options: {
            //         'require': vendors
            //     }
            // },
            // bundle all in one
            bundle: {
                src: '<%= paths.src %>/js/main.js',
                dest: '<%= paths.dist %>/assets/js/bundle.js'
            },
            // test: {
            //     files: {
            //         '<%= paths.tests %>/tests.js': ['<%= paths.tests %>/src/*.js']
            //     }
            // },
        },

        watch: {
            scripts: {
                files: ['Gruntfile.js', '<%= paths.src %>/js/*.js', '<%= paths.src %>/js/**/*.hbs', '<%= paths.src %>/js/**/*.js', '<%= paths.tests %>/src/*.js'],
                tasks: ['jshint', 'browserify', /*'mochify', 'uglify'*/],
                options: {
                    spawn: false,
                },
            },
            html: {
                files: ['<%= paths.src %>/*.html'],
                tasks: ['copy:html', 'browserify'],
            },
            bower: {
                files: ['/bower_components/*'],
                tasks: ['wiredep', 'browserify']
            },
            images: {
                files: ['<%= paths.src %>/images/*'],
                tasks: ['copy:images']
            },
            data: {
                files: ['<%= paths.src %>/data/**/*'],
                tasks: ['m2j', 'browserify']
            },
            sass: {
                files: ['<%= paths.src %>/scss/*'],
                tasks: ['sass', 'postcss']
            },
            fonts: {
                files: ['<%= paths.src %>/fonts/*'],
                tasks: ['copy:fonts', 'browserify']
            }
        },

        browserSync: {
            bsFiles: {
                src: ['<%= paths.dist %>/assets/js/bundle.js', '<%= paths.dist %>/*.html', '<%= paths.dist %>/assets/css/main.css' , '<%= paths.dist %>/assets/img/*']
            },
            options: {
                watchTask: true,
                middleware: [ historyApiFallback() ],
                server: {
                    baseDir: paths.dist,
                    routes: {
                        "/bower_components": "bower_components"
                    }
                }
            }
        },

        wiredep: {
            task: {
                src: [
                    '<%= paths.src %>/*.html', // .html support...
                    '<%= paths.tests %>/*.html'
                ],
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.src %>',
                    src: ['*.html'],
                    dest: '<%= paths.dist %>'
                }, ],
            },
            images: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.src %>/images',
                    src: ['*'],
                    dest: '<%= paths.dist %>/assets/img'
                }, ],
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.src %>/fonts',
                    src: ['*'],
                    dest: '<%= paths.dist %>/assets/fonts'
                }, ],
            }
        },

        sass: {
            options: {
                sourceMap: true
            },
            main: {
                files: {
                    '<%= paths.dist %>/assets/css/main.css': '<%= paths.src %>/scss/main.scss'
                }
            }
        },

        mochify: {
            options: {
                reporter: 'spec',
                transform: ['hbsfy']
            },
            tests: {
                src: [
                    '<%= paths.tests %>/src/tests.js'
                ],
            }
        },

        mocha: {
            test: {
                src: ['<%= paths.tests %>/**/*.html'],
                options: {
                    run: true
                }
            },
        },

        jshint: {
            files: [
                'Gruntfile.js',
                '<%= paths.tests %>/src/*.js',
                '<%= paths.src %>/js/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Markdown to JSON
        m2j: {
            work: {
                options: {
                    minify: true,
                    width: 60
                },
                files: {
                    '<%= paths.dist %>/assets/data/work.json': ['<%= paths.src %>/data/work/*.md'],
                    '<%= paths.dist %>/assets/data/words.json': ['<%= paths.src %>/data/words/*.md']
                },
            }
        },

        // Compress
        uglify: {
            my_target: {
                files: {
                    '<%= paths.dist %>/assets/js/bundle.min.js': ['<%= paths.dist %>/assets/js/bundle.js']
                }
            }
        },

        postcss: {
            options: {
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'dist/css/maps/' // ...to the specified directory
                },

                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }), // add vendor prefixes
                    //require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: '<%= paths.dist %>/assets/css/main.css'
            }
        },

    });

    require('load-grunt-tasks')(grunt);

    // Default task(s).
    grunt.registerTask('default', ['m2j', 'wiredep', 'copy', 'browserify', /*'mochify',*/ 'uglify', 'sass', 'postcss', 'browserSync', 'watch']);

};
