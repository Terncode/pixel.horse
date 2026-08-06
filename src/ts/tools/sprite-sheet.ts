import * as fs from 'fs';
import * as path from 'path';
import { times } from 'lodash';
import { Sprite, Rect } from './types';
import { removeItem } from '../common/utils';
import { createExtCanvas, saveCanvas } from './canvas-utils';

interface ExtSprite extends Sprite {
	index?: number;
	layers?: number;
	duplicateOf?: ExtSprite;
	overlays?: ExtSprite[];
	overlayedOn?: ExtSprite;
	data?: ImageData;
}

function isIdenticalSprite(a: ExtSprite | undefined, b: ExtSprite | undefined): boolean {
	return !!(a && b && a.data && b.data && isIdenticalData(a.data, b.data));
}

function isIdenticalData(a: ImageData, b: ImageData) {
	if (a.width !== b.width || a.height !== b.height) {
		return false;
	}

	const length = (a.width * a.height * 4) | 0;
	const adat = a.data;
	const bdat = b.data;

	for (let i = 0; i < length; i = (i + 1) | 0) {
		if (adat[i] !== bdat[i]) {
			return false;
		}
	}

	return true;
}

function isIdenticalChannel(a: ExtSprite | undefined, b: ExtSprite | undefined, channel: number) {
	if (!a || !b || a.w !== b.w || a.h !== b.h) {
		return false;
	}

	const adata = a.data;
	const bdata = b.data;

	if (!adata || !bdata) {
		return false;
	}

	const length = (adata.width * adata.height * 4) | 0;
	const adat = adata.data;
	const bdat = bdata.data;

	for (let i = channel | 0; i < length; i = (i + 4) | 0) {
		if (adat[i] !== bdat[i]) {
			return false;
		}
	}

	return true;
}

function trimImageData(data: ImageData): Rect {
	const width = data.width | 0;
	const imageData = data.data;

	let top = 0;
	let left = 0;
	let right = data.width | 0;
	let bottom = data.height | 0;

	function isEmpty(x: number, y: number) {
		return imageData[((getIndex(x, y, width) << 2) + 3) | 0] === 0;
	}

	function isRowEmpty(y: number) {
		for (let x = left | 0; x < right; x = (x + 1) | 0) {
			if (!isEmpty(x | 0, y | 0)) {
				return false;
			}
		}

		return true;
	}

	function isColEmpty(x: number) {
		for (let y = top | 0; y < bottom; y = (y + 1) | 0) {
			if (!isEmpty(x | 0, y | 0)) {
				return false;
			}
		}

		return true;
	}

	while (bottom > top && isRowEmpty(bottom - 1)) {
		bottom--;
	}
	while (right > left && isColEmpty(right - 1)) {
		right--;
	}
	while (top < bottom && isRowEmpty(top)) {
		top++;
	}
	while (left < right && isColEmpty(left)) {
		left++;
	}

	return { y: top, x: left, w: right - left, h: bottom - top };
}

export function getSpriteRect(canvas: HTMLCanvasElement, x: number, y: number, w: number, h: number): Rect {
	const data = canvas.getContext('2d')!.getImageData(x, y, w, h);
	const rect = trimImageData(data);
	return { x: x + rect.x, y: y + rect.y, w: rect.w, h: rect.h };
}

export function imageToSprite(image: HTMLCanvasElement, index: number): ExtSprite {
	const { w, h, x, y } = getSpriteRect(image, 0, 0, image.width, image.height);
	return { image, index, w, h, x: 0, y: 0, ox: x, oy: y };
}

function getIndex(x: number, y: number, outputWidth: number) {
	return ((x | 0) + (((y | 0) * outputWidth) | 0)) | 0;
}

