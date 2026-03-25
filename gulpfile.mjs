import 'source-map-support/register.js';
import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import _ from 'lodash';
import gulpif from 'gulp-if';
import rev from 'gulp-rev';
import gulpSass from 'gulp-sass';
import  dartSass from 'sass';
import shell from 'gulp-shell';
import cssnano from 'gulp-cssnano';
import imagemin from 'gulp-imagemin';
import autoprefixer from 'gulp-autoprefixer';
import liveServer from 'gulp-live-server';
import sizereport from 'gulp-sizereport';
import markdownTree from 'markdown-tree';
import mocha from 'gulp-spawn-mocha';
import remapIstanbul from 'remap-istanbul/lib/gulpRemapIstanbul.js';
import { spawn } from 'child_process';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { deleteAsync } from 'del';
import config from './config.json' with { type: 'json' };

let development = true;
const stamp = Math.floor(Math.random() * 0xffffffff);
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
const HASH = _.range(0, 10).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');

const sass = gulpSass(dartSass);

const argv = yargs(hideBin(process.argv))
	.option('fast', { type: 'boolean', default: false })
	.option('noserver', { type: 'boolean', default: false })
	.option('adm', { type: 'boolean', default: false })
	.option('debug', { type: 'boolean', default: false })
	.option('main', { type: 'boolean', default: false })
	.option('beta', { type: 'boolean', default: false })
	.option('timing', { type: 'boolean', default: false })
	.option('coverage', { type: 'boolean', default: false })
	.option('tests', { type: 'boolean', default: false })
	.option('sprites', { type: 'boolean', default: false })
	.parse();

function swallowError(e) {
	console.log(e.message);
	this.emit('end');
}

const runAsync = (command, args) => new Promise((resolve, reject) => {
	const proc = spawn(command, args)
		.on('error', reject)
		.on('exit', resolve);

	proc.stdout.pipe(process.stdout);
	proc.stderr.pipe(process.stderr);
});

const readFile = src => fs.readFileSync(src, { encoding: 'utf-8' });

const lintCode = code => (code.trim() + '\n')
	.replace(/\r\n/g, '\n')
	.replace(/  /g, '\t')
	.replace(/"/g, "'");

const npmScript = (name, args = []) => {
	const func = () => runAsync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', name, ...args]);
	func.displayName = `npm run ${name}`;
	return func;
};

const clean = () => deleteAsync([
	'build/*',
	'temp/*',
	'!temp/.gitignore',
]);

const clearAdmin = () => deleteAsync([
	'build/assets-admin',
]);

const manifest = cb => {
	const json = {
		name: config.title,
		short_name: config.title,
		start_url: '/',
		scope: '/',
		theme_color: '#5b6ee1',
		background_color: '#5b6ee1',
		display: 'standalone',
		icons: [
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png'
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png'
			}
		]
	};

	fs.writeFile('src/ts/generated/changelog.ts', JSON.stringify(json, null, 2), 'utf8', cb);
};

const sprites = () => Promise.resolve() // del(['tools/output/images/*'])
	.then(() => runAsync('node', ['src/scripts/tools/create-sprites.js']))
	.then(() => gulp.src('tools/output/images/*', { encoding: false })
		.pipe(gulpif(!argv.fast, imagemin()))
		.pipe(gulp.dest('assets/images')));

const changelog = cb => {
	const changelog = readFile('CHANGELOG.md');
	const tree = markdownTree(changelog);
	const object = config.nochangelog ? [] : tree.children.map(c => ({
		version: c.text,
		changes: c.tokens
			.map(t => t.text)
			.filter(x => x)
			.map(x => x.replace(/^\[test\]/, '<span class="badge badge-secondary">test</span>')),
	}));
	const type = `{ version: string; changes: string[]; }[]`;
	const code = `/* tslint:disable */\n\nexport const CHANGELOG: ${type} = ${JSON.stringify(object, null, 2)};\n`;
	fs.writeFile('src/ts/generated/changelog.ts', code, 'utf8', cb);
};

