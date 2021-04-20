const { CleanWebpackPlugin } = require("clean-webpack-plugin");

exports.cleanup = () => ({
    plugins: [new CleanWebpackPlugin({ verbose: false })]
});

exports.loadJs = ({ options }) => ({
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: ["/node_modules/", "/lib/"],
                use: [
                    {
                        loader: "ts-loader",
                        options: options
                    }
                ]
            }
        ]
    }
});

exports.sourceMaps = method => ({
    devtool: method
});
