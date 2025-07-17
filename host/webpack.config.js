const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const deps = require("./package.json").dependencies;
require('dotenv').config();

const mode = process.env.NODE_ENV === "production" ? "production" : "development";
console.log(process.env.NODE_ENV)

module.exports = {
    mode: mode,
    entry: "./src/index.ts",
    output: {
        publicPath: getPublicPath(),
        chunkFilename: getChunkFileName()
    },
    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, "public"),
        },
        historyApiFallback: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new ModuleFederationPlugin({
            name: 'host',
            runtime: 'runtime',
            shared: {
                'react': {
                    singleton: true,
                    eager: true,
                    requiredVersion: deps['react'],
                },
                'react-dom': {
                    singleton: true,
                    eager: true,
                    requiredVersion: deps['react'],
                },
                'react-router': {
                    singleton: true,
                    eager: true,
                    requiredVersion: deps['react-router'],
                }
            },
            remotes: {
                products: `products@${getRemoteUrl()}`
            },
        }),
    ]
};

function getRemoteUrl() {
    if (mode === "development") {
        return `http://localhost:3001/remoteEntry.js`;
    }
    return `https://stage-example/remoteEntry.js`;
}

function getPublicPath() {
    if (mode === "development") {
        return `http://localhost:3000/`;
    }
    return `https://stage-example/`;
}

function getChunkFileName() {
    return mode=== "production"
        ? "[name].[contenthash].js"
        : "[name].js"
}