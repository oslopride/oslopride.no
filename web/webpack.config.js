/* eslint-disable */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require("path");

const config = {
	entry: ["react-hot-loader/patch", "./src/index.tsx"],
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "bundle.js"
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "public"),
		historyApiFallback: true
	},
	plugins: [new ForkTsCheckerWebpackPlugin({ eslint: true })]
};

module.exports = config;
