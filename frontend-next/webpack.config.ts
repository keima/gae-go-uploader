import * as path from "path";
import * as webpack from "webpack";

const config: webpack.Configuration = {
    entry: path.join(__dirname, "src", "./index.tsx"),

    output: {
        path: path.join(__dirname, "static", "assets"),
        filename: "bundle.js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },

    // webpack-dev-server
    devServer: {
        publicPath: "/assets/",
        contentBase: path.join(__dirname, "static"),
        hot: true,
        overlay: true,
        watchContentBase: true,
        port: 3000,
        openPage: 'index.html'
    }
}

export default config
