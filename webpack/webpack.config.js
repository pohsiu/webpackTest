const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const APP_DIR = path.resolve(__dirname, '../src/frontend/index.js');

module.exports = env => {
  return merge([
    {
      entry: ['@babel/polyfill', APP_DIR],
      output: {
        path: path.join(__dirname, '../dist'),
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
  ])
};
