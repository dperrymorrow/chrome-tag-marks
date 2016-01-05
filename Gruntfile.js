module.exports = function (grunt) {
  "use strict";
  // Project configuration.

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: {
        src: [
          'Gruntfile.js',
          'source/js/**/*.js'
        ]
      },
      options: {
        globals: {
          'CMARKS': true, 'Backbone': true, 'chrome': true, 's': true,
          'window': true, '_': true, '$': true, 'WH': true, 'Mustache': true,
          'ZeroClipboard': true, 'Handlebars': true, 'moment': true, 'Zepto': true, 
          'module': true, 'console': true, 'document': true,
          'utils': true
        },
        scripturl: true,
        strict: false,
        indent: 2,
        nomen: true,
        undef: true,
        regexp: true,
        esnext: false,
        debug: true,
        moz: true,
        boss: true,
        node: false,
        validthis: true,
        unused: false
      }
    },

    uglify: {
      my_target: {
        options: {
          mangle: false,
          sourceMap: true
        },
        files: {
          'dist/js/vendor.min.js': [
            'node_modules/zepto/zepto.min.js',
            'node_modules/underscore/underscore-min.js',
            'node_modules/backbone/backbone-min.js',
            'node_modules/mustache/mustache.js',
            'node_modules/handlebars/dist/handlebars.min.js',
            'node_modules/underscore.string/dist/underscore.string.min.js',
            'node_modules/moment/moment.js'
          ]
        }
      }
    },

    concat: {
      options: {
        'separator': "\n\n",
      },
      app: {
        src: [
          'source/js/router.js', 
          'source/js/models/*.js', 
          'source/js/views/*.js', 
          'source/js/app.js'
        ],
        dest: 'dist/js/app.js',
      },
    },


    jade: {
      debug: {
        options: {
          pretty: true,
          data: {
            debug: true
          }
        },
        files: {
          "index.html": "source/jade/index.jade"
        }
      }
    },

    less: {
      options: {
        title: "Grunt building less files",
        message: "Less task complete"
      },

      development: {
        options: {
          sourceMap: false,
          compress: false
        },

        files: {
          "dist/css/app.css": "source/less/app.less"
        }

      }
    },

    watch: {
      javascript: {
        files: ['source/js/**/*.js', 'source/less/*.less', 'source/jade/*.jade'], // which files to watch
        tasks: ['jshint', 'concat', 'less', 'jade'],
        options: {
          nospawn: true
        }
      },

      less: {
        files: ['assets/less/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          src: ['node_modules/font-awesome/fonts/*'],
          dest: 'dist/fonts',
          filter: 'isFile',
          flatten: true
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');


  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'copy', 'jade', 'less']);
  // Load the task
  grunt.loadNpmTasks('grunt-notify');
  // This is required if you use any options.
  grunt.task.run('notify_hooks');
};
