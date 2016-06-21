// Let babel know we are running in a "test" env.
process.env.BABEL_ENV = 'test'
// Disable babel caching.
process.env.BABEL_DISABLE_CACHE = 1

module.exports = function (wallaby) {
  return {
    // Specify ALL the source files required to run the tests against.
    files: [
      'src/**/*.js'
    ],

    // Specify the actual test files.
    tests: [
      'src/**/*.test.js'
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        presets: ['react']
      })
    },

    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: 'NODE_ENV=test' // semi-colon seperated environment args.
      }
    },

    testFramework: 'mocha',

    bootstrap: () => {
      // require('./mochaSetup.js');
    },

    // reportConsoleErrorAsError: true,

    debug: true
  }
}
