import { Configuration, DefinePlugin, ProgressPlugin } from "webpack";
import "webpack-dev-server";

import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import WebpackObfuscator from "webpack-obfuscator";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";

import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import envConfig from "./config";

const isProduction = envConfig.webpackBuildMode === "production";

const config: Configuration = {
    mode: envConfig.webpackBuildMode,
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [isProduction? MiniCssExtractPlugin.loader: "style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/[hash][ext][query]"
                }
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": path.resolve(__dirname, "src")
        },
        modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules")],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: isProduction? "[name].[contenthash].js":"[name].bundle.js",
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
        }),
        new DefinePlugin({
            "process.env.API_SERVER_URL": JSON.stringify(envConfig.apiServerURL),
            "process.env.BUILD_ENV": JSON.stringify(envConfig.buildEnv),
        }),
        new ProgressPlugin(),
        new ForkTsCheckerWebpackPlugin(),
    ]
};

if (envConfig.webpackBuildMode === "development") {
    config.devServer = {
        port: envConfig.devServerPort,
        hot: true,
        historyApiFallback: true,
    };
} else if (envConfig.webpackBuildMode === "production") {
    config.optimization = {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ]
    };

    config.plugins?.push(
        new WebpackObfuscator(
            {
                rotate: true,
                selfDefending: true,
                stringArray: true,
                stringArrayThreshold: 0.75
            },
            [ "excluded_bundle_name.js" ],
        ),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
            reportFilename: "build-report.html",
        }),
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    );
}

export default config;