function isEmpty(x: number, y: number, w: number, h: number, outputWidth: number, lines: Line[][]) {
	outputWidth = outputWidth | 0;

	if (((x + w) | 0) > outputWidth || ((y + h) | 0) > outputWidth) {
		return false;
	}

	for (let iy = 0; iy < h; iy++) {
		const spans = lines[y + iy];
		let found = false;

		for (let i = 0; i < spans.length; i++) {
			const span = spans[i];

			if (span.start > x) { // spans are sorted and non-overlapping
				break;
			}

			if (x + w <= span.start + span.length) {
				found = true;
				break;
			}
		}

		if (!found) {
			return false;
		}
	}

	return true;
}

interface Line {
	start: number;
	length: number;
}

interface Taken {
	lines: Line[][];
}

function getFirstFree(outputWidth: number, width: number, height: number, { lines }: Taken) {
	const maxY = (outputWidth - height) | 0;

	for (let y = 0; y < maxY; y = (y + 1) | 0) {
		const spans = lines[y];

		for (let i = 0; i < spans.length; i++) {
			const span = spans[i];
			const start = span.start | 0;
			const end = (start + span.length - width) | 0;

			for (let x = start; x < end; x = (x + 1) | 0) {
				if (isEmpty(x, y, width, height, outputWidth, lines)) {
					return { x, y, layer: 0 };
				}
			}
		}
	}

	throw new Error(`Cannot find free space for (${width}, ${height}) [getFirstFree]`);
}

function getFirstFreePacked(outputWidth: number, width: number, height: number, takens: Taken[]) {
	const maxY = outputWidth - height;

	for (let layer = 0; layer < takens.length; layer = (layer + 1) | 0) {
		const { lines } = takens[layer];

		for (let y = 0; y < maxY; y = (y + 1) | 0) {
			const spans = lines[y];

			for (let i = 0; i < spans.length; i++) {
				const span = spans[i];
				const start = span.start | 0;
				const end = (start + span.length - width) | 0;

				for (let x = start | 0; x < end; x = (x + 1) | 0) {
					if (isEmpty(x, y, width, height, outputWidth, lines)) {
						return { x, y, layer };
					}
				}
			}
		}
	}

	throw new Error(`Cannot find free space for (${width}, ${height}) [getFirstFreePacked]`);
}

function positionSprite(sprite: ExtSprite, outputWidth: number, taken: Taken[], pack: boolean) {
	const layers = sprite.layers || 1;
	const { x, y, layer } = (pack && layers === 1) ?
		getFirstFreePacked(outputWidth, sprite.w, sprite.h, taken) :
		getFirstFree(outputWidth, sprite.w, sprite.h, taken[0]);

	sprite.x = x;
	sprite.y = y;
	sprite.layer = layer;

	const w = sprite.w;
	const right = x + w;

	for (let il = 0; il < layers; il++) {
		const { lines } = taken[il + layer];

		for (let iy = 0; iy < sprite.h; iy++) {
			const yy = y + iy;
			const spans = lines[yy];

			for (let i = 0; i < spans.length; i++) {
				const span = spans[i];
				const start = span.start;
				const length = span.length;
				const end = start + length;

				if (start >= right) { // right of span
					break;
				}

				if (end <= right) { // left of span
					continue;
				}

				if (start === x) {
					if (length === w) { // entire span
						spans.splice(i, 1);
					}
					else { // at the start of span
						span.start += w;
						span.length -= w;
					}
				}
				else {
					if (end === right) { // at the end of span
						span.length -= w;
					}
					else { // in the middle of span
						span.length = x - start;
						spans.splice(i + 1, 0, { start: right, length: end - right });
					}
				}
			}
		}
	}
}

function hasShading(s: ExtSprite) {
	const data = s.data;

	if (!data) {
		return false;
	}

	for (let y = 0; y < data.height; y++) {
		for (let x = 0; x < data.width; x++) {
			if (data.data[(x + y * data.width) * 4 + 1] !== 0xff) {
				return true;
			}
		}
	}

	return false;
}

