const path = require('path');

module.exports = {
    mode:"development",
    entry: ["./src/index.tsx"],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: "/node_modules/",
                use: "ts-loader"
            },
            {
                test: /\.(png|jpe?g|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name]-[hash:8].[ext]',
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx"]
    },
    devtool: "source-map"
}