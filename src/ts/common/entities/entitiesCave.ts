import * as sprites from '../../generated/sprites';
import { PaletteRenderable, MixinEntity, EntityFlags } from '../interfaces';
import { rect } from '../rect';
import {
	mixDrawSeasonal, mixColliderRect, mixColliders, collider, taperColliderNE, taperColliderNW,
	triangleColliderNE, triangleColliderNW, mixMinimap, mixDraw, mixColliderRounded
} from '../mixins';
import { registerMix, doodad, mixFlags, mixOrder, n } from './entitiesCore';

// cave

const caveTall = true;
const caveCollider = mixColliderRect(-16, 0, 32, 24, caveTall);
const caveColliderTop = mixColliderRect(-16, 0, 32, 24, caveTall);
const caveColliderLeft = mixColliderRect(-18, 0, 24, 24, caveTall);
const caveColliderRight = mixColliderRect(-16, 0, 34, 24, caveTall);
const caveColliderTrimLeft = mixColliderRect(-16, 0, 16, 24, caveTall);
const caveColliderTrimRight = mixColliderRect(0, 0, 16, 24, caveTall);

const caveColor = 0x6a6f73ff;
const caveExtra = mixMinimap(caveColor, rect(-1, 0, 1, 1));

function caveOffset(name: string, sprite: PaletteRenderable, dx: number, dy: number, ...other: MixinEntity[]) {
	return registerMix(name,
		mixDrawSeasonal({
			summer: { sprite, dx, dy, palette: 0 },
			autumn: { palette: 1 },
			winter: { palette: 2 },
		}),
		mixFlags(EntityFlags.StaticY),
		...other);
}

function cave(name: string, sprite: PaletteRenderable, ...other: MixinEntity[]) {
	return caveOffset(name, sprite, Math.floor((sprite.color!.w + sprite.color!.ox) / 2), sprite.color!.oy,
		...other);
}

function caveDecal(name: string, sprite: PaletteRenderable, dx: number, dy: number, ...other: MixinEntity[]) {
	return caveOffset(name, sprite, dx, dy, mixFlags(EntityFlags.Decal),
		...other);
}

export const caveSW = cave(n('cave-sw'), sprites.cave_walls_sw,
	mixColliders(
		collider(-16, -3, 35, 24 * 2 + 7 + 25, caveTall),
		...taperColliderNE(-16, 22 + 24 * 2 + 7, 32, 24, caveTall),
	),
	mixMinimap(caveColor, rect(-1, 0, 1, 4)));

export const caveSE = cave(n('cave-se'), sprites.cave_walls_se,
	mixColliders(
		collider(-19, -3, 35, 24 * 2 + 7 + 25, caveTall),
		...taperColliderNW(-16, 22 + 24 * 2 + 7, 32, 24, caveTall),
	),
	mixMinimap(caveColor, rect(-1, 0, 1, 4)));

const caveSCollider = mixColliderRect(-16, -3, 32, 24 * 3 + 8, caveTall);

export const caveS1 = cave(n('cave-s1'), sprites.cave_walls_s1,
	caveSCollider,
	mixMinimap(caveColor, rect(-1, 0, 1, 3)));

export const caveS2 = cave(n('cave-s2'), sprites.cave_walls_s2,
	caveSCollider,
	mixMinimap(caveColor, rect(-1, 0, 1, 3)));

export const caveS3 = cave(n('cave-s3'), sprites.cave_walls_s3,
	caveSCollider,
	mixMinimap(caveColor, rect(-1, 0, 1, 3)));

export const caveSb = cave(n('cave-sb'), sprites.cave_walls_sb,
	caveSCollider,
	mixMinimap(caveColor, rect(-1, 0, 1, 3)));

const caveNWColliders = mixColliders(...triangleColliderNW(0, 0, 21, 24, caveTall));
const caveNEColliders = mixColliders(...triangleColliderNE(-22, 0, 21, 24, caveTall));

const caveColliderTrimLeftBot = mixColliders(
	collider(-16, 0, 16, 17, caveTall),
	...taperColliderNW(-16, 17, 16, 11, caveTall),
);

const caveColliderTrimRightBot = mixColliders(
	collider(0, 0, 16, 17, caveTall),
	...taperColliderNE(0, 17, 16, 11, caveTall),
);

export const caveTopNW = cave(n('cave-top-nw'), sprites.cave_walls_top_nw, caveNWColliders, caveExtra);
export const caveTopN = cave(n('cave-top-n'), sprites.cave_walls_top_n, caveColliderTop, caveExtra);
export const caveTopNE = cave(n('cave-top-ne'), sprites.cave_walls_top_ne, caveNEColliders, caveExtra);
export const caveTopW = caveOffset(n('cave-top-w'), sprites.cave_walls_top_w, 16, 0, caveColliderLeft, caveExtra);
export const caveTopE = cave(n('cave-top-e'), sprites.cave_walls_top_e, caveColliderRight, caveExtra);
export const caveTopSW = cave(n('cave-top-sw'), sprites.cave_walls_top_sw, caveCollider, caveExtra);
export const caveTopSE = cave(n('cave-top-se'), sprites.cave_walls_top_se, caveCollider, caveExtra);

