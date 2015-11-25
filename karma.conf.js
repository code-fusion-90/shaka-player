// Karma configuration

// Required modules:
//   karma
//   karma-jasmine
//   karma-jasmine-ajax
//   jasmine
//   jasmine-ajax
//   jasmine-core
// Optional modules:
//   karma-coverage

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-ajax', 'jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // closure base
      'third_party/closure/goog/base.js',

      // include the utils files first
      'spec/util.js',

      // included files - tests
      'spec/*.js',

      // source files - these are only watched and served
      {pattern: 'lib/*/*.js', included: false},
      {pattern: 'third_party/closure/goog/*/*.js', included: false},

      // closure's generated deps file
      {pattern: 'third_party/closure/goog/deps.js', included: false}
    ],

    // handle requests for /assets
    proxies: {
      '/assets/': '/base/assets/'
    },

    preprocessors: {
      // Don't compute coverage over lib/debug/
      'lib/!(debug)/*.js': 'coverage',
    },

    coverageReporter: {
      'type': 'text',
    },

    // do not panic about "no activity" unless a test takes longer than 60s.
    browserNoActivityTimeout: 60000,

    // don't capture the client's console logs
    client: { captureConsole: true },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    //                  config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // do not execute tests whenever any file changes
    autoWatch: false,

    customLaunchers: {
      // Firefox doesn't enable MediaSource Extensions or MP4 by default yet:
      FirefoxWithMSE: {
        base: 'Firefox',
        prefs: {
          'media.fragmented-mp4.exposed': true,
          'media.fragmented-mp4.ffmpeg.enabled': true,
          'media.mediasource.enabled': true,
          'media.mediasource.format-reader': true,
          'media.mediasource.webm.enabled': true,
          'media.mediasource.whitelist': false,
          'media.mediasource.youtubeonly': false,
        }
      }
    }
  });
};
