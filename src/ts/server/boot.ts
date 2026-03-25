/// <reference path="../../typings/my.d.ts" />

require('source-map-support').install();

import 'core-js/stable/promise/finally';
import 'reflect-metadata';
import * as Bluebird from 'bluebird';
import * as fs from 'fs';
import * as yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = (yargs as any)(hideBin(process.argv))
	.option('beta', {
		type: 'boolean',
		default: false
	})
	.option('tools', {
		type: 'boolean',
		default: false
	})
	.parseSync();


(global as any).DEVELOPMENT = process.env.NODE_ENV !== 'production';
(global as any).BETA = !!argv.beta;
(global as any).TOOLS = !!argv.tools;
(global as any).SERVER = true;
(global as any).TIMING = false;
(global as any).TESTS = false;
(global as any).performance = Date;

Bluebird.promisifyAll(fs);
