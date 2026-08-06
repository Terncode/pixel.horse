import * as sprites from '../../generated/sprites';
import { PaletteRenderable, EntityFlags } from '../interfaces';
import { mixDrawSeasonal, mixColliderRect, mixMinimap, mixPickable } from '../mixins';
import { doodad, registerMix, mixOrder, mixFlags, n } from './entitiesCore';
import { rect } from '../rect';

// stone wall (old)

export const stoneWallFull = doodad(n('stone-wall-full'), sprites.stone_wall_full, 38, 22, 0,
	mixColliderRect(-38, -4, 76, 6));

// stone wall

const stoneWallMinimapColor = 0x9b9977ff;

export const stoneWallPole1 = registerMix(n('stone-wall-pole-1'),
	mixDrawSeasonal({
		summer: { sprite: sprites.stone_wall_pole1, dx: 7, dy: 20, palette: 0 },
		winter: { sprite: sprites.stone_wall_winter_pole1, dx: 8, dy: 21, palette: 0 },
	}),
	mixColliderRect(-7, -6, 14, 12, false),
	mixMinimap(stoneWallMinimapColor, rect(0, 0, 1, 1)),
	mixOrder(1));

export const stoneWallBeamH1 = registerMix(n('stone-wall-beam-h-1'),
	mixDrawSeasonal({
		summer: { sprite: sprites.stone_wall_horizontal1, dx: 25, dy: 17, palette: 0 },
		winter: { sprite: sprites.stone_wall_winter_horizontal1, dx: 25, dy: 20, palette: 0 },
	}),
	mixColliderRect(-25, -6, 50, 12, false),
	mixMinimap(stoneWallMinimapColor, rect(0, 0, 2, 1)));

export const stoneWallBeamV1 = registerMix(n('stone-wall-beam-v-1'),
	mixDrawSeasonal({
		summer: { sprite: sprites.stone_wall_vertical1, dx: 5, dy: 8, palette: 0 },
		winter: { sprite: sprites.stone_wall_winter_vertical1, dx: 5, dy: 8, palette: 0 },
	}),
	mixColliderRect(-7, 0, 14, 48, false),
	mixMinimap(stoneWallMinimapColor, rect(0, 0, 1, 2)),
	mixOrder(2));

// wooden fence (modular)

const woodenFenceTall = false;
const woodenFenceMinimapColor = 0xac7146ff;
const woodenFenceMinimap = mixMinimap(woodenFenceMinimapColor, rect(0, 0, 1, 1));

function woodenFencePole(name: string, sprite: PaletteRenderable, spriteWinter: PaletteRenderable) {
	return registerMix(name,
		mixDrawSeasonal({
			summer: { sprite: sprite, dx: 4, dy: 25, palette: 0 },
			winter: { sprite: spriteWinter, dx: 4, dy: 26, palette: 0 },
		}),
		mixColliderRect(-4, -3, 8, 6, woodenFenceTall),
		woodenFenceMinimap,
		mixOrder(1));
}

function woodenFenceBeamH(name: string, sprite: PaletteRenderable, spriteWinter: PaletteRenderable) {
	return registerMix(name,
		mixDrawSeasonal({
			summer: { sprite: sprite, dx: 12, dy: 21, palette: 0 },
			winter: { sprite: spriteWinter, dx: 12, dy: 23, palette: 0 },
		}),
		mixColliderRect(-12, -3, 24, 6, woodenFenceTall),
		woodenFenceMinimap);
}

function woodenFenceBeamV(name: string, sprite: PaletteRenderable, spriteWinter: PaletteRenderable) {
	return registerMix(name,
		mixDrawSeasonal({
			summer: { sprite: sprite, dx: 2, dy: 18, palette: 0 },
			winter: { sprite: spriteWinter, dx: 2, dy: 18, palette: 0 },
		}),
		mixColliderRect(-4, 0, 8, 24, woodenFenceTall),
		woodenFenceMinimap,
		mixOrder(2));
}

export const spawnPole = doodad(n('spawn-pole'), sprites.wooden_fence_pole1, 4, 25, 1, mixFlags(EntityFlags.Debug));
export const routePole = doodad(n('route-pole'), sprites.route_pole, 2, 14, 1, mixFlags(EntityFlags.Debug));

