const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

require('dotenv').config()

const entry = {
    page : './src/index.jsx'
}

const output = {
    path: path.resolve(__dirname, 'public'),
    filename: './bundle.js',
    publicPath: process.env.ASSET_PATH || '/'
}

const devServer = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT|| '3000',
    contentBase: './public',
    historyApiFallback: true
}

const resolve = {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: {
        modules: `${__dirname}/node_modules`
    }
}

const _module = {
    rules: [
        {
            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /.s?css$/,
            use: [
                {loader: MiniCssExtractPlugin.loader},
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            loader: 'file'
        }
    ]
}

const plugins = [
    new HtmlWebpackPlugin({
        template: './public/index.html'
    }),
    new Dotenv(),
    new MiniCssExtractPlugin({
        filename: '[name].css'
    })
]

module.exports = {
    entry,
    output,
    devServer,
    resolve,
    module: _module,
    plugins
}