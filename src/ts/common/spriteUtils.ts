import { ColorExtra, ColorExtraSets, PonyEye, Sprite } from './interfaces';

export function createSprite(x: number, y: number, w: number, h: number, ox: number, oy: number, type: number): Sprite {
	return { x, y, w, h, ox, oy, type };
}

export function addTitles(sprites: ColorExtraSets, titles: string[]): ColorExtraSets {
	return sprites && sprites.map((ns, i) =>
		ns && ns.map(s => s && { color: s.color, colors: s.colors, title: titles[i], label: titles[i] }));
}

export function addLabels(sprites: ColorExtraSets, labels: string[]) {
	sprites && sprites.forEach((s, i) => s && s[0] ? s[0]!.label = labels[i] : undefined);
	return sprites;
}

export function createEyeSprite(eye: PonyEye | undefined, iris: number, defaultPalette: Uint32Array): ColorExtra | undefined {
	return eye && { color: eye.irises[iris]!, colors: 2, extra: eye.base, palettes: [defaultPalette] };
}

export function getColorCount(sprite: ColorExtra | undefined): number {
	return sprite && sprite.colors ? Math.floor((sprite.colors - 1) / 2) : 0;
}
