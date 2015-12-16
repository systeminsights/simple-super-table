const packageJSON = require('./package.json');

const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LessPluginAutoprefix = require('less-plugin-autoprefix');
const LessPluginCleanCSS = require('less-plugin-clean-css');

const DEBUG = !argv.release;

const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG,
};

const plugins = DEBUG ? [
  new webpack.DefinePlugin(GLOBALS),
  new webpack.optimize.OccurenceOrderPlugin(),
] : [
  new webpack.DefinePlugin(GLOBALS),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new ExtractTextPlugin('style.css'),
];

const lessPlugins = DEBUG ? [
  new LessPluginAutoprefix({browsers: ['last 2 versions']}),
] : [
  new LessPluginAutoprefix({browsers: ['last 2 versions']}),
  new LessPluginCleanCSS({advanced: true}),
];

console.log('Webpack DEBUG: ', DEBUG);

module.exports = {
  debug: DEBUG,
  devtool: DEBUG ? 'eval' : false,
  stats: {
    colors: true,
    reasons: DEBUG,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  entry: './src/test.js',
  output: {
    library: true,
    libraryTarget: 'umd',
    filename: DEBUG ? './dist/dist.js' : './dist/dist.min.js',
  },
  externals: {
    'React': 'React',
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [/node_modules/],
    }, {
      test: /\.less$/,
      loader: DEBUG ? 'style!css!less' : ExtractTextPlugin.extract('css!less'),
    }, {
      test: /\.css$/,
      loader: DEBUG ? 'style!css' : ExtractTextPlugin.extract('css'),
    }, {
      test: /\.json$/,
      loader: 'json',
    }],
  },
  lessLoader: {
    lessPlugins: lessPlugins,
  },
};
