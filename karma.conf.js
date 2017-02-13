/*
 * Copyright © 2017 Elbek Azimov. Contacts: <atom.azimov@gmail.com>
 */

// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
const coverage = process.env.COVERAGE || false;

process.env.NODE_ENV = 'test';
const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-webpack')
    ],
    files: [
      {pattern: 'test.ts', watched: false}
    ],
    preprocessors: {
      '**/*.ts': ['webpack']
    },
    karmaTypescriptConfig: {
      tsconfig: 'tsconfig.json'
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: coverage ? ['progress', 'coverage-istanbul'] : ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    webpack: webpackConfig
  });
};
