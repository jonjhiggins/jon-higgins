module.exports = function(grunt) {

  var paths = {
    src: './src',
    dist: './dist',
    tests: './tests'
  };

  // Project configuration.
  grunt.initConfig({

    paths: paths,

    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        files: {
          '<%= paths.dist %>/assets/js/app.js': ['<%= paths.src %>/js/controllers/*.js' ],
        }
      },
      test: {
        files: {
          '<%= paths.tests %>/tests.js': ['<%= paths.tests %>/src/*.js' ],
        }
      },
      options: {
        watch: true,
        require: ['<%= paths.src %>/js/shims/marionette_shim']
      }
    },

    watch: {
      scripts: {
        files: ['<%= paths.src %>/js/**/*.js', '<%= paths.tests %>/src/*.js'],
        tasks: ['browserify', 'mocha'],
        options: {
          spawn: false,
        },
      },
      html: {
        files: ['<%= paths.src %>/*.html'],
        tasks: ['copy:html'],
      },
      bower: {
        files: ['/bower_components/*'],
        tasks: ['wiredep']
      }
    },

    browserSync: {
        bsFiles: {
            src : ['<%= paths.dist %>/assets/js/app.js', '<%= paths.dist %>/*.html']
        },
        options: {
            watchTask: true,
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
          '<%= paths.src %>/*.html',   // .html support...
          '<%= paths.tests %>/*.html'
        ],
      }
    },

    copy: {
      html: {
        files: [
          {expand: true, cwd: '<%= paths.src %>', src: ['*.html'], dest: '<%= paths.dist %>'},
        ],
      },
    },

    mocha: {
      test: {
        src: ['<%= paths.tests %>/**/*.html'],
        options: {
          run: true
        }
      },
    },
  });

  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['wiredep', 'copy', 'browserify', 'mocha', 'browserSync', 'watch']);

};