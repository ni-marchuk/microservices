const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const deps = require("./package.json").dependencies;

require('dotenv').config();

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
    mode: mode,
    entry: "./src/index.ts",
    output: {
        publicPath: getPublicPath(),
        chunkFilename: getChunkFileName()
    },
    devServer: {
        port: 3001,
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
            name: 'products',
            filename: 'remoteEntry.js', // build file defaultName
            // runtime: 'runtime',
            exposes: {
                './ProductsApp': './src/App.tsx', // root
            },
            shared: {
                'react': {
                    requiredVersion: deps['react'],
                },
                'react-dom': {
                    requiredVersion: deps['react-dom'],
                },
                'react-router': {
                    requiredVersion: deps['react-router'],
                },
            },
        }),
    ],
};

function getPublicPath() {
    /** TODO .env намеренно указан дев */
    if (mode === "development") {
        return `http://localhost:3001/`;
    }
    return `https://stage-example/`;
}

function getChunkFileName() {
    return mode === "production"
        ? "[name].[contenthash].js"
        : "[name].js"
}