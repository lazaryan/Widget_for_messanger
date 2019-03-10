'use strict';

const webpack                   = require('webpack');
const path                      = require('path');

const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const CleanWebpackPlugin        = require('clean-webpack-plugin');
const UglifyJsPlugin            = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin   = require('hard-source-webpack-plugin');
const OptimizeCSSAssetsPlugin   = require('optimize-css-assets-webpack-plugin');
const autoprefixer              = require('autoprefixer');

const NODE_ENV      = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';

const publicPath    = 'http://localhost:8080/public/assets';
const jsName        = 'bundle.js';
const cssName       = 'styles.css';


let plugins = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(NODE_ENV)
        }
    }),
    new MiniCssExtractPlugin({
        filename: cssName
    })
];

let optimization = {};

if (!isDevelopment) {
    plugins.push(
        new CleanWebpackPlugin(['public/assets/'], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    );
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    plugins.push(new HardSourceWebpackPlugin());

    optimization['minimizer'] = [
        new UglifyJsPlugin({
            parallel: true,
            cache: true,
            sourceMap: true,
            uglifyOptions: {
                keep_fnames: false,
                mangle: true,
                compress: true
            }
        }),
        new OptimizeCSSAssetsPlugin({})
    ];
}

module.exports = {
    entry: ['./src/client.js'],
    output: {
        path: `${__dirname}/public/assets/`,
        filename: jsName,
        publicPath
    },
    resolve: {
        modules: ['node_modules', 'public'],
        extensions: ['*', '.js', '.jsx'],
        alias: {
            _styles: path.join(__dirname, 'src/styles'),
            _components: path.join(__dirname, 'src/components')
        }
    },
    resolveLoader: {
        moduleExtensions: ['*', '-loader']
    },
    plugins,
    optimization,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    isDevelopment ? 'style' : MiniCssExtractPlugin.loader,
                    {loader: 'css', options: {url: false, sourceMap: isDevelopment}},
                    {loader: 'postcss', options: {
                        plugins: [
                            autoprefixer({
                                browsers:['ie >= 8', 'last 4 version']
                            })
                        ]
                    }},
                ]
            },
            {
                test: /\.less$/,
                use: [
                    isDevelopment ? 'style' : MiniCssExtractPlugin.loader,
                    {loader: 'css', options: {url: false, sourceMap: isDevelopment}},
                    {loader: 'postcss', options: {
                        plugins: [
                            autoprefixer({
                                browsers:['ie >= 8', 'last 4 version']
                            })
                        ]
                    }},
                    {loader: 'less', options: {sourceMap: isDevelopment}}
                ]
            },
            {test: /\.gif$/, use: [{loader: 'url', options: {limit: 10000, mimetype: 'image/gif'}}]},
            {test: /\.jpg$/, use: [{loader: 'url', options: {limit: 10000, mimetype: 'image/jpg'}}]},
            {test: /\.png$/, use: [{loader: 'url', options: {limit: 10000, mimetype: 'image/png'}}]},
            {test: /\.svg/, use: [{loader: 'url', options: {limit: 26000, mimetype: 'image/svg+xml'}}]},
            {test: /\.(woff|woff2|ttf|eot)/, use: [{loader: 'url', options: {limit: 1}}]},
            {test: /\.json$/, use: 'json'},
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: isDevelopment ? ['react-hot-loader/webpack', 'babel', 'eslint'] : 'babel'
            }
        ]
    },
    watch: isDevelopment,
    devtool: isDevelopment ? 'source-map' : false,
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' },
        port: 8080
    }
}