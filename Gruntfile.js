module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    previewFolder : 'preview/',
    distFolder : 'dist/',
    imagesFolder : 'images/',
    source: 'index.html',

    watch: {
      preview: {
        files: ['<%= imagesFolder %>/*', '*.html', '*.css'],
        tasks: ['preview'],
      },
      livereload: {
        options: { livereload: true },
        files: ['<%= previewFolder %>/**/*'],
      }
    },

    includereplace: {
      preview: {
        options: {
          globals: {
            head: '<script src="http://localhost:35729/livereload.js"></script>'
          }
        },
        files: [
            {src: '<%= source %>', dest: '<%= previewFolder %>'},
        ]
      },

      dist: {
        options: {
          globals: {
            head: ''
          }        
        },
        files: [
            {src: '<%= source %>', dest: '<%= distFolder %>'},
        ]
      }
    },
    copy: {
      preview: {
        expand: true,
        src: '<%= imagesFolder %>/*',
        dest: '<%= previewFolder %>',
      },
      dist: {
        expand: true,
        src: '<%= imagesFolder %>/*',
        dest: '<%= distFolder %>',
      },
    },

    'string-replace': {
      preview: {
        files: {
          '<%= previewFolder %>/<%= source %>': '<%= previewFolder %>/<%= source %>'
        },
        options: {
          replacements: [{
            pattern: /@@localize\((.*?)\)/ig,
            replacement: function (match, key) {
              return translations[key];
            }
          }]
        }
      }
    }

  });
  var translations = grunt.file.readYAML('translations.yml');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.registerTask('preview', ['includereplace:preview', 'copy:preview', 'string-replace:preview']);
  grunt.registerTask('dist', ['includereplace:dist', 'copy:dist', 'string-replace:dist']);
  grunt.registerTask('default', ['watch']);
};