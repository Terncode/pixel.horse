import * as sprites from '../../generated/sprites';
import { WHITE } from '../colors';
import { EntityFlags, AnimatedRenderable, AnimatedRenderable1 } from '../interfaces';
import {
	mixAnimation, mixLight, mixLightSprite, mixColliderRounded, mixColliderRect, mixPickable
} from '../mixins';
import { doodad, registerMix, mixFlags, n } from './entitiesCore';

const jackoLightColor = 0x80281eff;

// pumpkins

const pumpkinOffOnSprites: AnimatedRenderable = {frames: [sprites.pumpkin_off.color, sprites.pumpkin_on.color],
	palette: sprites.pumpkin_on.palettes![0],
	shadow: sprites.pumpkin_on.shadow};
const pumpkinLightSprite: AnimatedRenderable1 = {frames: [undefined, sprites.pumpkin_light]};
const pumpkinCollider = mixColliderRounded(-11, -6, 22, 12, 5, false);
const pumpkinPickable = mixPickable(26, 50);
const pumpkinParts = [pumpkinCollider, pumpkinPickable];
const pumpkinDX = 11;
const pumpkinDY = 15;
const pumpkinAnimOff = [0];
const pumpkinAnimOn = [1];

export const pumpkin = doodad(n('pumpkin'), sprites.pumpkin_default, pumpkinDX, pumpkinDY, 0,
	...pumpkinParts);

export const jackoOff = doodad(n('jacko-off'), sprites.pumpkin_off, pumpkinDX, pumpkinDY, 0,
	...pumpkinParts);

export const jackoOn = doodad(n('jacko-on'), sprites.pumpkin_on, pumpkinDX, pumpkinDY, 0,
	...pumpkinParts,
	mixLight(jackoLightColor, 0, 0, 256, 192),
	mixLightSprite(sprites.pumpkin_light, WHITE, pumpkinDX, pumpkinDY));

export const jacko = registerMix(n('jacko'),
	mixAnimation(pumpkinOffOnSprites, 8, pumpkinDX, pumpkinDY, {
		lightSprite: pumpkinLightSprite,
		animations: [pumpkinAnimOff, pumpkinAnimOn],
	}),
	...pumpkinParts,
	mixLight(jackoLightColor, 0, 0, 256, 192),
	mixFlags(EntityFlags.OnOff));

/*export const jacko = doodad(n('jacko'), sprites.pumpkin_on, pumpkinDX, pumpkinDY, 0,
	...pumpkinParts,
	mixLight(jackoLightColor, 0, 0, 256, 192),
	mixLightSprite(sprites.pumpkin_light, WHITE, pumpkinDX, pumpkinDY),
	mixFlags(EntityFlags.OnOff));*/

// tombstones

export const tombstone1 = doodad(n('tombstone-1'), sprites.tombstone_1, 14, 18, 0,
	mixColliderRect(-14, -4, 29, 9));

export const tombstone2 = doodad(n('tombstone-2'), sprites.tombstone_2, 11, 27, 0,
	mixColliderRect(-12, -3, 26, 6));
