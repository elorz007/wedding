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
        files: ['<%= imagesFolder %>/*', '*.html', '*.css', '*.yml'],
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
              return eval('translations.' + key) || key;
            }
          }]
        }
      },
      dist: {
        files: {
          '<%= distFolder %>/<%= source %>': '<%= distFolder %>/<%= source %>'
        },
        options: {
          replacements: [{
            pattern: /@@localize\((.*?)\)/ig,
            replacement: function (match, key) {
              return eval('translations.' + key) || key;
            }
          }]
        }
      }
    },
    htmlmin: {
      preview: {
        options: {
          removeComments: true,
          ignoreCustomComments: [ /still alive/ ],
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeEmptyAttributes: true,
          removeAttributeQuotes: true,
          removeEmptyElements: false,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          collapseInlineTagWhitespace: true,
        },
        files: {
          '<%= previewFolder %>/<%= source %>': '<%= previewFolder %>/<%= source %>'
        }
      },
      dist: {
        options: {
          removeComments: true,
          ignoreCustomComments: [ /still alive/ ],
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeEmptyAttributes: true,
          removeAttributeQuotes: true,
          removeEmptyElements: false,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          collapseInlineTagWhitespace: true,
        },
        files: {
          '<%= distFolder %>/<%= source %>': '<%= distFolder %>/<%= source %>'
        }
      }
    }

  });
  var translations = grunt.file.readYAML('translations.yml');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('preview', ['includereplace:preview', 'copy:preview', 'string-replace:preview', 'htmlmin:preview']);
  grunt.registerTask('dist', ['includereplace:dist', 'copy:dist', 'string-replace:dist', 'htmlmin:dist']);
  grunt.registerTask('default', ['watch']);
};