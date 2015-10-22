module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['*.html'],
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
};