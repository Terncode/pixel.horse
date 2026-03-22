import { noop, once } from "lodash";
import { getUrl } from "./rev";
import { spriteSheets } from "../generated/sprites";
import { createCanvas, loadImage } from "../common/canvasUtils";
import { createFonts } from "../common/fonts";
import { SpriteSheet } from "../common/interfaces";

export function createSpriteUtils() {
	createFonts();
}

type LoadImage = (src: string) => Promise<HTMLImageElement | ImageBitmap>;

function getImageData(img: HTMLImageElement | ImageBitmap) {
	const canvas = createCanvas(img.width, img.height);
	const context = canvas.getContext('2d')!;
	context.drawImage(img, 0, 0);
	return context.getImageData(0, 0, img.width, img.height);
}

function loadSpriteSheet(sheet: SpriteSheet, loadImage: LoadImage) {
	return Promise.all([
		loadImage(sheet.src!),
		sheet.srcA ? loadImage(sheet.srcA) : Promise.resolve(undefined)
	])
		.then(([img, imgA]) => {
			sheet.data = getImageData(img!);

			if (imgA) {
				const alpha = getImageData(imgA);
				const alphaData = alpha.data;
				const sheedData = sheet.data.data;

				for (let i = 0; i < sheedData.length; i += 4) {
					sheedData[i + 3] = alphaData[i];
				}
			}
		});
}

export function loadSpriteSheets(sheets: SpriteSheet[], loadImage: LoadImage) {
	return Promise.all(sheets.map(s => loadSpriteSheet(s, loadImage))).then(noop);
}

export let spriteSheetsLoaded = false;

export function loadAndInitSheets(sheets: SpriteSheet[], loadImage: LoadImage) {
	return loadSpriteSheets(sheets, loadImage)
		.then(createSpriteUtils)
		.then(() => true)
		.catch(e => (console.error(e), false))
		.then(loaded => spriteSheetsLoaded = loaded);
}

export function loadImageFromUrl(url: string) {
	return loadImage(getUrl(url));
}

export const loadAndInitSpriteSheets = once(() => loadAndInitSheets(spriteSheets, loadImageFromUrl));
