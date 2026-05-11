import webpack from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common.mjs';
import fs from 'fs';

const r = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const tsconfig = r('./tsconfig.json');

const compilerOptions = {
	...tsconfig.compilerOptions,
	target: 'es6',
	module: 'es2016',
};

const config = merge(common, {
	mode: 'development',
	entry: {
		bootstrap: './ts/bootstrap',
		'bootstrap-admin': './ts/bootstrap-admin',
		'bootstrap-tools': './ts/bootstrap-tools',
	},
	devtool: 'eval-cheap-source-map',
	devServer: {
		host: '0.0.0.0',
		port: 8091,
		historyApiFallback: true,
		compress: false,
		client: {
			progress: true,
			overlay: {
				errors: true,
				warnings: false,
			},
		},
		static: {
			publicPath: '/assets/scripts/',
		},
		allowedHosts: 'all',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET',
			'Access-Control-Allow-Headers':
				'X-Requested-With, content-type, Authorization',
		},
	},
	stats: {
		preset: 'normal',
		reasons: true,
		modules: true,
		errorDetails: true,
		moduleTrace: true,
	},
	output: {
		pathinfo: false,
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
		removeEmptyChunks: false,
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			DEVELOPMENT: true,
			TOOLS: true,
			SERVER: false,
			BETA: true,
			TIMING: true,
			TESTS: false,
		}),
	],
});

export default config;
