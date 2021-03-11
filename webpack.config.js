const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { resolve } = require('path');

module.exports = {
    entry: {
        router: './src/router.js',
        app: './src/index.js',
        common: './src/common.js'
    },

    output: {
        path: resolve(__dirname, './public'),
        filename: '[name].js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({ filename: 'app.css' }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['public']
        })
    ],

    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },

    devServer: {
        before: (app, server, compiler) => {
            app.get('https://my-json-server.typicode.com/kakaopay-fe/resources/words', (req, res) => {
                console.log(res);
            });
        }
    }
}