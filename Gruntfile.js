/*global module:false*/
module.exports = function(grunt) {

  var bowerPath = 'bower_components';
  var sourcePath = 'js/**/*.js';

  var path = require('path');
  var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

  var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
  };

  // Project configuration.
  grunt.initConfig({
    pkg: 'angular-todomvc',
    jshint: {
      files: ['Gruntfile.js', sourcePath, 'test/**/*.js']
    },
    jasmine : {
      src : [bowerPath + '/angular/*.js', bowerPath + '/angular-mocks/*.js', bowerPath + '/todomvc-common/*.js', sourcePath],
      options: {
        specs : 'test/unit/**/*.js'
      }
    },
    htmlbuild: {
      dist: {
        src: 'index.html',
        dest: 'dist',
        options: {
          scripts: {
            main: 'dist/all.min.js'
          },
          styles: {
            main: 'dist/all.min.css'
          }
        }
      }
    },
    concat: {
      dist_js: {
        src : [bowerPath + '/angular/*.js', bowerPath + '/angular-mocks/*.js', bowerPath + '/todomvc-common/*.js', sourcePath],
        dest: 'dist/all.min.js'
      },
      dist_css: {
        src : [bowerPath + '/todomvc-common/*.css'],
        dest: 'dist/all.min.css'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/all.min.js': ['dist/all.min.js']
        }
      }
    },
    connect: {
      livereload: {
        options: {
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, '.')];
          }
        }
      }
    },
    regarde: {
      dev: {
        files: [bowerPath + '/angular/*.js', bowerPath + '/angular-mocks/*.js', bowerPath + '/todomvc-common/*.js', sourcePath, 'test/**/*.js'],
        tasks: ['default'],
        spawn: true
      },
      livereload: {
        files: ['index.html', bowerPath + '/todomvc-common/base.css', bowerPath + '/angular/*.js', bowerPath + '/angular-mocks/*.js', bowerPath + '/todomvc-common/*.js', sourcePath, 'test/**/*.js'],
        tasks: ['livereload']
      }
    },
    s3: {
      options: {
        key: process.env.AWSKEY,
        secret: process.env.AWSSECRET,
        bucket: 'scotlandjs',
        access: 'public-read'
      },
      staging: {
        // These options override the defaults
        upload: [
          {
            src: bowerPath + '/angular/*',
            dest: '/bower_components/angular'
          },
          {
            src: bowerPath + '/todomvc-common/*',
            dest: '/bower_components/todomvc-common'
          },
          {
            src: 'js/controllers/*.js',
            dest: '/js/controllers'
          },
          {
            src: 'js/directives/*.js',
            dest: '/js/directives'
          },
          {
            src: 'js/services/*.js',
            dest: '/js/services'
          },
          {
            src: 'js/app.js',
            dest: '/js/app.js'
          },
          {
            src: 'index.html',
            dest: '/index.html'
          }
        ]
      },
      prod: {
        upload: [
          {
            src: 'dist/*',
            dest: '/prod/'
          }
        ]
      }
    },
    clean: {
      release: ['dist/*']
    }
  });

  grunt.registerTask('watch', ['regarde:dev']);
  grunt.registerTask('default', ['jshint', 'jasmine']);
  grunt.registerTask('reload', ['livereload-start', 'connect', 'regarde:livereload']);
  grunt.registerTask('staging', ['jshint', 'jasmine', 's3:staging']);
  grunt.registerTask('production', ['clean', 'concat', 'uglify', 'htmlbuild', 's3:prod']);

  var pkg = grunt.file.readJSON('package.json');
  for(var dep in pkg.devDependencies) {
    if(dep.indexOf('grunt-') === 0) {
      grunt.loadNpmTasks(dep);
    }
  }
};
