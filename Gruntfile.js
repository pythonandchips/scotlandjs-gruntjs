/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: 'angular-todomvc',
    jshint: {
      files: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js']
    }
  });

  // These plugins provide necessary tasks.
  // Default task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