function getSpriteImageData(s: ExtSprite): ImageData | undefined {
	if (!s.w || !s.h) {
		return undefined;
	}

	const context = s.image.getContext('2d')!;
	const { width, height, data } = context.getImageData(s.ox, s.oy, s.w, s.h);
	return { width, height, data } as ImageData;
}

function getDataHash(data: ImageData): number {
	const bytes = data.data;
	const length = bytes.length | 0;
	let hash = 0x811c9dc5;

	for (let i = 0; i < length; i++) {
		hash = Math.imul(hash ^ bytes[i], 0x01000193);
	}

	return hash >>> 0;
}

export function createSpriteSheet(name: string, images: ExtSprite[], log: boolean, size: number, bg?: string, pack = false) {
	const maxLayers = 4;
	const sprites = images.slice();

	let outputWidth = size;
	let maxY = 0;
	let areaTaken = 0;
	let deduplicated = 0;
	let layered = 0;
	let tooBig = sprites.find(s => s.w >= outputWidth);

	while (tooBig) {
		throw new Error(`Sprite too large (${tooBig.w}x${tooBig.h}) in ${name} (${size}x${size})`);
	}

	sprites
		.forEach(s => s.data = getSpriteImageData(s));

	const seen: Map<string, ExtSprite[]> = new Map();

	sprites
		.forEach(s => {
			if (s.w && s.h && s.data) {
				const key = `${s.w}x${s.h}|${getDataHash(s.data)}`;
				const candidates = seen.get(key);

				if (candidates) {
					const duplicate = candidates.find(c => isIdenticalSprite(c, s));

					if (duplicate) {
						s.duplicateOf = duplicate;
						deduplicated++;
					}
					else {
						candidates.push(s);
					}
				}
				else {
					seen.set(key, [s]);
				}
			}
		});

	sprites
		.filter(s => !s.duplicateOf && s.w && s.h)
		.forEach(s => {
			s.shade = !pack || hasShading(s);
			s.layers = s.shade ? 2 : 1;
		});

	if (pack) {
		sprites
			.filter(s => !s.duplicateOf && s.shade)
			.reduce((pool, sprite) => {
				const match = pool.find(d => isIdenticalChannel(sprite, d, 1));

				if (match) {
					match.overlays = match.overlays || [];
					match.overlays.push(sprite);
					sprite.layer = match.layers!;
					sprite.overlayedOn = match;
					match.layers = match.layers! + 1;

					if (match.layers >= maxLayers) {
						removeItem(pool, match);
					}

					layered++;
				}
				else {
					pool.push(sprite);
				}

				return pool;
			}, [] as ExtSprite[]);
	}

	sprites.sort((a, b) => ((b.layers || 1) - (a.layers || 1)) || ((b.h * 1024 + b.w) - (a.h * 1024 + a.w)));

	maxY = 0;
	areaTaken = 0;

	const taken: Taken[] = times(maxLayers, () => ({
		lines: times(outputWidth, () => [{ start: 0, length: outputWidth }]),
	}));

	sprites
		.filter(s => !s.duplicateOf && !s.overlayedOn)
		.forEach(s => {
			try {
				positionSprite(s, outputWidth, taken, pack);
				maxY = Math.max(maxY, s.y + s.h);
				areaTaken += s.w * s.h;
			}
			catch (e) {
				console.error(e);
			}
		});

	if (maxY > outputWidth) {
		throw new Error(`Exceeded sprite sheet size for ${name} (${size}x${size})`);
	}

	if (log) {
		const efficiency = (areaTaken * 100 / outputWidth / maxY).toFixed();

		console.log(
			`[sprites] [${name}] Packed ${sprites.length} sprites into ${outputWidth} x ${maxY} sheet, `
			+ `${efficiency}% efficiency, ${deduplicated} deduplicated, ${layered} layered`);
	}

	sprites
		.filter(s => s.overlayedOn)
		.forEach(s => {
			s.x = s.overlayedOn!.x;
			s.y = s.overlayedOn!.y;
		});

	sprites
		.filter(s => s.duplicateOf)
		.forEach(s => {
			s.x = s.duplicateOf!.x;
			s.y = s.duplicateOf!.y;
			s.layer = s.duplicateOf!.layer;
			s.shade = s.duplicateOf!.shade;
		});

	const image = createExtCanvas(outputWidth, outputWidth, 'sprite sheet image');
	const alpha = createExtCanvas(outputWidth, outputWidth, 'sprite sheet alpha');
	const context = image.getContext('2d')!;
	const alphaContext = alpha.getContext('2d')!;

	if (bg) {
		context.fillStyle = bg;
		context.fillRect(0, 0, outputWidth, outputWidth);
		alphaContext.fillStyle = bg;
		alphaContext.fillRect(0, 0, outputWidth, outputWidth);
	}

	if (pack) {
		const data = context.getImageData(0, 0, image.width, image.height);
		const alphaData = alphaContext.getImageData(0, 0, image.width, image.height);

		sprites
			.filter(s => !s.duplicateOf && s.w && s.h && s.data)
			.forEach(s => {
				if (s.layer === 3) {
					drawChannel(s.data!, alphaData, 0, 0, s.x, s.y, s.w, s.h);
				}
				else {
					drawChannel(s.data!, data, 0, s.layer || 0, s.x, s.y, s.w, s.h);
				}

				if (s.shade) {
					drawChannel(s.data!, data, 1, 1, s.x, s.y, s.w, s.h);
				}
			});

		context.putImageData(data, 0, 0);
		alphaContext.putImageData(alphaData, 0, 0);
	}
	else {
		sprites
			.filter(s => !s.duplicateOf && s.w && s.h)
			.forEach(s => context.drawImage(s.image, s.ox, s.oy, s.w, s.h, s.x, s.y, s.w, s.h));
	}

	const byIndex = new Map<number, ExtSprite>();

	sprites.forEach(s => {
		if (s.index != null) {
			byIndex.set(s.index, s);
		}
	});

	return {
		sprites: images.map((_, index) => byIndex.get(index) || null),
		image,
		alpha,
	};
}

