/**
 * Created by Darren_YCDing on 16/5/14.
 */
var path = require('path');
var webpack = require('webpack');
//  将组件中的样式提取出来
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlwebpackPlugin = require('html-webpack-plugin');

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var MOUDLE_PATH = path.resolve(ROOT_PATH, 'node_modules');
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var myVersion = '1.0.0';

//定义公共模块
var common = [
    'react',
    'react-dom'
];

module.exports = {
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: {
        main: path.resolve(SRC_PATH, 'main.jsx'),
        common: common
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        //path: path.resolve(BUILD_PATH, myVersion),
        path: BUILD_PATH,
        filename: '[name].build.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [SRC_PATH, MOUDLE_PATH]
    },
    //babel重要的loader在这里
    module: {
        loaders: [
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.jsx|js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000&name=./images/[name].[ext]' },
            { test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file-loader?name=./font/[name].[ext]' }
        ]
    },
    //添加我们的插件 会自动生成一个html文件
    plugins: [
        //new ExtractTextPlugin("[name].build.css"),
        //将样式统一发布到style.css中
        new ExtractTextPlugin("style.build.css", {
            allChunks: true,
            disable: false
        }),
        new HtmlwebpackPlugin({
            favicon:'./src/images/favicon.ico',
            inject: true,
            template: path.resolve(SRC_PATH, 'index.html')
        }),
        new webpack.NoErrorsPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
};