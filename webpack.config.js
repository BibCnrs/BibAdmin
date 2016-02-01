var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './js/main.js',
        login: './js/login.js'
    },
    output: {
        path: __dirname + '/public/build',
        filename: '[name].js',
        publicPath: '/public/build'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015', 'stage-2']
                },
                exclude: /node_modules/
            },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.html$/, loader: 'html' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('css') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __HOST__: JSON.stringify(process.env.BIBADMIN_HOST)
        }),
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
    ]
};
