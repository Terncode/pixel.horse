import * as sprites from '../../generated/sprites';
import { EntityFlags, MixinEntity } from '../interfaces';
import {
	mixColliderRect, mixDrawSeasonal, mixPickable, mixDrawDirectionSign
} from '../mixins';
import { registerMix, doodad, decal, mixBounds, mixFlags, n } from './entitiesCore';
import { times } from '../utils';

// signs

const signCollider = mixColliderRect(-6, -1, 16, 2);
const signInteractive = mixFlags(EntityFlags.Interactive);
const signInteractRange: MixinEntity = base => base.interactRange = 5;
const signPickable = mixPickable(32, 62);
const signParts = [signCollider, signInteractive, signInteractRange, signPickable];

export const sign = registerMix(n('sign'),
	mixDrawSeasonal({
		summer: { sprite: sprites.sign_1, dx: 12, dy: 24, palette: 0 },
		winter: { sprite: sprites.sign_winter, dx: 12, dy: 24, palette: 0 },
	}),
	...signParts);

export const signQuest = doodad(n('sign-quest'), sprites.sign_2, 12, 24, 0, ...signParts);
export const signQuestion = doodad(n('sign-question'), sprites.sign_4, 12, 24, 0, ...signParts);
export const signDonate = doodad(n('sign-donate'), sprites.sign_3, 12, 24, 0, ...signParts);
export const signDebug = doodad(n('sign-debug'), sprites.sign_4, 12, 24, 0,
	...signParts,
	mixFlags(EntityFlags.Debug));

export const tile = decal(n('tile'), sprites.tile);

// direction signs

export const enum SignIcon {
	Spawn,
	Pumpkins,
	TownCenter,
	PineForest,
	Boat,
	Mountains,
	GiftPile,
	Forest,
	Lake,
	Bridge,
	Mines,
	Barrels,
	Fields,
	Carrots,
}

export const directionSign = registerMix(n('direction-sign'),
	mixDrawDirectionSign(),
	mixColliderRect(-10, -8, 20, 16),
	mixFlags(EntityFlags.Interactive),
	base => base.interactRange = 10);

export const directionSignLefts = times(5, i => registerMix(n(`direction-sign-left-${i}`),
	mixBounds(-10, -59 + i * 11, 14, 10)));

export const directionSignRights = times(5, i => registerMix(n(`direction-sign-right-${i}`),
	mixBounds(-4, -59 + i * 11, 14, 10)));

export const directionSignUpsLeft = times(5, i => registerMix(n(`direction-sign-up-left-${i}`),
	mixBounds(-6, -70 + i * 12, 6, 11)));

export const directionSignUpsRight = times(5, i => registerMix(n(`direction-sign-up-right-${i}`),
	mixBounds(1, -70 + i * 12, 5, 11)));

export const directionSignDownsLeft = times(5, i => registerMix(n(`direction-sign-down-left-${i}`),
	mixBounds(-6, -57 + i * 13, 7, 12)));

export const directionSignDownsRight = times(5, i => registerMix(n(`direction-sign-down-right-${i}`),
	mixBounds(0, -57 + i * 13, 5, 12)));