export const woodenFencePole1 = woodenFencePole(n('wooden-fence-pole-1'),
	sprites.wooden_fence_pole1, sprites.wooden_fence_winter_pole1);
export const woodenFencePole2 = woodenFencePole(n('wooden-fence-pole-2'),
	sprites.wooden_fence_pole2, sprites.wooden_fence_winter_pole2);
export const woodenFencePole3 = woodenFencePole(n('wooden-fence-pole-3'),
	sprites.wooden_fence_pole3, sprites.wooden_fence_winter_pole3);
export const woodenFencePole4 = woodenFencePole(n('wooden-fence-pole-4'),
	sprites.wooden_fence_pole4, sprites.wooden_fence_winter_pole4);
export const woodenFencePole5 = woodenFencePole(n('wooden-fence-pole-5'),
	sprites.wooden_fence_pole5, sprites.wooden_fence_winter_pole5);

export const woodenFenceBeamH1 = woodenFenceBeamH(n('wooden-fence-beam-h-1'),
	sprites.wooden_fence_horizontal1, sprites.wooden_fence_winter_horizontal1);
export const woodenFenceBeamH2 = woodenFenceBeamH(n('wooden-fence-beam-h-2'),
	sprites.wooden_fence_horizontal2, sprites.wooden_fence_winter_horizontal2);
export const woodenFenceBeamH3 = woodenFenceBeamH(n('wooden-fence-beam-h-3'),
	sprites.wooden_fence_horizontal3, sprites.wooden_fence_winter_horizontal3);
export const woodenFenceBeamH4 = woodenFenceBeamH(n('wooden-fence-beam-h-4'),
	sprites.wooden_fence_horizontal4, sprites.wooden_fence_winter_horizontal4);
export const woodenFenceBeamH5 = woodenFenceBeamH(n('wooden-fence-beam-h-5'),
	sprites.wooden_fence_horizontal5, sprites.wooden_fence_winter_horizontal5);
export const woodenFenceBeamH6 = woodenFenceBeamH(n('wooden-fence-beam-h-6'),
	sprites.wooden_fence_horizontal6, sprites.wooden_fence_winter_horizontal6);

export const woodenFenceBeamV1 = woodenFenceBeamV(n('wooden-fence-beam-v-1'),
	sprites.wooden_fence_vertical1, sprites.wooden_fence_winter_vertical1);
export const woodenFenceBeamV2 = woodenFenceBeamV(n('wooden-fence-beam-v-2'),
	sprites.wooden_fence_vertical2, sprites.wooden_fence_winter_vertical2);
export const woodenFenceBeamV3 = woodenFenceBeamV(n('wooden-fence-beam-v-3'),
	sprites.wooden_fence_vertical3, sprites.wooden_fence_winter_vertical3);

// fence

export const fence1 = registerMix(n('fence-1'),
	mixDrawSeasonal({
		summer: { sprite: sprites.fence_1, dx: 40, dy: 25, palette: 0 },
		winter: { sprite: sprites.fence_winter_1, dx: 40, dy: 25, palette: 0 },
	}),
	mixColliderRect(-38, -2, 83, 4, false),
	mixMinimap(woodenFenceMinimapColor, rect(0, 0, 1, 1)),
	mixPickable(30, 62));

export const fence2 = registerMix(n('fence-2'),
	mixDrawSeasonal({
		summer: { sprite: sprites.fence_2, dx: 72, dy: 25, palette: 0 },
		winter: { sprite: sprites.fence_winter_2, dx: 72, dy: 25, palette: 0 },
	}),
	mixColliderRect(-70, -2, 148, 4, false),
	mixMinimap(woodenFenceMinimapColor, rect(0, 0, 2, 1)));

export const fence3 = registerMix(n('fence-3'),
	mixDrawSeasonal({
		summer: { sprite: sprites.fence_3, dx: 104, dy: 25, palette: 0 },
		winter: { sprite: sprites.fence_winter_3, dx: 104, dy: 25, palette: 0 },
	}),
	mixColliderRect(-102, -2, 204, 4, false),
	mixMinimap(woodenFenceMinimapColor, rect(0, 0, 3, 1)));
