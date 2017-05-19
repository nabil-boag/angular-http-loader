/* global module */

// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: 'app/build',
    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher'
    ],
    port: 9876,
    captureTimeout: 60000,

    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'js/httpMethodInterceptor.js',
      'js/httpLoader.js',
      'js/**/*.spec.js'
    ],
    preprocessors: {
      './**/*.js': 'coverage'
    },

    /**
     * How to report, by default.
     */
    reporters: ['coverage', 'dots', 'spec'],

    coverageReporter:  {
      type: 'html',
      dir: '../../coverage/'
    },

    logLevel: config.LOG_DEBUG,

    singleRun: true,
    browsers: [
      'Chrome',
      'Firefox'
    ]
  });
};
