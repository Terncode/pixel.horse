import * as sprites from '../../generated/sprites';
import { PaletteRenderable, MixinEntity, EntityFlags } from '../interfaces';
import { rect } from '../rect';
import {
	mixDrawSeasonal, mixColliderRect, mixColliders, collider, taperColliderSW, taperColliderNE,
	taperColliderSE, taperColliderNW, skewColliderNW, skewColliderNE, mixMinimap
} from '../mixins';
import { registerMix, mixFlags, mixOrder, n } from './entitiesCore';

// cliffs

const cliffTall = false;
const cliffCollider = mixColliderRect(-16, 0, 32, 24, cliffTall);
const cliffColliderTop = mixColliderRect(-16, 0, 32, 8, cliffTall);
const cliffColliderLeft = mixColliderRect(-18, 0, 6, 24, cliffTall);
const cliffColliderRight = mixColliderRect(12, 0, 6, 24, cliffTall);
const cliffColliderTrimLeft = mixColliderRect(-16, 0, 16, 24, cliffTall);
const cliffColliderTrimRight = mixColliderRect(0, 0, 16, 24, cliffTall);

const cliffColor = 0x908d7cff;
const cliffExtra = mixMinimap(cliffColor, rect(-1, 0, 1, 1));

function cliffOffset(name: string, sprite: PaletteRenderable, dx: number, dy: number, ...other: MixinEntity[]) {
	return registerMix(name,
		mixDrawSeasonal({
			summer: { sprite, dx, dy, palette: 0 },
			autumn: { palette: 1 },
			winter: { palette: 2 },
		}),
		mixFlags(EntityFlags.StaticY),
		...other);
}

function cliff(name: string, sprite: PaletteRenderable, ...other: MixinEntity[]) {
	return cliffOffset(name, sprite, Math.floor((sprite.color!.w + sprite.color!.ox) / 2), sprite.color!.oy,
		mixFlags(EntityFlags.StaticY),
		...other);
}

function cliffDecal(name: string, sprite: PaletteRenderable, dx: number, dy: number, ...other: MixinEntity[]) {
	return cliffOffset(name, sprite, dx, dy, mixFlags(EntityFlags.Decal),
		...other);
}

export const cliffSW = cliff(n('cliff-sw'), sprites.cliffs_grass_sw,
	mixColliders(
		...taperColliderSW(-16, -3, 32, 25, cliffTall),
		collider(-16, 22, 35, 24 * 2 + 7, cliffTall),
		...taperColliderNE(-16, 22 + 24 * 2 + 7, 32, 24, cliffTall),
	),
	mixMinimap(cliffColor, rect(-1, 0, 1, 4)));

export const cliffSE = cliff(n('cliff-se'), sprites.cliffs_grass_se,
	mixColliders(
		...taperColliderSE(-16, -3, 32, 25, cliffTall),
		collider(-19, 22, 35, 24 * 2 + 7, cliffTall),
		...taperColliderNW(-16, 22 + 24 * 2 + 7, 32, 24, cliffTall),
	),
	mixMinimap(cliffColor, rect(-1, 0, 1, 4)));

const cliffSCollider = mixColliderRect(-16, -3, 32, 24 * 3 + 8, cliffTall);

export const cliffS1 = cliff(n('cliff-s1'), sprites.cliffs_grass_s1,
	cliffSCollider,
	mixMinimap(cliffColor, rect(-1, 0, 1, 3)));

export const cliffS2 = cliff(n('cliff-s2'), sprites.cliffs_grass_s2,
	cliffSCollider,
	mixMinimap(cliffColor, rect(-1, 0, 1, 3)));

export const cliffS3 = cliff(n('cliff-s3'), sprites.cliffs_grass_s3,
	cliffSCollider,
	mixMinimap(cliffColor, rect(-1, 0, 1, 3)));

export const cliffSb = cliff(n('cliff-sb'), sprites.cliffs_grass_sb,
	cliffSCollider,
	mixMinimap(cliffColor, rect(-1, 0, 1, 3)));

export const cliffSbEntrance = cliff(n('cliff-sb-entrance'), sprites.cliffs_grass_sb,
	mixColliderRect(-16, -3, 32, 24 * 3, cliffTall),
	mixMinimap(cliffColor, rect(-1, 0, 1, 3)));

const cliffNWColliders = mixColliders(...skewColliderNW(0, 0, 21, 24, cliffTall));
const cliffNEColliders = mixColliders(...skewColliderNE(-22, 0, 21, 24, cliffTall));

const cliffColliderTrimLeftBot = mixColliders(
	collider(-16, 0, 16, 17, cliffTall),
	...taperColliderNW(-16, 17, 16, 11, cliffTall),
);

const cliffColliderTrimRightBot = mixColliders(
	collider(0, 0, 16, 17, cliffTall),
	...taperColliderNE(0, 17, 16, 11, cliffTall),
);