const icons = cb => {
	const fontPaths = [
		path.join('node_modules', '@fortawesome', 'free-solid-svg-icons'),
		path.join('node_modules', '@fortawesome', 'free-brands-svg-icons')
	];
	const parseIcon = pathString => {
		const faCode = fs.readFileSync(pathString, 'utf8');
		const exports = {};
		const fakeRequire = relative => {
			const splitPath = pathString.split(path.sep);
			splitPath.pop();
			const newPath = `${splitPath.join(path.sep)}${path.sep}${relative}.js`;
			return parseIcon(newPath);
		};
		const fn = new Function('exports', 'require', faCode);
		fn(exports, fakeRequire);
		return exports;
	};

	const getIconCode = src => JSON.stringify(parseIcon(`./${src}`).definition);
	const iconsTs = readFile('src/ts/client/icons.ts');
	const matched = _.uniq(iconsTs.match(/\bfa[A-Z]\S*\b/g));

	const icons = matched.map(m => {
		const iconPath = (e) => path.join(e, `${m}.js`);
		const paths = fontPaths.map(e => iconPath(e));
		const found = paths.find(e => fs.existsSync(e));
		if (!found) {
			console.log(paths.join('\n'));
			throw new Error(`Unable to find icon ${m}`);
		}
		const iconCode = getIconCode(found);

		return {
			name: m,
			code: iconCode
		};
	}).sort((a, b) => a.name.localeCompare(b.name));
	const code = `/* eslint-disable */\n\n${icons.map(({ name, code }) => `export const ${name} = ${code};`).join('\n')}`;
	fs.writeFile('src/ts/generated/fa-icons.ts', lintCode(code), 'utf8', cb);
};

const shaders = cb => {
	function getShaderCode(filePath) {
		return fs.readFileSync(filePath, 'utf8')
			.replace(/^\s*\n/gm, '').trim();
	}

	const dir = path.join('src', 'ts', 'graphics', 'shaders');
	const code = '/* tslint:disable */\n\n' + fs.readdirSync(dir)
		.map(file => [_.camelCase(file.replace(/\.glsl$/, '')), path.join(dir, file)])
		.map(([name, filePath]) => `export const ${name}Shader = \`${getShaderCode(filePath)}\`;`)
		.join('\n\n');
	fs.writeFile('src/ts/generated/shaders.ts', lintCode(code), 'utf8', cb);
};

const hash = cb => {
	const code = `export const HASH = '${HASH}';\nexport const STAMP = ${stamp};`;
	fs.writeFileSync('src/ts/generated/hash.ts', lintCode(code), 'utf8');
	fs.writeFile('src/ts/generated/hash.json', JSON.stringify({ hash: HASH, stamp }), 'utf8', cb);
};

const rollbar = cb => {
	const { environment, clientToken } = config.rollbar || {};
	const code = `export const ROLLBAR_ENV = '${environment}';\nexport const ROLLBAR_TOKEN = '${clientToken}';`;
	fs.writeFile('src/ts/generated/rollbarConfig.ts', lintCode(code), 'utf8', cb);
};

const assetsRev = cb => {
	const json = fs.readFileSync('build/rev-manifest.json', 'utf8');
	const data = _.mapValues(JSON.parse(json), value => value.replace(/^\S+-([a-f0-9]{10})\.\S+$/, '$1'));
	const code = `export const REV: { [key: string]: string; } = ${JSON.stringify(data, null, 4)};`;
	fs.writeFile('src/ts/generated/rev.ts', lintCode(code), 'utf8', cb);
};

