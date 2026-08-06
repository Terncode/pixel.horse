import * as sprites from '../../generated/sprites';
import { mixInteract, mixPickable, mixColliderRect } from '../mixins';
import { decal, doodad, doodadSet, n } from './entitiesCore';

// flowers

export const flower1 = decal(n('flower-1'), sprites.flower_1);
export const flower2 = decal(n('flower-2'), sprites.flower_2);
export const flower3 = decal(n('flower-3'), sprites.flower_3);

export const flowerPatch1 = decal(n('flowers-1'), sprites.flower_patch1);
export const flowerPatch2 = decal(n('flowers-2'), sprites.flower_patch2);
export const flowerPatch3 = decal(n('flowers-3'), sprites.flower_patch3);
export const flowerPatch4 = decal(n('flowers-4'), sprites.flower_patch4);
export const flowerPatch5 = decal(n('flowers-5'), sprites.flower_patch5);
export const flowerPatch6 = decal(n('flowers-6'), sprites.flower_patch6);
export const flowerPatch7 = decal(n('flowers-7'), sprites.flower_patch7);

export const flower3Pickable = decal(n('flower-3-pickable'), sprites.flower_3, 0,
	mixInteract(-7, -3, 15, 15, 1.5));

export const flowerPick = decal(n('flower-pick'), sprites.flower_pick, 0,
	mixPickable(31, 39));

// clovers

export const clover1 = decal(n('clover-1'), sprites.clover_1);
export const clover2 = decal(n('clover-2'), sprites.clover_2);
export const clover3 = decal(n('clover-3'), sprites.clover_3);
export const clover4 = decal(n('clover-4'), sprites.clover_5);

export const fourLeafClover = decal(n('four-leaf-clover'), sprites.clover_4, 0,
	mixInteract(-7, -3, 15, 15, 1.5));

export const cloverPatch3 = decal(n('clovers-3'), sprites.clover_patch3);
export const cloverPatch4 = decal(n('clovers-4'), sprites.clover_patch4);
export const cloverPatch5 = decal(n('clovers-5'), sprites.clover_patch5);
export const cloverPatch6 = decal(n('clovers-6'), sprites.clover_patch6);
export const cloverPatch7 = decal(n('clovers-7'), sprites.clover_patch7);

export const cloverPick = doodad(n('clover-pick'), sprites.clover_mouth, 5, 0, 0,
	mixPickable(29, 39));

export const cloverPick2 = doodad(n('clover-pick-2'), sprites.clover_pick, 5, 0, 0,
	mixPickable(31, 39));

// autumn

export const leaves1 = decal(n('leaves-1'), sprites.leaves_1);
export const leaves2 = decal(n('leaves-2'), sprites.leaves_2);
export const leaves3 = decal(n('leaves-3'), sprites.leaves_3);
export const leaves4 = decal(n('leaves-4'), sprites.leaves_4);
export const leaves5 = decal(n('leaves-5'), sprites.leaves_5);

const smallLeafPileCollider = mixColliderRect(-12, -7, 25, 12);
const mediumLeafPileCollider = mixColliderRect(-16, -8, 34, 15);
const bigLeafPileCollider = mixColliderRect(-30, -13, 60, 24);

export const [leafpileSmallYellow, leafpileSmallOrange, leafpileSmallRed]
	= doodadSet(n('leafpile-small'), sprites.leafpile_small, 18, 16, smallLeafPileCollider);

export const [leafpileStickYellow, leafpileStickOrange, leafpileStickRed]
	= doodadSet(n('leafpile-stick'), sprites.leafpile_stick, 18, 16, smallLeafPileCollider);

export const [leafpileMediumYellow, leafpileMediumOrange, leafpileMediumRed]
	= doodadSet(n('leafpile-medium'), sprites.leafpile_medium, 35, 23, mediumLeafPileCollider);

export const [leafpileMediumAltYellow, leafpileMediumAltOrange, leafpileMediumAltRed]
	= doodadSet(n('leafpile-mediumalt'), sprites.leafpile_mediumalt, 35, 23, mediumLeafPileCollider);

export const [leafpileBigYellow, leafpileBigOrange, leafpileBigRed]
	= doodadSet(n('leafpile-big'), sprites.leafpile_big, 43, 34, bigLeafPileCollider);

export const [leafpileBigstickYellow, leafpileBigstickOrange, leafpileBigstickRed]
	= doodadSet(n('leafpile-bigstick'), sprites.leafpile_bigstick, 43, 34, bigLeafPileCollider);
