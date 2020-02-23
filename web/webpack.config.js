/* eslint-disable */
const webpack = require("webpack");
const path = require("path");

const config = {
	entry: ["react-hot-loader/patch", "./src/index.tsx"],
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.ts(x)?$/,
				use: ["awesome-typescript-loader"],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx", ".tsx", ".ts"],
		alias: {
			"react-dom": "@hot-loader/react-dom"
		}
	},
	devServer: {
		contentBase: "./public",
		port: 8080
	}
};

module.exports = config;