export const cliffTopNW = cliff(n('cliff-top-nw'), sprites.cliffs_grass_top_nw, cliffNWColliders, cliffExtra);
export const cliffTopN = cliff(n('cliff-top-n'), sprites.cliffs_grass_top_n, cliffColliderTop, cliffExtra);
export const cliffTopNE = cliff(n('cliff-top-ne'), sprites.cliffs_grass_top_ne, cliffNEColliders, cliffExtra);
export const cliffTopW = cliffOffset(n('cliff-top-w'), sprites.cliffs_grass_top_w, 16, 0, cliffColliderLeft, cliffExtra);
export const cliffTopE = cliff(n('cliff-top-e'), sprites.cliffs_grass_top_e, cliffColliderRight, cliffExtra);
export const cliffTopSW = cliff(n('cliff-top-sw'), sprites.cliffs_grass_top_sw, cliffCollider, cliffExtra);
export const cliffTopSE = cliff(n('cliff-top-se'), sprites.cliffs_grass_top_se, cliffCollider, cliffExtra);

export const cliffTopS1 = cliff(n('cliff-top-s1'), sprites.cliffs_grass_top_s1, cliffCollider, cliffExtra);
export const cliffTopS2 = cliff(n('cliff-top-s2'), sprites.cliffs_grass_top_s2, cliffCollider, cliffExtra);
export const cliffTopS3 = cliff(n('cliff-top-s3'), sprites.cliffs_grass_top_s3, cliffCollider, cliffExtra);
export const cliffTopSb = cliff(n('cliff-top-sb'), sprites.cliffs_grass_top_sb, cliffCollider, cliffExtra);

export const cliffMidS1 = cliff(n('cliff-mid-s1'), sprites.cliffs_grass_mid_s1, cliffCollider, cliffExtra);
export const cliffMidS2 = cliff(n('cliff-mid-s2'), sprites.cliffs_grass_mid_s2, cliffCollider, cliffExtra);
export const cliffMidS3 = cliff(n('cliff-mid-s3'), sprites.cliffs_grass_mid_s3, cliffCollider, cliffExtra);
export const cliffMidSb = cliff(n('cliff-mid-sb'), sprites.cliffs_grass_mid_sb, cliffCollider, cliffExtra);

export const cliffMidSW1 = cliff(n('cliff-mid-sw1'), sprites.cliffs_grass_mid_sw1, cliffCollider, cliffExtra);
export const cliffMidSE1 = cliff(n('cliff-mid-se1'), sprites.cliffs_grass_mid_se1, cliffCollider, cliffExtra);
export const cliffMidSW2 = cliff(n('cliff-mid-sw2'), sprites.cliffs_grass_mid_sw2, cliffCollider, cliffExtra);
export const cliffMidSE2 = cliff(n('cliff-mid-se2'), sprites.cliffs_grass_mid_se2, cliffCollider, cliffExtra);

export const cliffBotS1 = cliff(n('cliff-bot-s1'), sprites.cliffs_grass_bot_s1, cliffCollider, cliffExtra);
export const cliffBotS2 = cliff(n('cliff-bot-s2'), sprites.cliffs_grass_bot_s2, cliffCollider, cliffExtra);
export const cliffBotS3 = cliff(n('cliff-bot-s3'), sprites.cliffs_grass_bot_s3, cliffCollider, cliffExtra);
export const cliffBotSb = cliff(n('cliff-bot-sb'), sprites.cliffs_grass_bot_sb, cliffCollider, cliffExtra);

export const cliffBotSW = cliff(n('cliff-bot-sw'), sprites.cliffs_grass_bot_sw, cliffCollider, cliffExtra);
export const cliffBotSE = cliff(n('cliff-bot-se'), sprites.cliffs_grass_bot_se, cliffCollider, cliffExtra);

export const cliffTopTrimLeft = cliffDecal(
	n('cliff-top-trim-left'), sprites.cliffs_grass_top_trim_left, 16, 0, cliffColliderTrimRight, mixOrder(1));
export const cliffMidTrimLeft = cliffDecal(
	n('cliff-mid-trim-left'), sprites.cliffs_grass_mid_trim_left, 16, 0, cliffColliderTrimRight, mixOrder(1));
export const cliffBotTrimLeft = cliffDecal(
	n('cliff-bot-trim-left'), sprites.cliffs_grass_bot_trim_left, 16, 0, cliffColliderTrimRightBot, mixOrder(1));

export const cliffTopTrimRight = cliffDecal(
	n('cliff-top-trim-right'), sprites.cliffs_grass_top_trim_right, 16, 0, cliffColliderTrimLeft);
export const cliffMidTrimRight = cliffDecal(
	n('cliff-mid-trim-right'), sprites.cliffs_grass_mid_trim_right, 16, 0, cliffColliderTrimLeft);
export const cliffBotTrimRight = cliffDecal(
	n('cliff-bot-trim-right'), sprites.cliffs_grass_bot_trim_right, 16, 0, cliffColliderTrimLeftBot);

export const cliffDecal1 = cliffDecal(n('cliff-decal-1'), sprites.cliffs_grass_decal_1, 14, 1, mixOrder(2));
export const cliffDecal2 = cliffDecal(n('cliff-decal-2'), sprites.cliffs_grass_decal_2, 14, 1, mixOrder(2));
export const cliffDecal3 = cliffDecal(n('cliff-decal-3'), sprites.cliffs_grass_decal_3, 16, -2, mixOrder(2));
export const cliffDecalL = cliffDecal(n('cliff-decal-l'), sprites.cliffs_grass_decal_l, 15, 1, mixOrder(2));
export const cliffDecalR = cliffDecal(n('cliff-decal-r'), sprites.cliffs_grass_decal_r, 16, 1, mixOrder(2));
