const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
module.exports = {
    entry: './src/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: 'pug-loader'
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: ''
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.pug',
            filename: 'index.html'
        }),
        new HtmlWebpackPugPlugin()
    ]
}