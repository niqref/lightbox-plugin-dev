'use strict';

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const setFilename = (extention) => isDev ? `${extention}/[name].${extention}` : `${extention}/[name].[fullhash].${extention}`;

const setOptimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: 'single'
    };

    if (isProd) {
        config.minimizer = [
            `...`,
            new CssMinimizerPlugin()
        ]
    }

    return config;
};

const setPlugins = () => {
    const plugins = [
        new HTMLWebpackPlugin({
            template: './examples/index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: setFilename('css')
        })
    ];

    if (isDev) {
        plugins.push(new ESLintWebpackPlugin());
    }

    return plugins;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        examples: ['@babel/polyfill', './examples/js/index'],
    },
    output: {
        filename: setFilename('js'),
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        clean: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: setOptimization(),
    devServer: {
        port: 8000,
        hot: true
    },
    devtool: isDev ? 'source-map' : false,
    plugins: setPlugins(),
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          publicPath: '/',
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]'
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    }
};
