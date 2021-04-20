const path = require("path");
const { merge } = require("webpack-merge");
const packageJson = require("../package.json");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const parts = require("./webpack.parts.config");

let main = packageJson.main;
main = main.replace(/^.*[\\/]/, "");

const libraryName = main.substring(0, main.lastIndexOf("."));

const paths = {
    base: path.resolve("src"),
    app: path.resolve("src/index.ts"),
    dist: path.resolve("lib")
};

const libConfig = merge([
    {
        target: "web",
        context: paths.base,
        entry: {
            app: paths.app
        },
        output: {
            library: libraryName,
            filename: libraryName + ".js",
            libraryTarget: "umd",
            umdNamedDefine: true,
            path: paths.dist
        },
        resolve: {
            modules: [path.resolve("./node_modules")],
            extensions: [".json", ".js", ".ts"]
        },
        optimization: {
            // We do not want to minimize our code.
            minimize: false
        },
        plugins: [new CaseSensitivePathsPlugin()]
    },

    parts.loadJs({}),

    parts.sourceMaps("source-map"),

    parts.cleanup()
]);

module.exports = env => {
    const config = merge(libConfig);

    return config;
};
