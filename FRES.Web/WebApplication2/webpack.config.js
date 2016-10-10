"use strict";

var webpack = require('webpack');
var path = require('path');
var pkg = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
    entry: APP_DIR + "/index.jsx",
    output: {
        path: BUILD_DIR,
        filename: "/bundle.js"
    },
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9000
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ]
};

module.exports = config;