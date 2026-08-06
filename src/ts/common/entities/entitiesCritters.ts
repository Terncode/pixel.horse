import * as sprites from '../../generated/sprites';
import { WHITE, CLOUD_SHADOW_COLOR } from '../colors';
import { EntityFlags, AnimatedRenderable, AnimatedRenderable1 } from '../interfaces';
import {
	mixAnimation, mixDrawSpider, mixDrawShadow, mixLight, mixLightSprite
} from '../mixins';
import { registerMix, mixFlags, n } from './entitiesCore';
import { repeat } from '../utils';
import { withAlphaFloat } from '../color';

// critters

export const butterfly = registerMix(n('butterfly'),
	mixAnimation(sprites.butterfly, 8, 5, 50),
	mixFlags(EntityFlags.Critter | EntityFlags.Movable | EntityFlags.StaticY));

export const firefly = registerMix(n('firefly'),
	mixAnimation(sprites.firefly, 24, 4, 44),
	mixLight(0x446a27ff, 0, 37, 128, 128), // 386a27, 83842a
	mixLightSprite(sprites.firefly_light, WHITE, 2, 40),
	mixFlags(EntityFlags.Critter | EntityFlags.Movable | EntityFlags.StaticY));

export const bat = registerMix(n('bat'),
	mixAnimation(sprites.bat, 8, 10, 65),
	mixFlags(EntityFlags.Critter | EntityFlags.Movable | EntityFlags.StaticY));

export const spider = registerMix(n('spider'),
	(base, options) => base.options = { height: 20, time: 0, ...options },
	mixDrawSpider(sprites.spider, 2, 2),
	mixFlags(EntityFlags.Critter));

// cat

sprites.cat.frames.push(sprites.emptySprite2);
sprites.cat_light.frames.push(sprites.emptySprite);

export const enum CatAnimation {
	Sit = 0,
	Enter = 1,
	Exit = 2,
	Blink = 3,
	Wag = 4,
}

const catSit = [9];
const catEnter = [0, 1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 9];
const catExit = [9, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 17];
const catBlink = [9, 10, 10, 9];
const catWag = [9, 11, 11, 12, 12, 13, 13, 14, 14, 14, 15, 15, 16, 16, 9];

export const cat = registerMix(n('cat'),
	mixAnimation(sprites.cat, 24, 17, 39, {
		repeat: false,
		animations: [catSit, catEnter, catExit, catBlink, catWag],
		lightSprite: sprites.cat_light,
	}),
	base => base.chatY = -5);

// bunny

export const enum BunnyAnimation {
	Sit = 0,
	Walk = 1,
	Blink = 2,
	Clean = 3,
	Look = 4,
}

const bunnySit = [7];
const bunnyWalk = [0, 1, 2, 3, 4, 5, 6];
const bunnyBlink = [7, 8, ...repeat(35, 7)];
const bunnyClean = [7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, ...repeat(30, 7)];
const bunnyLook = [7, 9, 25, 26, 27, 28, 29, 30, 31, 32, 33, 9, ...repeat(30, 7)];

export const bunny = registerMix(n('bunny'),
	mixAnimation(sprites.bunny, 14, 12, 23, {
		animations: [bunnySit, bunnyWalk, bunnyBlink, bunnyClean, bunnyLook],
	}),
	mixFlags(EntityFlags.Movable));

// eyes

const spritesEyes: AnimatedRenderable = {
	frames: [sprites.emptySprite2],
	palette: sprites.defaultPalette,
};

export const eyes = registerMix(n('eyes'),
	mixAnimation(spritesEyes, 24, 16, 8, {
		repeat: false,
		animations: [[9], [10]],
		lightSprite: sprites.cat_light,
	}));

// ghosts

const ghostSprite: AnimatedRenderable = {
	frames: [
		sprites.emptySprite2,
		...sprites.ghost1.frames,
	],
	palette: sprites.ghost1.palette,
};

