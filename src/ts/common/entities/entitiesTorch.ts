import * as sprites from '../../generated/sprites';
import { PaletteRenderable, AnimatedRenderable, AnimatedRenderable1, EntityFlags } from '../interfaces';
import { mixAnimation, mixColliderRounded, mixLight } from '../mixins';
import { registerMix, doodad, mixFlags, mixOrder, n } from './entitiesCore';
import { repeat } from '../utils';

// torch

const torchCollider = mixColliderRounded(-2, -2, 4, 4, 1, false);
const torchDX = 4;
const torchDY = 34;
const torchSprites = sprites.torch2;
const torchAnimOff = [0];
const torchAnimOn = torchSprites.frames.map((_, i) => i).slice(1);

const torchUnlitSprite: PaletteRenderable = {
	color: torchSprites.frames[0],
	shadow: torchSprites.shadow,
	palettes: [torchSprites.palette],
};

const torchSpriteOn: AnimatedRenderable = {
	frames: torchSprites.frames.slice(1),
	shadow: torchSprites.shadow,
	palette: torchSprites.palette,
};

const torchLightSpriteOn: AnimatedRenderable1 = {
	frames: sprites.torch2_light.frames.slice(1),
};

export const torchOff = doodad(n('torch-off'), torchUnlitSprite, torchDX, torchDY, 0,
	torchCollider);

export const torchOn = registerMix(n('torch-on'),
	mixAnimation(torchSpriteOn, 8, torchDX, torchDY, { lightSprite: torchLightSpriteOn }),
	torchCollider,
	mixLight(0x926923ff, 0, 0, 440, 332)); // 0x924d23ff 0x917b32ff

export const torch = registerMix(n('torch'),
	mixAnimation(torchSprites, 8, torchDX, torchDY, {
		lightSprite: sprites.torch2_light,
		animations: [torchAnimOff, torchAnimOn],
	}),
	torchCollider,
	mixLight(0x926923ff, 0, 0, 440, 332),
	mixFlags(EntityFlags.OnOff));

export const poof = registerMix(n('poof'),
	mixAnimation({
		frames: [...sprites.poof.frames, sprites.emptySprite2],
		palette: sprites.poof.palette
	}, 12, 13, 30, { repeat: false }),
	mixOrder(100));

export const poof2 = registerMix(n('poof-2'),
	mixAnimation({
		frames: [...sprites.poof2.frames, sprites.emptySprite2],
		palette: sprites.poof2.palette
	}, 12, 50, 120, { repeat: false }),
	mixOrder(100));

export const splash = registerMix(n('splash'),
	mixAnimation({
		frames: [...sprites.splash.frames, sprites.emptySprite2],
		palette: sprites.splash.palette
	}, 20, 25, 22, { repeat: false }),
	mixOrder(50));

const boopSplashFrames = [
	...repeat(3, sprites.emptySprite2),
	...sprites.splash_boop.frames,
	sprites.emptySprite2,
];

const boopSlashFps = 20;
const boopSlashDX = 11;
const boopSlashDY = 55;

export const boopSplashRight = registerMix(n('boop-splash-right'),
	mixAnimation({
		frames: boopSplashFrames,
		palette: sprites.splash_boop.palette
	}, boopSlashFps, boopSlashDX, boopSlashDY, { repeat: false }),
	mixOrder(51));

export const boopSplashLeft = registerMix(n('boop-splash-left'),
	mixAnimation({
		frames: boopSplashFrames,
		palette: sprites.splash_boop.palette
	}, boopSlashFps, boopSlashDX, boopSlashDY, { repeat: false, flipped: true }),
	mixOrder(51));
