

var HTMLWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var isProduction = Boolean(process.env['PRODUCTION']);

module.exports = {
    entry : './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
        }),
        new CopyWebpackPlugin([{
            from: './src/style.css'
        }])
    ],
    mode: isProduction ? 'production' : 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        host: process.env.IP,
//        https: false,
        port: process.env.PORT,
        public: "7c73513cf72742ecbd14908b229824ec.vfs.cloud9.eu-west-1.amazonaws.com"
    },
    optimization: {
        minimize: isProduction
    }
}
