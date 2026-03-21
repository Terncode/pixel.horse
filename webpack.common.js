const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
	context: path.join(__dirname, 'src'),
	output: {
		path: path.resolve(__dirname, 'build', 'assets', 'scripts'),
		filename: '[name].js',
		publicPath: '/assets/scripts/',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['angular2-template-loader'],
				exclude: [/node_modules/],
			},
			{
				test: /\.css$/,
				use: [{
					loader: 'raw-loader',
					options: {
						esModule: false,
					},
				},],
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'raw-loader',
					options: {
						esModule: false,
					},
				},],
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: 'raw-loader',
						options: {
							esModule: false,
						},
					},
					{
						loader: 'pug-html-loader',
						options: { doctype: 'html', plugins: require('pug-plugin-ng') },
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'raw-loader',
						options: {
							esModule: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								ident: 'postcss',
								plugins: [
									autoprefixer('last 2 versions'),
									cssnano({ discardComments: { removeAll: true } }),
								],

							}
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: ['src/styles'],
							},
						},
					},
				],
			},
			{
				// Mark files inside `@angular/core` as using SystemJS style dynamic imports.
				// Removing this will cause deprecation warnings to appear.
				test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
				parser: { system: false }, // disable SystemJS
			},
		],
	},
	plugins: [
		new webpack.ContextReplacementPlugin(
			/\@angular(\\|\/)core(\\|\/)/,
			path.resolve(__dirname, 'src', 'ts'),
			{}
		),
	],
};
