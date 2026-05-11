import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
	context: path.join(__dirname, 'src'),
	output: {
		path: path.resolve(__dirname, 'build', 'assets', 'scripts'),
		filename: '[name].js',
		publicPath: '/assets/scripts/',
	},
	resolve: {
		extensions: ['.ts', '.js'],
		fallback: {
			util: require.resolve('util/'),
		},
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
				use: [
					{
						loader: 'raw-loader',
						options: {
							esModule: false,
						},
					},
				],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'raw-loader',
						options: {
							esModule: false,
						},
					},
				],
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
						options: {
							doctype: 'html',
							plugins: (await import('pug-plugin-ng')).default,
						},
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
									cssnano({
										discardComments: {
											removeAll: true,
										},
									}),
								],
							},
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
				test: /[\\/\\]@angular[\\/\\]core[\\/\\].+\.js$/,
				parser: {
					system: false,
				},
			},
		],
	},
	plugins: [
		new webpack.ContextReplacementPlugin(
			/\\@angular(\\|\/)core(\\|\/)/,
			path.resolve(__dirname, 'src', 'ts'),
			{}
		),
	],
};

export default config;