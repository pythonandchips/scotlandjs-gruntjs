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
            dest: '/bower_components/angular',
          },
          {
            src: bowerPath + '/todomvc-common/*',
            dest: '/bower_components/todomvc-common',
          },
          {
            src: 'js/controllers/*.js',
            dest: '/js/controllers',
          },
          {
            src: 'js/directives/*.js',
            dest: '/js/directives',
          },
          {
            src: 'js/services/*.js',
            dest: '/js/services',
          },
          {
            src: 'js/app.js',
            dest: '/js/app.js',
          },
          {
            src: 'index.html',
            dest: '/index.html',
          }
        ]
      }
    }
  });

  grunt.registerTask('watch', ['regarde:dev']);
  grunt.registerTask('default', ['jshint', 'jasmine']);
  grunt.registerTask('reload', ['livereload-start', 'connect', 'regarde:livereload']);
  grunt.registerTask('staging', ['jshint', 'jasmine', 's3:staging']);
  // These plugins provide necessary tasks.
  // Default task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-regarde');
};
