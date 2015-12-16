/*!
 * React Component Starter Kit
 * https://github.com/kriasoft/react-component-starter
 * Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
 */

const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

const DEBUG = !argv.release;

const AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
  '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
  '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG,
};

const entries = DEBUG ? {
  'app': './app.js',
} : {
  'simple-super-table': './src',
};

const config = {
  entry: entries,
  output: {
    library: 'SimpleSuperTable',
    libraryTarget: 'umd',
    path: './dist',
    filename: DEBUG ? '[name].js' : '[name].min.js',
  },

  externals: DEBUG ? {} : {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
  },

  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? 'eval' : false,

  stats: {
    colors: true,
    reasons: DEBUG,
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
  ].concat(DEBUG ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]),

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
  },

  module: {
    /*preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],*/
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!' + AUTOPREFIXER_LOADER,
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!' + AUTOPREFIXER_LOADER + '!less-loader',
      },
      {
        test: /\.gif/,
        loader: 'url-loader?limit=10000&mimetype=image/gif',
      },
      {
        test: /\.jpg/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg',
      },
      {
        test: /\.png/,
        loader: 'url-loader?limit=10000&mimetype=image/png',
      },
      {
        test: /\.svg/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
    ],
  },
};

module.exports = config;
