/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: 'angular-todomvc',
    jshint: {
      files: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js']
    },
    jasmine : {
      src : ['bower_components/angular/*.js', 'bower_components/angular-mocks/*.js', 'bower_components/todomvc-common/*.js', 'js/**/*.js'],
      options: {
        specs : 'test/unit/**/*.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  // Default task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
};
