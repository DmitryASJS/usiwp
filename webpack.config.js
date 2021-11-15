const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log("__dirname → ", __dirname);

let mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

console.log('mode', mode);


module.exports = {
	mode: mode,
	entry: './src/js/index.js',
	output: {
		filename: '[name].[fullhash].js',
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: './[name][ext]',
		clean: true,
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		port: 8082,
		open: true,
		liveReload: true,
		client: {
			overlay: true,
			progress: true,
		},
	},
	module: {
		rules: [
				{
					test:/\.html$/i,
					loader: "html-loader",
				},
				{
				test: /\.svg$/,
				type: 'asset/resource',
				generator: {
					filename: 'img/svg/[contenthash][ext]'
				},
				use: 'svgo-loader',
			},
			{
				test: /\.(jp|jpe)g$/,
				type: 'asset/resource',
				generator: {
					filename: 'img/content/[contenthash][ext]'
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'css/fonts/[name][ext]',
				},

			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					(mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										"postcss-preset-env",
									],
								],
							},
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.pug$/i,
				loader: 'pug-loader',
				exclude: /(node-modules|bower-components)/,
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css'
		}),
		new HtmlWebpackPlugin({
			title: 'My WebPack',
			template: './src/index.pug',
			inject: 'body',
			publicPath: 'auto',
		}),
	]
}