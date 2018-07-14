const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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

  plugins: [
    new HtmlWebpackPlugin({
          template : './views/static_pages/index.pug',
          inject   : true
    })
  ].filter(p => !!p),

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
        },
        {
            test: /\.pug$/,
            include: path.join(__dirname, 'views'),
            loaders: [ 'pug-loader' ]
        },
    ]
  }
};
