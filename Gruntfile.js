module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    previewFolder : 'preview/',
    distFolder : 'docs/',
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
      options: {
        replacements: [{
          pattern: /@@localize\((.*?)\)/ig,
          replacement: function (match, key) {
            var translations = grunt.file.readYAML('translations_' + grunt.option('language') +'.yml');
            return eval('translations.' + key) || key;
          }
        }]
      },
      preview_es: {
        files: {
          '<%= previewFolder %>/<%= source %>': '<%= previewFolder %>/<%= source %>'
        }
      },
      preview_en: {
        files: {
          '<%= previewFolder %>/en/<%= source %>': '<%= previewFolder %>/<%= source %>'
        }
      },
      preview_de: {
        files: {
          '<%= previewFolder %>/de/<%= source %>': '<%= previewFolder %>/<%= source %>'
        }
      },
      dist_es: {
        files: {
          '<%= distFolder %>/<%= source %>': '<%= distFolder %>/<%= source %>'
        }
      },
      dist_en: {
        files: {
          '<%= distFolder %>/en/<%= source %>': '<%= distFolder %>/<%= source %>'
        }
      },
      dist_de: {
        files: {
          '<%= distFolder %>/de/<%= source %>': '<%= distFolder %>/<%= source %>'
        }
      }
    },

    htmlmin: {
      options: {
        removeComments: true,
        ignoreCustomComments: [ /still alive/ ],
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeEmptyAttributes: true,
        removeAttributeQuotes: false,
        removeEmptyElements: false,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        collapseInlineTagWhitespace: true,
      },
      preview: {
        files: {
          '<%= previewFolder %>/<%= source %>': '<%= previewFolder %>/<%= source %>'
        }
      },
      dist: {
        files: {
          '<%= distFolder %>/<%= source %>': '<%= distFolder %>/<%= source %>'
        }
      }
    },
    clean : {
      preview: ['<%= previewFolder %>'],
      dist: ['<%= distFolder %>']
    },
    mkdir : {
      preview: {
        options: {
          create: ['<%= previewFolder %>'],
        }        
      },
      dist: {
        options: {
          create: ['<%= distFolder %>'],
        }        
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');


  grunt.registerTask('translate', function(environment, language) {
    grunt.option('language', language);
    grunt.task.run('string-replace:' + environment + '_' + language)
  });

  grunt.registerTask('preview', ['clean:preview', 'mkdir:preview', 'includereplace:preview', 'copy:preview', 'htmlmin:preview', 'translate:preview:de', 'translate:preview:en', 'translate:preview:es']);
  grunt.registerTask('dist', ['clean:dist', 'mkdir:dist', 'includereplace:dist', 'copy:dist', 'htmlmin:dist', 'translate:dist:de', 'translate:dist:en', 'translate:dist:es']);
  grunt.registerTask('default', ['watch']);
};