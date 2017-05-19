/* global module */

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', [
    'build',
    'test:dev',
    'package'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'jscs',
    'clean:build',
    'copy:build'
  ]);
  grunt.registerTask('test', [
    'karma:browser_unit'
  ]);
  grunt.registerTask('test:dev', [
    'karma:headless_unit'
  ]);
  grunt.registerTask('test:debug', [
    'karma:browser_unit_debug'
  ]);
  grunt.registerTask('package', [
    'clean:package',
    'concat:package',
    'uglify:package'
  ]);
  grunt.registerTask('workflow:dev', [
    'connect:dev',
    'build',
    'test:dev',
    'open:dev',
    'watch:dev'
  ]);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: grunt.option('env') || 'dev',

    app: {
      name: 'angular-http-loader',
      source_dir: 'app/src',
      build_dir: 'app/build',
      package_dir: 'app/package'
    },

    clean: {
      build: '<%= app.build_dir %>',
      package: '<%= app.package_dir %>'
    },

    jshint: {
      source: [
        '*.js',
        '<%= app.source_dir %>/js/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jscs: {
      source: [
        '*.js',
        '<%= app.source_dir %>/js/**/*.js'
      ],
      options: {
        config: '.jscsrc'
      }
    },

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: '<%= app.source_dir %>',
            src: ['**'],
            dest: '<%= app.build_dir %>'
          },
          {
            expand: true,
            cwd: 'node_modules',
            src: [
              'angular/angular.js',
              'angular-mocks/angular-mocks.js'
            ],
            dest: '<%= app.build_dir %>/node_modules'
          },
          {
            expand: true,
            src: ['package.json'],
            dest: '<%= app.build_dir %>'
          }
        ]
      }
    },

    karma: {
      headless_unit: {
        options: {
          configFile: 'karma-unit.conf.js',
          browsers: ['PhantomJS']
        }
      },
      browser_unit: {
        options: {
          configFile: 'karma-unit.conf.js'
        }
      },
      browser_unit_debug: {
        options: {
          configFile: 'karma-unit.conf.js',
          singleRun: false,
          browsers: ['Chrome']
        }
      }
    },

    concat: {
      package: {
        src: [
          '<%= app.build_dir %>/js/**/*.js',
          '!<%= app.build_dir %>/js/**/*.spec.js'
        ],
        dest: '<%= app.package_dir %>/js/<%= app.name %>.js'
      }
    },

    uglify: {
      package: {
        files: {
          '<%= app.package_dir %>/js/<%= app.name %>.min.js': [
            '<%= app.package_dir %>/js/<%= app.name %>.js'
          ]
        }
      }
    },

    bump: {
      options: {
        files: ['package.json'],
        commitFiles: ['package.json'],
        pushTo: 'origin'
      }
    },

    connect: {
      options: {
        hostname: '*'
      },
      dev: {
        options: {
          port: 9000,
          base: '<%= app.build_dir %>'
        }
      },
      package: {
        options: {
          port: 9001,
          base: '<%= app.package_dir %>'
        }
      }
    },

    open: {
      dev: {
        url: 'http://127.0.0.1:<%= connect.dev.options.port %>/demo.html'
      }
    },

    watch: {
      dev: {
        files: ['<%= app.source_dir %>/**/*'],
        tasks: ['build', 'test:dev'],
        options: {
          livereload: true
        }
      }
    }
  });
};
