const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const CSSModuleLoader = {
    loader: "css-loader",
    options: {
        modules: true,
        modules: {
            localIdentName: "[name]_[local]_[hash:base64:5]",
        },
        importLoaders: 2,
        sourceMap: false, // turned off as causes delay
    },
};

const CSSLoader = {
    loader: "css-loader",
    options: {
        modules: "global",
        importLoaders: 2,
        sourceMap: false, // turned off as causes delay
    },
};

const autoprefixer = require("autoprefixer");
const PostCSSLoader = {
    loader: "postcss-loader",
    options: {
        ident: "postcss",
        sourceMap: false, // turned off as causes delay
        plugins: () => [autoprefixer()],
    },
};

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const styleLoader = devMode ? "style-loader" : MiniCssExtractPlugin.loader;

process.env.NODE_ENV = "development";

module.exports = {
    mode: "development",
    target: "web",
    devtool: "inline-source-map",
    entry: "./src/index",
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "bundle.js",
    },
    devServer: {
        stats: "minimal",
        overlay: true,
        historyApiFallback: true,
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            favicon: "public/favicon.ico",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "ts-loader"],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /\.module\.(sa|sc|c)ss$/,
                use: [styleLoader, CSSLoader, PostCSSLoader, "sass-loader"],
            },
            {
                test: /\.module\.(sa|sc|c)ss$/,
                use: [
                    styleLoader,
                    CSSModuleLoader,
                    PostCSSLoader,
                    "sass-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
