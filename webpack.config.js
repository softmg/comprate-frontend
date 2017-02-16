/*
 * Copyright © 2017 Elbek Azimov. Contacts: <atom.azimov@gmail.com>
 */

'use strict';
if (!process.env.NODE_ENV) {
  //noinspection JSUnresolvedVariable
  let fileName = process.mainModule.filename.split('/').pop();
  process.env.NODE_ENV = fileName === 'webpack.js' ? 'prod' : 'dev';
}

const isDev = process.env.NODE_ENV === 'dev';
const isTest = process.env.NODE_ENV === 'test';
// const isProd = process.env.NODE_ENV === 'prod';
const port = process.env.PORT || 3000;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HappyPack = require('happypack');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');


const tsOptions = {
  compilerOptions: {
    "sourceMap": isDev || isTest,
  },
  transpileOnly: isDev || isTest
};

let config = {
  entry: ['./boot.ts'],
  output: {
    path: `${__dirname}/web`,
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    unsafeCache: isDev || isTest
  },
  cache: isDev || isTest,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader?' + JSON.stringify(tsOptions),
        exclude: /node_modules/,
        include: [
          `${__dirname}/test.ts`,
          `${__dirname}/boot.ts`,
          `${__dirname}/src`,
        ]
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
        exclude: /node_modules\/[^@]/
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'js',
      loaders: ['babel-loader']
    }),

    // new FaviconsWebpackPlugin('favicon.png'),
  ]
};

if (!isTest) {
  config.plugins.push(new HtmlWebpackPlugin({
    template: './index.html',
    title: 'Comp Rate',
  }));
}

if (isDev) {
  config.devtool = 'eval-source-map';
  config.devServer = {
    port: port,
    contentBase: '/web',
    historyApiFallback: true,
    // compress: true,
    hot: true,
    inline: true,
    noInfo: true,
    // lazy: true,
    quiet: true
  };

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
} else if (isTest) {
  config.devtool = 'inline-source-map';
} else {

  const CompressionPlugin = require('compression-webpack-plugin');
  // const cssNano = require('cssnano');

  // postcssPlugins.push(cssNano({
  //   autoprefixer: {
  //     browsers: ['> 1%', 'last 2 version', 'IE >= 10'],
  //     remove: false
  //   },
  //   discardComments: {removeAll: true}
  // }));

  config.plugins.push(
    // new Clean([`${__dirname}/dist/build`]),
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin({threshold: 8196})
  );
}

config.plugins.push(new webpack.DefinePlugin({
  __isDev__: isDev,
  __isTest__: isTest
}));

module.exports = config;
