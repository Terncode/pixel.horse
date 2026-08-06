import * as sprites from '../../generated/sprites';
import { WHITE } from '../colors';
import { EntityFlags } from '../interfaces';
import { mixPickable, mixColliderRect, mixLight, mixLightSprite } from '../mixins';
import { collectable, mixFlags, n } from './entitiesCore';

// jacko lanterns

const jackoLightColor = 0x80281eff;
const jackoLanternPickable = mixPickable(31, 52);
const jackLanternCollider = mixColliderRect(-5, -5, 10, 10, false);

export const jackoLanternOff = collectable(
	n('jacko-lantern-off'), sprites.jacko_lantern_off, 0, jackoLanternPickable, jackLanternCollider);

export const jackoLanternOn = collectable(
	n('jacko-lantern-on'), sprites.jacko_lantern_on, 0, jackoLanternPickable, jackLanternCollider,
	mixLight(jackoLightColor, 0, 0, 192, 144),
	mixLightSprite(sprites.jacko_lantern_light, WHITE, 6, 9));

export const jackoLantern = collectable(
	n('jacko-lantern'), sprites.jacko_lantern_on, 0, jackoLanternPickable, jackLanternCollider,
	mixLight(jackoLightColor, 0, 0, 192, 144),
	mixLightSprite(sprites.jacko_lantern_light, WHITE, 6, 9),
	mixFlags(EntityFlags.OnOff));
