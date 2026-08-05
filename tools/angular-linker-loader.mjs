import { transformAsync } from '@babel/core';
import linkerPlugin from '@angular/compiler-cli/linker/babel';
import { needsLinking } from '@angular/compiler-cli/linker';

export default function angularLinkerLoader(content, map) {
	const callback = this.async();
	(async () => {
		try {
			const filename = this.resourcePath;
			if (!needsLinking(filename, content)) {
				callback(null, content, map);
				return;
			}
			// Create a fresh plugin instance per file. The linker plugin is stateful
			// and cannot be shared across concurrent transforms.
			const { code, map: resultMap } = await transformAsync(content, {
				filename,
				sourceFileName: filename,
				sourceMaps: !!this.sourceMap,
				compact: false,
				plugins: [api => linkerPlugin(api, { sourceMapping: false })],
			});
			callback(null, code, resultMap || undefined);
		} catch (err) {
			callback(err);
		}
	})();
}
