'use strict';

var path = require('path');
var webpack = require('webpack');

const SRC_DIR = 'src/';
const DIST_DIR = 'dist/';
const SRC_PATH = path.resolve(__dirname, SRC_DIR);
const DIST_PATH = path.resolve(__dirname, DIST_DIR);

var config = {
  entry: {
    app: path.resolve(SRC_PATH, 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, DIST_PATH),
    filename: '[name].entry.js'
  },
  module: {
    loaders: [
      {
        test: [/\.(js|jsx)$/],
        loader: 'babel-loader',
        include: SRC_PATH,
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: [/\.sass$/],
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: SRC_PATH
      }
    ]
  }
};

module.exports = config;