const assetsCopy = () => gulp.src('assets/**/*', { encoding: false })
	.pipe(gulpif(!argv.fast, imagemin()))
	.pipe(rev())
	.pipe(gulp.dest('build/assets'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('build'));

function buildSass(name, src, dest) {
	const result = () => gulp.src([src], { base: 'src', encoding: false })
		.pipe(sass({
			includePaths: ['src/styles/'],
		}).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulpif(!development, cssnano({ discardComments: { removeAll: true } })))
		.pipe(gulpif(!development, rev()))
		.pipe(gulp.dest(dest));
	result.displayName = `sass (${name})`;
	return result;
}


const sassMain = buildSass('main', 'src/styles/style.scss', 'build/assets');
const sassInline = buildSass('inline', 'src/styles/style-inline.scss', 'build/assets');
const sassTools = buildSass('tools', 'src/styles/style-tools.scss', 'build/assets');
const sassAdmin = buildSass('admin', 'src/styles/style-admin.scss', 'build/assets-admin');
const sassTasks = gulp.series(sassMain, sassInline, sassTools, sassAdmin);

const testScripts = ['src/scripts/tests/**/*.js'];
const ts = npmScript('ts');

const tests = () => gulp.src(testScripts, { read: false })
	.pipe(mocha({
		exit: true,
		reporter: 'progress',
		timeout: 10000,
	}))
	.on('error', swallowError);

const coverage = () => gulp.src(testScripts, { read: false })
	.pipe(mocha({
		exit: true,
		reporter: 'progress',
		timeout: 10000,
		istanbul: {
			print: 'none',
		},
	}));

const remap = () => gulp.src('coverage/coverage.json')
	.pipe(remapIstanbul({ reports: { html: 'coverage-remapped' } }));

const size = () => gulp.src([
	'build/assets/*.js',
	'build/assets/scripts/*.js',
	'build/assets-admin/scripts/*.js',
	'build/assets/styles/*.css',
	'build/assets-admin/styles/*.css',
]).pipe(sizereport({ gzip: true, total: true }));

const music = () => gulp.src(path.join(config.assetsPath, 'assets/music/*.wav'), { read: false })
	.pipe(shell([
		'ffmpeg -y -i "<%= file.path %>" -acodec libmp3lame "<%= out(file.path, ".mp3") %>"',
		'ffmpeg -y -i "<%= file.path %>" -acodec libvorbis "<%= out(file.path, ".webm") %>"',
	], {
			templateData: {
				out: (file, ext) => path.join('assets', 'music', path.basename(file, '.wav') + ext),
			}
		}));

const serverDev = cb => {
	if (!argv.noserver) {
		const serverPath = path.join('src', 'scripts', 'server', 'server.js');
		const options = { env: { NODE_OPTIONS: '--inspect' } };
		const commonArgs = [serverPath, '--inspect', '--color', '--beta', '--admin'];
		const server = argv.adm ?
			liveServer([...commonArgs, '--adm'], options) :
			liveServer([...commonArgs, '--login', '--game', '--tools'], options);
		server.start();

		const restart = cb => {
			server.start();
			cb();
		};

		gulp.watch(['build/**/*.css']).on('change', path => server.notify({ path }));
		gulp.watch(['build/**/*.js']).on('change', path => server.notify({ path }));
		gulp.watch([
			'src/scripts/common/**/*.js',
			'src/scripts/generated/**/*.js',
			'src/scripts/graphics/**/*.js',
			'src/scripts/server/**/*.js',
			'views/index.pug',
		], { debounceDelay: 1000 }, restart);
	}

	cb();
};

const patchWebWorkerTask = cb => {
	const t = './dist/browser/sw.min.js';
	if (fs.existsSync(t)) {
		fs.renameSync(t, t.replace('.min', ''));
	}

	const a = './dist/browser/sw.min.js.map';
	if (fs.existsSync(a)) {
		fs.unlinkSync(a);
	}
	cb();
};

let webpackScript = 'webpack-prod';
const webpackArgs = ['--'];

if (argv.parallel) {
	webpackScript = 'webpack-prod-parallel';
}

if (argv.debug) {
	webpackScript = 'webpack-debug';
}

if (argv.main) {
	webpackScript = 'webpack-main';
}

if (argv.beta) {
	webpackArgs.push('--env.beta');
}

if (argv.timing) {
	webpackArgs.push('--env.timing');
}

const webpackProd = npmScript(webpackScript, webpackArgs);
const webpackAdmin = npmScript('webpack-admin');
const sw = npmScript('sw');

const assets = gulp.series(assetsCopy, assetsRev);
const common = gulp.series(manifest, hash, rollbar, changelog, icons, shaders, assets, sassTasks);
const covRemap = gulp.series(coverage, remap);

const watch = cb => {
	gulp.watch(['CHANGELOG.md'], changelog);
	gulp.watch(['src/ts/client/icons.ts'], icons);
	gulp.watch(['src/styles/**/*.scss'], sassTasks);
	gulp.watch(['src/ts/graphics/shaders/*.glsl'], shaders);

	if (argv.coverage || argv.tests) {
		gulp.watch(['src/scripts/**/*.js'], { debounceDelay: 1000 }, argv.coverage ? covRemap : tests);
	}

	cb();
};

const watchTools = cb => {
	if (argv.sprites) {
		// gulp.watch(['src/scripts/tools/**/*.js'], { debounceDelay: 1000 }, sprites);
		gulp.watch(['src/ts/tools/trigger.txt'], sprites);
		gulp.watch(['assets/**/*'], { debounceDelay: 1000, readDelay: 1000 }, assets);
		// gulp.watch([path.join(config.assetsPath, 'assets/**/*')], { debounceDelay: 1000, readDelay: 1000 }, sprites);
	}

	cb();
};

const watchTests = cb => {
	const task = argv.coverage ? covRemap : tests;
	gulp.watch(['src/scripts/**/*.js', 'src/tests/**/*.txt', 'src/tests/**/*.png'], { debounceDelay: 1000 }, task);
	cb();
};

const setProd = cb => {
	development = false;
	cb();
};

const empty = cb => cb();
const tsTools = gulp.series(npmScript('ts-tools'));
const spritesTask = argv.sprites ? sprites : empty;
const buildSprites = gulp.series(tsTools, sprites);

const build = gulp.series(clean, setProd, common, ts, webpackProd, sw, size);
const admin = gulp.series(clearAdmin, setProd, sassAdmin, ts, webpackAdmin);
const dev = gulp.series(clean, spritesTask, common, gulp.parallel(serverDev, watch, watchTools));

export {
	music,
	admin,
	build,
	dev,
	sprites,
	patchWebWorkerTask as patchWebWorker,
	tests as test
};
