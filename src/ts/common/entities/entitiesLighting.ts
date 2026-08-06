import * as sprites from '../../generated/sprites';
import { AnimatedRenderable1 } from '../interfaces';
import { mixAnimation, mixLight, mixPickable, mixColliderRounded } from '../mixins';
import { registerMix, n } from './entitiesCore';

// lanterns

const lanternLightSprite: AnimatedRenderable1 = {
	frames: sprites.lantern_light.frames,
};

const lanternPickable = mixPickable(31, 53);
const lanternCollider = mixColliderRounded(-5, -5, 10, 10, 2, false);

export const lanternOn = registerMix(n('lantern-on'),
	mixAnimation(sprites.lantern, 12, 4, 13, { lightSprite: lanternLightSprite }),
	mixLight(0x916a32ff, 0, 0, 384, 288),
	lanternPickable,
	lanternCollider);

export const lanternOnWall = registerMix(n('lantern-on-wall'),
	mixAnimation(sprites.lantern, 12, 4, 13 + 24, { lightSprite: lanternLightSprite }),
	mixLight(0x916a32ff, 0, 0, 384, 288));

export const lanternOnTable = registerMix(n('lantern-on-table'),
	mixAnimation(sprites.lantern, 12, 4, 13 + 14, { lightSprite: lanternLightSprite }),
	mixLight(0x916a32ff, 0, 0, 384, 288));
