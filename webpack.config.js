const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
      },
    output: {
        path: path.join(__dirname, "/public"),
        filename: "bundle.js",
        publicPath: ''
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html" })
    ],
    devServer: {
        historyApiFallback: true,
    },
}
