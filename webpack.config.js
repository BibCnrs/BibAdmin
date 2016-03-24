var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

if (!process.env.BIBADMIN_HOST || !process.env.BIBAPI_HOST) {
    throw new Error('environment variable BIBADMIN_HOST and BIBAPI_HOST need to be set');
}

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
                    presets: ['es2015', 'stage-2']
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
            __BIBADMIN_HOST__: JSON.stringify(process.env.BIBADMIN_HOST),
            __BIBAPI_HOST__: JSON.stringify(process.env.BIBAPI_HOST)
        }),
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        })
    ]
};