const ghostHoovesSprite: AnimatedRenderable = {
	frames: [
		sprites.emptySprite2,
		...sprites.ghost1_hooves.frames,
		...repeat(17, sprites.emptySprite2),
	],
	palette: sprites.ghost1_hooves.palette,
};

const ghostLightSprite: AnimatedRenderable1 = {
	frames: [
		sprites.emptySprite,
		...sprites.ghost1_light.frames,
	],
};

const ghostHoovesLightSprite: AnimatedRenderable1 = {
	frames: [
		sprites.emptySprite,
		...sprites.ghost1_hooves_light.frames,
	],
};

const ghostFPS = 20;
const ghostDX = 28;
const ghostDYBase = 40;
const ghostDY = [ghostDYBase, ghostDYBase + 7]; // by tombstone
const ghostColor = withAlphaFloat(WHITE, 0.7);
const ghostLightColor = 0x777777ff;
const ghostNone = [0];
const ghostAnim1 = [
	0,
	1, 1,
	2, 2,
	3, 3,
	4, 4,
	5, 5,
	6, 6,
	7, 7,
	8, 8,
	...repeat(10, 9),
	10,
	...repeat(3, 11),
	12,
	...repeat(14, 13),
	14, 14,
	...repeat(10, 15),
	16,
	17,
	18,
	19,
	20,
	0,
];

const ghostAnim2 = [
	0,
	21, 21,
	22, 22,
	23, 23,
	24, 24,
	25, 25,
	...repeat(10, 26),
	27,
	28,
	...repeat(4, 29),
	30,
	31,
	32,
	...repeat(10, 33),
	34,
	35,
	36,
	37,
	0,
];

const ghostAnim3 = [
	0,
	38, 38,
	39, 39,
	40, 40,
	41, 41,
	42, 42,
	43, 43,
	44, 44,
	45, 45,
	46, 46,
	47, 47,
	48, 48,
	...repeat(10, 49),
	50,
	51, 51,
	52, 52,
	53, 53,
	54, 54,
	55, 55,
	56, 56,
	57, 57,
	58,
	59,
	60,
	61,
	62,
	63,
	64,
	65,
	66,
	67,
	0,
];

export const enum GhostAnimation {
	None = 0,
	Anim1 = 1,
	Anim2 = 2,
	Anim3 = 3,
}

const createGhost = (tomb: number) => {
	const anim = mixAnimation(ghostSprite, ghostFPS, ghostDX, ghostDY[tomb], {
		color: ghostColor,
		repeat: false,
		animations: [ghostNone, ghostAnim1, ghostAnim2, ghostAnim3],
		lightSprite: ghostLightSprite,
	});

	return registerMix(n(`ghost-${tomb + 1}`),
		anim,
		base => {
			base.order = -1;
			base.lightSpriteColor = ghostLightColor;
		});
};

const createGhostHooves = (tomb: number) => {
	const anim = mixAnimation(ghostHoovesSprite, ghostFPS, ghostDX, ghostDY[tomb], {
		color: ghostColor,
		repeat: false,
		animations: [ghostNone, ghostAnim1, ghostAnim2, ghostAnim3],
		lightSprite: ghostHoovesLightSprite,
	});

	return registerMix(n(`ghost-hooves-${tomb + 1}`),
		anim,
		base => {
			base.order = -1;
			base.lightSpriteColor = ghostLightColor;
		});
};

export const ghost1 = createGhost(0);
export const ghost2 = createGhost(1);
export const ghostHooves1 = createGhostHooves(0);
export const ghostHooves2 = createGhostHooves(1);

// clouds

const cloudSprite = sprites.cloud.shadow;

export const cloud = registerMix(n('cloud'),
	mixDrawShadow(sprites.cloud, Math.floor(cloudSprite.w / 2), cloudSprite.h, CLOUD_SHADOW_COLOR),
	mixFlags(EntityFlags.StaticY | EntityFlags.Decal | EntityFlags.Movable));