function drawChannel(
	src: ImageData, dst: ImageData, srcChannel: number, dstChannel: number,
	dx: number, dy: number, w: number, h: number
) {
	const srcData = src.data;
	const srcWidth = src.width | 0;
	const dstWidth = dst.width | 0;

	for (let y = 0; y < h; y++) {
		const sOffset = ((y * srcWidth) * 4 + srcChannel) | 0;
		const dOffset = ((((y + dy) * dstWidth) + dx) * 4 + dstChannel) | 0;

		for (let x = 0; x < w; x++) {
			dst.data[dOffset + (x * 4) | 0] = srcData[sOffset + (x * 4) | 0];
		}
	}
}

export function saveSpriteSheet(filePath: string, canvas: HTMLCanvasElement) {
	saveCanvas(filePath, canvas);
	return path.basename(filePath);
}

export function saveSpriteSheetAsBinary(filePath: string, canvas: HTMLCanvasElement) {
	const context = canvas.getContext('2d')!;
	const data = context.getImageData(0, 0, canvas.width, canvas.height);
	fs.writeFileSync(filePath, Buffer.from(data.data.buffer));
}

export function saveCanvasAsRaw(filePath: string, canvas: HTMLCanvasElement) {
	const buffer = Buffer.alloc(4 + 4 + 4 + 4 * canvas.width * canvas.height);
	buffer.writeUInt8('R'.charCodeAt(0), 0);
	buffer.writeUInt8('A'.charCodeAt(0), 1);
	buffer.writeUInt8('W'.charCodeAt(0), 2);
	buffer.writeUInt8(' '.charCodeAt(0), 3);
	buffer.writeUInt32LE(canvas.width, 4);
	buffer.writeUInt32LE(canvas.height, 8);
	const data = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height);
	buffer.set(data.data, 12);
	fs.writeFileSync(filePath, buffer);
}
