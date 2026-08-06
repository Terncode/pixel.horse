import * as sprites from '../../generated/sprites';
import { tileWidth, tileHeight, WATER_FPS, WATER_HEIGHT } from '../constants';
import { EntityFlags } from '../interfaces';
import {
	mixMinimap, mixColliderRect, mixBobbing, mixInteract, mixAnimation, mixDrawShadow,
	mixPickable
} from '../mixins';
import { doodad, registerMix, decalOffset, mixCover, mixFlags, mixOrder, n } from './entitiesCore';
import { rect } from '../rect';

// boat

const boatMinimap = mixMinimap(0x725d3fff, rect(-3, -1, 6, 2));
const boatSailCollider = mixColliderRect(-5, -3, 11, 6);
const waterBobbing = mixBobbing(WATER_FPS, WATER_HEIGHT);

export const boat = doodad(n('boat'), sprites.boat, 95, 4, 0,
	boatMinimap,
	mixOrder(-1));

export const boatBob = doodad(n('boat-bob'), sprites.boat, 95, 18, 0,
	boatMinimap,
	waterBobbing,
	mixOrder(-1),
	mixFlags(EntityFlags.StaticY));

export const boatFrontBob = doodad(n('boat-front-bob'), sprites.boat_front, 71, 16, 0,
	boatMinimap,
	waterBobbing,
	mixFlags(EntityFlags.StaticY));

export const boatSail = doodad(n('boat-sail'), sprites.boat_sail, 77, 173, 0,
	mixCover(-8, -130, 70, 116),
	boatSailCollider);

export const rope = doodad(n('rope'), sprites.boat_rope, 5, 19, 0,
	mixPickable(31, 58));

export const ropeRack = doodad(n('rope-rack'), sprites.rope_rack, 11, 34, 0,
	mixInteract(-10, -31, 23, 31, 5),
	mixFlags(EntityFlags.StaticY));

export const boatRopeBob = doodad(n('boat-rope-bob'), sprites.boat_rope, 5, 19, 0,
	waterBobbing,
	mixFlags(EntityFlags.StaticY));

export const boatWake = registerMix(n('boat-wake'),
	mixAnimation(sprites.boat_wake, WATER_FPS, 93, 0, { useGameTime: true }),
	mixFlags(EntityFlags.StaticY));

export function fullBoat(x: number, y: number, sail = true) {
	const sailEntities = sail ? [
		boatSail(x - (12 / tileWidth), y + (16 / tileHeight)),
		boatRopeBob(x - (91 / tileWidth), y + (8 / tileHeight)),
	] : [];

	return [
		boatBob(x, y),
		boatFrontBob(x, y + (29 / tileHeight)),
		...sailEntities,
		boatWake(x, y + (5 / tileHeight)),
	];
}

// pier

export const pierLeg = registerMix(n('pier-leg'),
	mixAnimation(sprites.pier_leg, WATER_FPS, 10, -14),
	mixOrder(-2),
	mixFlags(EntityFlags.StaticY));

// planks

const plankMinimap = mixMinimap(0x9c6141ff, rect(-1, 0, 2, 1));
const plankFlags = mixFlags(EntityFlags.StaticY);
const plankShortMinimap = mixMinimap(0x9c6141ff, rect(0, 0, 1, 1));
const plankPal = 1;

export const plank1 = decalOffset(n('plank-1'), sprites.plank_1, 39, -2, plankPal, plankMinimap, plankFlags);
export const plank2 = decalOffset(n('plank-2'), sprites.plank_2, 39, -2, plankPal, plankMinimap, plankFlags);
export const plank3 = decalOffset(n('plank-3'), sprites.plank_3, 39, -2, plankPal, plankMinimap, plankFlags);
export const plank4 = decalOffset(n('plank-4'), sprites.plank_4, 39, -2, plankPal, plankMinimap, plankFlags);

export const planks = [plank1, plank2, plank3, plank4];

export const plankShort1 = decalOffset(
	n('plank-short-1'), sprites.plank_short_1, 21, -2, plankPal, plankShortMinimap, plankFlags);
export const plankShort2 = decalOffset(
	n('plank-short-2'), sprites.plank_short_2, 21, -2, plankPal, plankShortMinimap, plankFlags);
export const plankShort3 = decalOffset(
	n('plank-short-3'), sprites.plank_short_3, 21, -2, plankPal, plankShortMinimap, plankFlags);

export const planksShort = [plankShort1, plankShort2, plankShort3];

export const plankShadow = registerMix(n('plank-shadow'),
	mixDrawShadow(sprites.plank_shadow, 39, -12),
	mixFlags(EntityFlags.Decal | EntityFlags.StaticY),
	mixOrder(-1));

export const plankShadow2 = registerMix(n('plank-shadow-2'),
	mixDrawShadow(sprites.plank_shadow2, 39, -12),
	mixFlags(EntityFlags.Decal | EntityFlags.StaticY),
	mixOrder(-1));

export const plankShadowShort = registerMix(n('plank-shadow-short'),
	mixDrawShadow(sprites.plank_shadow_short, 21, -12),
	mixFlags(EntityFlags.Decal | EntityFlags.StaticY),
	mixOrder(-1));