export const caveTopS1 = cave(n('cave-top-s1'), sprites.cave_walls_top_s1, caveCollider, caveExtra);
export const caveTopS2 = cave(n('cave-top-s2'), sprites.cave_walls_top_s2, caveCollider, caveExtra);
export const caveTopS3 = cave(n('cave-top-s3'), sprites.cave_walls_top_s3, caveCollider, caveExtra);
export const caveTopSb = cave(n('cave-top-sb'), sprites.cave_walls_top_sb, caveCollider, caveExtra);

export const caveMidS1 = cave(n('cave-mid-s1'), sprites.cave_walls_mid_s1, caveCollider, caveExtra);
export const caveMidS2 = cave(n('cave-mid-s2'), sprites.cave_walls_mid_s2, caveCollider, caveExtra);
export const caveMidS3 = cave(n('cave-mid-s3'), sprites.cave_walls_mid_s3, caveCollider, caveExtra);
export const caveMidSb = cave(n('cave-mid-sb'), sprites.cave_walls_mid_sb, caveCollider, caveExtra);

export const caveMidSW1 = cave(n('cave-mid-sw1'), sprites.cave_walls_mid_sw1, caveCollider, caveExtra);
export const caveMidSE1 = cave(n('cave-mid-se1'), sprites.cave_walls_mid_se1, caveCollider, caveExtra);
export const caveMidSW2 = cave(n('cave-mid-sw2'), sprites.cave_walls_mid_sw2, caveCollider, caveExtra);
export const caveMidSE2 = cave(n('cave-mid-se2'), sprites.cave_walls_mid_se2, caveCollider, caveExtra);

export const caveBotS1 = cave(n('cave-bot-s1'), sprites.cave_walls_bot_s1, caveCollider, caveExtra);
export const caveBotS2 = cave(n('cave-bot-s2'), sprites.cave_walls_bot_s2, caveCollider, caveExtra);
export const caveBotS3 = cave(n('cave-bot-s3'), sprites.cave_walls_bot_s3, caveCollider, caveExtra);
export const caveBotSb = cave(n('cave-bot-sb'), sprites.cave_walls_bot_sb, caveCollider, caveExtra);

export const caveBotSW = cave(n('cave-bot-sw'), sprites.cave_walls_bot_sw, caveCollider, caveExtra);
export const caveBotSE = cave(n('cave-bot-se'), sprites.cave_walls_bot_se, caveCollider, caveExtra);

export const caveTopTrimLeft = caveDecal(
	n('cave-top-trim-left'), sprites.cave_walls_top_trim_left, 16, 0, caveColliderTrimRight, mixOrder(1));
export const caveMidTrimLeft = caveDecal(
	n('cave-mid-trim-left'), sprites.cave_walls_mid_trim_left, 16, 0, caveColliderTrimRight, mixOrder(1));
export const caveBotTrimLeft = caveDecal(
	n('cave-bot-trim-left'), sprites.cave_walls_bot_trim_left, 16, 0, caveColliderTrimRightBot, mixOrder(1));

export const caveTopTrimRight = caveDecal(
	n('cave-top-trim-right'), sprites.cave_walls_top_trim_right, 16, 0, caveColliderTrimLeft);
export const caveMidTrimRight = caveDecal(
	n('cave-mid-trim-right'), sprites.cave_walls_mid_trim_right, 16, 0, caveColliderTrimLeft);
export const caveBotTrimRight = caveDecal(
	n('cave-bot-trim-right'), sprites.cave_walls_bot_trim_right, 16, 0, caveColliderTrimLeftBot);

export const caveDecal1 = caveDecal(n('cave-decal-1'), sprites.cave_walls_decal_1, 14, 1, mixOrder(2));
export const caveDecal2 = caveDecal(n('cave-decal-2'), sprites.cave_walls_decal_2, 14, 1, mixOrder(2));
export const caveDecal3 = caveDecal(n('cave-decal-3'), sprites.cave_walls_decal_3, 16, -2, mixOrder(2));
export const caveDecalL = caveDecal(n('cave-decal-l'), sprites.cave_walls_decal_l, 15, 1, mixOrder(2));
export const caveDecalR = caveDecal(n('cave-decal-r'), sprites.cave_walls_decal_r, 16, 1, mixOrder(2));

export const caveFill = registerMix(n('cave-fill'),
	mixDraw(sprites.tile_none, 0, 0),
	mixColliderRect(0, 0, 32, 24, true, true),
	mixFlags(EntityFlags.StaticY));

export const caveCover = registerMix(n('cave-cover'),
	mixDraw(sprites.tile_none, 0, 24),
	mixFlags(EntityFlags.StaticY));

// stalactites

export const stalactite1 = doodad(n('stalactite-1'), sprites.stalactite_1, 4, 15, 0,
	mixColliderRounded(-4, -3, 8, 5, 2),
	mixFlags(EntityFlags.StaticY));

export const stalactite2 = doodad(n('stalactite-2'), sprites.stalactite_2, 5, 31, 0,
	mixColliderRounded(-5, -4, 10, 5, 2),
	mixFlags(EntityFlags.StaticY));

export const stalactite3 = doodad(n('stalactite-3'), sprites.stalactite_3, 6, 51, 0,
	mixColliderRounded(-6, -6, 12, 7, 3),
	mixFlags(EntityFlags.StaticY));
