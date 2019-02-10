const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const packs = path.join(__dirname, 'frontend')
const ManifestPlugin = require("webpack-manifest-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = [{
    mode: devMode,
    devtool: 'source-map',
    entry: {
        application: __dirname + '/frontend/packs/application.js',
    },
    context: packs,
    output: {
        path: path.join(__dirname, 'public'),
        filename: devMode ? '[name].js' : '[name]-[hash].js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.common.js'
        },
        modules: [path.resolve(__dirname, "frontend"), "node_modules" ],
        extensions:
            [ '.vue',
                '.js',
                '.sass',
                '.scss',
                '.css',
                '.module.sass',
                '.module.scss',
                '.module.css',
                '.png',
                '.svg',
                '.gif',
                '.jpeg',
                '.jpg',
                '.pcss' ]
    },
    resolveLoader: { modules: [ 'node_modules' ] },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            { test: /\.vue$/, loader: 'vue-loader'},
            { test: /\.(jpg|png|svg|woff|woff2|ttf|eot)$/, loaders: 'file-loader'}
        ],
    },

    plugins: [
        new ManifestPlugin({
            fileName: 'manifest.json',
            publicPath: '/',
            writeToFileEmit: true,
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({filename: devMode ? '[name].css' : '[name]-[hash].css'})
    ],

    devServer: {
        contentBase: '/',
        port: 8000,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}];

