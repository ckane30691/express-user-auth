const path = require('path');
const webpack = require('webpack');

const isTest = process.env.NODE_ENV === 'test'

module.exports = {

  devtool: 'eval-source-map',

  entry: "./frontend/entry.jsx",
  output: {
    path: path.resolve(__dirname, 'views', 'static_pages'),
    pathinfo   : true,
    filename   : 'bundle.js',
    publicPath : '/'
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
        {
            test    : [/\.jsx?$/, /\.js?$/],
            loader  : 'babel-loader',
            exclude : /node_modules/,
            options : {presets: ['es2015', 'react']},
            include : path.join(__dirname, 'frontend')
        }
    ]
  }
};
