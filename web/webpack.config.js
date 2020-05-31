/* eslint-disable @typescript-eslint/no-var-requires */
const { EnvironmentPlugin } = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
	entry: ["react-hot-loader/patch", "./src/index.tsx"],
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "bundle.js",
		publicPath: "/"
	},
	resolve: {
		extensions: [".js", ".jsx", ".tsx", ".ts"],
		alias: {
			"react-dom": "@hot-loader/react-dom"
		}
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]"
						}
					}
				]
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "public"),
		historyApiFallback: true,
		port: 8080
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Oslo Pride"
		}),
		new FaviconsWebpackPlugin("./favicon.png"),
		new ForkTsCheckerWebpackPlugin({ eslint: true }),
		new EnvironmentPlugin({
			NODE_ENV: "development",
			SANITY_PREVIEW: "false",
			SANITY_STUDIO_API_DATASET: undefined
		}),
		new Dotenv()
	]
};
