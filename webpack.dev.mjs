import webpack from 'webpack';
import { merge } from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import common from './webpack.common.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = merge(common, {
	mode: 'development',
	entry: {
		bootstrap: './ts/bootstrap',
		'bootstrap-admin': './ts/bootstrap-admin',
		'bootstrap-tools': './ts/bootstrap-tools',
	},
	devtool: 'eval-cheap-source-map',
	ignoreWarnings: [/was not found/],
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
	cache: {
		type: 'filesystem',
		cacheDirectory: path.resolve(__dirname, '.cache', 'webpack', 'dev'),
		buildDependencies: {
			config: [fileURLToPath(import.meta.url), path.resolve(__dirname, 'webpack.common.mjs')],
		},
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
						loader: 'swc-loader',
						options: {
							jsc: {
								parser: {
									syntax: 'typescript',
									decorators: true,
								},
								transform: {
									legacyDecorator: true,
									decoratorMetadata: true,
									useDefineForClassFields: false,
								},
								target: 'es6',
							},
							module: {
								type: 'es6',
							},
							sourceMaps: true,
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
		new ForkTsCheckerWebpackPlugin({
			async: true,
			typescript: {
				configFile: path.resolve(__dirname, 'tsconfig.json'),
				configOverwrite: {
					compilerOptions: {
						target: 'es6',
						module: 'es6',
					},
				},
				memoryLimit: 4096,
			},
		}),
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
