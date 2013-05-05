/*global module:false*/
module.exports = function(grunt) {

  var bowerPath = 'bower_components';
  var sourcePath = 'js/**/*.js';

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
    regarde: {
      dev: {
        files: [bowerPath + '/angular/*.js', bowerPath + '/angular-mocks/*.js', bowerPath + '/todomvc-common/*.js', sourcePath, 'test/**/*.js'],
        tasks: ['default'],
        spawn: true
      }
    }
  });

  grunt.registerTask('watch', ['regarde::dev']);
  grunt.registerTask('default', ['jshint', 'jasmine']);
  // These plugins provide necessary tasks.
  // Default task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-regarde');
};
