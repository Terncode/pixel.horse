const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { AngularWebpackPlugin } = require('@ngtools/webpack');
const linkerPlugin = require('@angular/compiler-cli/linker/babel');
const common = require('./webpack.common.js');
const fs = require('fs');

const r = p => JSON.parse(fs.readFileSync(p, 'utf8'));

const config = r('./config.json');

const analytics = config.analytics ? `
	(function(i, s, o, g, r, a, m) {i['GoogleAnalyticsObject']=r; i[r]=i[r]||function() {
	(i[r].q=i[r].q||[]).push(arguments) }, i[r].l=1*new Date(); a=s.createElement(o),
	m=s.getElementsByTagName(o)[0]; a.async=1; a.src=g; m.parentNode.insertBefore(a, m)
	}) (window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
	ga('create', '${config.analytics.trackingID}', 'auto');
	ga('send', 'pageview');
` : ``;

const compilerOptions = r('./tsconfig-aot.json').compilerOptions;
//const compilerOptionsES = r('./tsconfig-aot-es.json').compilerOptions;

const scripts = [
	['bootstrap', 'app/app.module#AppModule', 'assets', compilerOptions, 'tsconfig-aot.json', 5, false],
	// ['bootstrap-es', 'app/app.module#AppModule', 'assets', compilerOptionsES, 'tsconfig-aot-es.json', 7, false],
	['bootstrap-admin', 'admin/admin.module#AdminAppModule', 'assets-admin', compilerOptions, 'tsconfig-aot-admin.json', 5, true],
	['bootstrap-tools', 'tools/tools.module#ToolsAppModule', 'assets', compilerOptions, 'tsconfig-aot-tools.json', 5, true],
];

const toolsScrips =	['bootstrap-tools', 'tools/tools.module#ToolsAppModule', 'assets', compilerOptions, 'tsconfig-aot-tools.json', 5, true];
const max = Math.max(...([...scripts, toolsScrips].map(e => e[0].length)));
function getScripts(args) {
	const { analyze, main, admin, tools, beta } = args;
	if (tools || beta) {
		return [...scripts, toolsScrips];
	}

	if (analyze || main) {
		return [scripts[0]];
	} else if (admin) {
		return [scripts[2]];
	} else {
		return scripts;
	}
}

module.exports = (args = {}) =>
	getScripts(args)
		.map(([script, entry, outDir, compilerOptions, tsconfig, _ecma, TOOLS]) => merge(common, {
			mode: 'production',
			performance: {
				maxEntrypointSize: 10000000,
				maxAssetSize: 10000000,
			},
			entry: {
				[script]: `./ts/${script}`,
			},
			output: Object.assign({}, common.output, {
				filename: '[name]-[chunkhash:10].js',
				path: path.resolve(__dirname, 'build', outDir, 'scripts'),
			}),
			devtool: script === 'bootstrap' ? 'source-map' : false,
			module: {
				rules: [
					{
						test: /\.m?js$/,
						use: {
						  loader: 'babel-loader',
						  options: {
								plugins: [linkerPlugin],
								compact: false,
								cacheDirectory: true,
						  }
						}
					},
					{
						test: /\.[jt]sx?$/,
						use: [{
							loader: '@ngtools/webpack', options: {
								sourcemap: true,
							 	compilerOptions,
							}
						}],
					},
				],
			},
			stats: {
				preset: 'normal',
				reasons: true,
				modules: true,
				errorDetails: true,
				moduleTrace: true
			},
			optimization: {
				minimizer: [
					new TerserPlugin({
						extractComments: {
							condition: true,
							banner: false,
						},
						terserOptions: {
							sourceMap: true,
							ecma: 5,
							mangle: {
								properties: {
									regex: /^__(?!default$)/,
								},
							},
							output: { comments: false },
						},
					}),
				],
			},
			plugins: [
				new AngularWebpackPlugin({
					tsconfig,
					compilerOptions: {
						angularCompilerOptions: {
							entryModule: `src/ts/components/${entry}`,
						},
				 }
				}),
				(script === 'bootstrap' && !args.analyze) ? new WrapperPlugin({ test: /\.js$/, header: analytics }) : undefined,
				args.analyze ? new BundleAnalyzerPlugin({ analyzerMode: 'static' }) : undefined,
				new webpack.DefinePlugin({
					DEVELOPMENT: false, TOOLS, SERVER: false, BETA: !!args.beta,
					TIMING: !!args.timing, TESTS: false,
					ngJitMode: false, // NOTE: Enable this if you need more detailed JIT compiler error
					ngI18nClosureMode: false, // disables localization closure
					ngDevMode: false, // Disable angular dev
				}),
				new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
				new webpack.ProgressPlugin({
					handler: (percentage, message, ...args) => {
					  const fullMsg = `${args.join(' ')} ${message}`.trim();
					  const p = Math.floor(percentage * 100).toString();
					  const emp = ' '.repeat(3 - p.length);
					  const l = script.length;
					  const emp2 = ' '.repeat(max - l);
					  console.log(`[${p}%]${emp}[${script}] ${emp2} | ${fullMsg}`);
					},
				  }),
			].filter(x => x),
		}));
