const path = require("path")
const extractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require("webpack")
const uglifyJSPlugin = require("uglifyjs-webpack-plugin")
const extractLess = new extractTextPlugin({
    filename: "../style/[name].css",
    disable: process.env.NODE_ENV === "development"
})
module.exports = {
    entry: {
        index: "./src/script/index.js",
        vendor:["react","react-dom"]
    },
    output: {
        path: path.resolve(__dirname, "build/script"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/script')
                ],
                loader: "babel-loader"
            },
            {
                test: /\.less$/,
                use:extractLess.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }
                    ],
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        extractLess,
        new webpack.optimize.CommonsChunkPlugin({
            names:["vendor","runtime"]
        }),
        new uglifyJSPlugin()
    ],
    // externals:{
    //     "react":"React",
    //     "react-dom":"ReactDom"
    // }
}