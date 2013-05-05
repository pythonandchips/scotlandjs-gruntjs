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
        tasks: ['livereload'],
      }
    }
  });

  grunt.registerTask('watch', ['regarde:dev']);
  grunt.registerTask('default', ['jshint', 'jasmine']);
  grunt.registerTask('reload', ['livereload-start', 'connect', 'regarde:livereload']);
  // These plugins provide necessary tasks.
  // Default task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-regarde');
};
