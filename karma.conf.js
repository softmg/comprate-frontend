/*
 * Copyright © 2017 Elbek Azimov. Contacts: <atom.azimov@gmail.com>
 */

// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
const coverage = process.env.COVERAGE || false;

process.env.NODE_ENV = 'test';

const HappyPack = require('happypack');

const tsOptions = {
  compilerOptions: {
    "sourceMap": true,
  },
  transpileOnly: true
};


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
    ],
    files: [
      {pattern: 'test.ts', watched: false}
    ],
    preprocessors: {
      '**/*.ts': ['webpack', 'sourcemap']
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
    webpack: {
      resolve: {
        extensions: ['.ts', '.js']
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: 'ts-loader?' + JSON.stringify(tsOptions),
            exclude: /node_modules/
          }
        ]
      },
      plugins: [
        // new FaviconsWebpackPlugin('favicon.png'),
      ]
    }
  });
};
