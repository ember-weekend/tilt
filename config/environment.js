/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'tilt',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    moment: {
      outputFormat: 'MMMM DD,YYYY'
    },
    'ember-composable-helpers': {
      only: ['inc']
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.manifest = {
    enabled: true,
    appcacheFile: '/cache.manifest',
    excludePaths: ['ember-cli-live-reload.js', 'index.html', 'tests/index.html', 'robots.txt', 'crossdomain.xml', 'testem.js'],
    showCreateDate: true,
    network: ['*'],
    fallback: ['']
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    //
    ENV.serviceWorker = {
      enabled: true,
      serviceWorkerFile: "service-worker.js",
      debug: true
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
