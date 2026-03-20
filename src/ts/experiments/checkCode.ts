import * as path from 'path';
import * as fs from 'fs';

const lookForClient = ['common', 'client' , 'graphics', 'components'];
const lookForServer = ['common', 'server' , 'graphics', 'components'];
const ignores = [['common', 'encoders']].map(l => path.join(...l));

const base = ['src', 'ts'];

const clientChecks = lookForClient.map(e => path.join(process.cwd(), ...base, e));
const serverChecks = lookForServer.map(e => path.join(process.cwd(), ...base, e));
let issues = 0;
let checked = 0;

function processDir(pathStr: string, client = false) {
	const files = fs.readdirSync(pathStr, { withFileTypes: true });
	for (const file of files) {
		const filePath = path.join(pathStr, file.name);
		if (ignores.some(n => filePath.includes(n))) {
			continue;
		}

		if (file.isDirectory()) {
			processDir(filePath);
		} else if (file.isFile()) {
			if (file.name.endsWith('.ts')) {
				const lines = fs.readFileSync(filePath, 'utf-8').split('\n').map(l => l.trim());
				checked++;
				const filter = lines.filter(l => client ?  /.*import.*from.*['"`].*\/client\/.*['"`]/.test(l) : /.*import.*from.*['"`].*\/server\/.*['"`]/.test(l));
				if (filter.length) {
					issues++;
					console.warn('='.repeat(16));
					console.log(filePath);
					for (const line of filter) {
						console.log(`  ${lines.indexOf(line) + 1}| ${line}`);
					}
					console.warn('='.repeat(16));
				}
			}
		} else {
			console.log(`File not supported ${pathStr}`);
		}
	}
}

function main() {
	for (const check of clientChecks) {
		processDir(check, true);
	}
	for (const check of serverChecks) {
		processDir(check, true);
	}
	if (issues) {
		console.log(`Found ${issues} issues in ${checked} files`);
	} else {
		console.log(`Checked ${checked} files no issues have been found`);
	}
}


main();
