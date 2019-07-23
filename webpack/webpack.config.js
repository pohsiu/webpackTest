const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals')
const FRONT_DIR = path.resolve(__dirname, '../src/frontend/index.js');
const SERVER_DIR = path.resolve(__dirname, '../src/server/index.js');

module.exports = env => {
  return [
    {
      name: 'frontend',
      entry: ['@babel/polyfill', FRONT_DIR],
      output: {
        path: path.join(__dirname, '../dist/frontend'),
        filename: '[name].bundle.js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          },
        ]
      },
      resolve: {
        extensions: ['*', '.js', '.jsx']
      },
      devServer: {
        port: 3000,
        open: true,
        proxy: {
          '/api': 'http://localhost:8080'
        }
      },
      plugins: [
        new HtmlWebpackPlugin({ 
          template: './src/frontend/index.html', 
          filename: './index.html' 
        }),
        new webpack.DefinePlugin({ 
          'process.env.VERSION': (env && JSON.stringify(env.VERSION)) || 'stag',
          'process.env.PLATFORM': (env && JSON.stringify(env.PLATFORM)) || 'local',
        }),
      ]
    },
    {
      name: 'server',
      entry: ['@babel/polyfill', SERVER_DIR],
      output: {
        path: path.join(__dirname, '../dist/server'),
        filename: 'index.js'
      },
      target: 'node',
      // node: {
      //   fs: 'empty',
      //   net: 'empty',
      // },
      externals: [nodeExternals()],
      module: {
        rules: [
          {
            // Transpiles ES6-8 into ES5
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            // Loads the javacript into html template provided.
            // Entry point is set below in HtmlWebPackPlugin in Plugins 
            test: /\.html$/,
            use: [{loader: "html-loader"}]
          }
        ]
      },
    },
  ]
};
