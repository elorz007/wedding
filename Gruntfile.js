module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      css: {
        files: '**/*.md',
        tasks: ['includereplace'],
        options: {
          livereload: true,
        },
      },
    },

    // Use 'grunt includereplace' for generating preview (which is gitignored)
    // Use 'grunt includereplace:dist' for generating the real distributing html
    includereplace: {
      preview: {
        options: {
          // Task-specific options go here.
        },
        // Files to perform replacements and includes with
        src: 'slides.html',
        // Destination directory to copy files to
        dest: 'preview/'
      },

      dist: {
        options: {
          // Task-specific options go here.
        },
        // Files to perform replacements and includes with
        src: 'slides.html',
        // Destination directory to copy files to
        dest: 'dist/'
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');

};