const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const compilerOptions = {
	...require('./tsconfig.json').compilerOptions,
	target: 'es6',
	module: 'es2015',
};

module.exports = merge(common, {
	mode: 'development',
	entry: {
		'bootstrap': './ts/bootstrap',
		'bootstrap-admin': './ts/bootstrap-admin',
		'bootstrap-tools': './ts/bootstrap-tools',
	},
	devtool:  'eval-cheap-source-map',
	devServer: {
		host: '0.0.0.0',
		port: 8090,
		hot: true,
		compress: false,
		allowedHosts: ['all'],
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
		}
	},
	stats: {
		preset: 'normal',
		reasons: true,
		modules: true,
		errorDetails: true,
		moduleTrace: true
	},
	output: {
		pathinfo: false
	},
	watchOptions: {
		ignored: /node_modules/,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							compilerOptions,
						},
					},
					'angular2-template-loader',
				],
			},
		],
	},
	optimization: {
		removeAvailableModules: false,
		removeEmptyChunks: false, // replacement of NamedModulesPlugin(),
		moduleIds: 'named',
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	},
	plugins: [
		new webpack.DefinePlugin({
			DEVELOPMENT: true, TOOLS: true, SERVER: false,
			BETA: true, TIMING: true, TESTS: false
		}),
	],
});
