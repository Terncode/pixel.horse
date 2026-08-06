import { compact } from 'lodash';
import * as sprites from '../../generated/sprites';
import { ColorShadow, PaletteRenderable, Rect, ServerFlags, MixinEntity, CreateEntityMethod, Entity } from '../interfaces';
import { tileWidth, tileHeight } from '../constants';
import { WHITE } from '../colors';
import { mixDrawSeasonal, mixColliderRounded, mixMinimap, mixLightSprite, mixLight } from '../mixins';
import { times, flatten } from '../utils';
import { rect } from '../rect';
import { registerMix, doodad, mixCover, mixServerFlags, mixOrder, n } from './entitiesCore';
import { spider } from './entitiesCritters';

// trees

const stumpsTall = false;
const treeAutumnPals = [2, 3, 4];

export const web = doodad(n('web'), sprites.web, -6, 39, 0,
	mixCover(-50, -135, 110, 120));

export const xmasLights = registerMix(n('xmas-lights'), mixLightSprite(sprites.light6, WHITE, 75, 180));
export const xmasLight = registerMix(n('xmas-light'), mixLight(0x926923ff, 0, 0, 50, 50));

const tree1Options = { sprite: sprites.tree_1, dx: 5, dy: 9 };
const tree2Options = { sprite: sprites.tree_2, dx: 10, dy: 32 };
const tree3Options = { sprite: sprites.tree_3, dx: 21, dy: 59 };

export const trees1 = times(3, i => registerMix(n(`tree1-${i}`),
	mixDrawSeasonal({
		summer: { ...tree1Options, palette: 0 },
		autumn: { ...tree1Options, palette: treeAutumnPals[i] },
		winter: { ...tree1Options, palette: 1 },
	})));

export const trees2 = times(3, i => registerMix(n(`tree2-${i}`),
	mixDrawSeasonal({
		summer: { ...tree2Options, palette: 0 },
		autumn: { ...tree2Options, palette: treeAutumnPals[i] },
		winter: { ...tree2Options, palette: 1 },
	})));

export const trees3 = times(3, i => registerMix(n(`tree3-${i}`),
	mixDrawSeasonal({
		summer: { ...tree3Options, palette: 0 },
		autumn: { ...tree3Options, palette: treeAutumnPals[i] },
		winter: { ...tree3Options, palette: 1 },
	}),
	mixColliderRounded(-3, -2, 6, 4, 1)));

export const tree1 = trees1[0];
export const tree2 = trees2[0];
export const tree3 = trees3[0];

export const [tree4] = createTree(n('tree4'), 31, 92, 12, {
	stumpCollider: mixColliderRounded(-5, -1, 12, 6, 1, stumpsTall),
	trunkCollider: mixColliderRounded(-5, -1, 12, 6, 1),
	cover: rect(-20, -77, 42, 60),
	variants: times(3, i =>
		({
			stump: sprites.tree_4Stump0,
			trunk: sprites.tree_4Trunk0,
			crown: sprites.tree_4Crown0_0,
			palette: 0,
			paletteAutumn: treeAutumnPals[i],
			paletteWinter: 1,
		})),
});

export const [tree5, [tree5Stump]] = createTree(n('tree5'), 43, 128, 24, {
	stumpCollider: mixColliderRounded(-8, -2, 16, 8, 2, stumpsTall),
	trunkCollider: mixColliderRounded(-8, -2, 16, 8, 2),
	cover: rect(-30, -106, 64, 80),
	variants: times(3, i =>
		({
			stump: sprites.tree_5Stump0,
			trunk: sprites.tree_5Trunk0,
			crown: sprites.tree_5Crown0_0,
			palette: 0,
			paletteAutumn: treeAutumnPals[i],
			paletteWinter: 1,
		})),
});

export const [tree, [treeStump1, treeStump2]] = createTree(n('tree'), 80, 162, 30, {
	stumpCollider: mixColliderRounded(-16, -1, 32, 12, 4, stumpsTall),
	trunkCollider: mixColliderRounded(-16, -1, 32, 12, 4),
	cover: rect(-50, -135, 110, 120),
	variants: flatten(times(3, i => [
		{
			stump: sprites.tree_6Stump0,
			stumpWinter: sprites.tree_6StumpWinter0,
			trunk: sprites.tree_6Trunk0,
			crown: sprites.tree_6Crown0_0,
			webX: 0, webY: 0, spiderHeight: 19,
			palette: 0, paletteWinter: 1, paletteAutumn: treeAutumnPals[i],
		},
		{
			stump: sprites.tree_6Stump1,
			stumpWinter: sprites.tree_6StumpWinter1,
			trunk: sprites.tree_6Trunk1,
			crown: sprites.tree_6Crown0_1,
			webX: -2, webY: 0, spiderHeight: 19,
			palette: 0, paletteWinter: 1, paletteAutumn: treeAutumnPals[i],
		},
		{
			stump: sprites.tree_6Stump0,
			stumpWinter: sprites.tree_6StumpWinter0,
			trunk: sprites.tree_6Trunk0,
			crown: sprites.tree_6Crown1_0,
			webX: 0, webY: -4, spiderHeight: 27,
			palette: 0, paletteWinter: 1, paletteAutumn: treeAutumnPals[i],
		},
		{
			stump: sprites.tree_6Stump1,
			stumpWinter: sprites.tree_6StumpWinter1,
			trunk: sprites.tree_6Trunk1,
			crown: sprites.tree_6Crown1_1,
			webX: -2, webY: -4, spiderHeight: 27,
			palette: 0, paletteWinter: 1, paletteAutumn: treeAutumnPals[i],
		},
	]))
});

const pine1Options = { sprite: sprites.pine_1, dx: 7, dy: 18 };
const pine2Options = { sprite: sprites.pine_2, dx: 10, dy: 35 };

export const pine1 = registerMix(n('pine1'),
	mixDrawSeasonal({
		summer: { ...pine1Options, palette: 0 },
		autumn: { ...pine1Options, palette: 1 },
		winter: { ...pine1Options, palette: 2 },
	}));

export const pine2 = registerMix(n('pine2'),
	mixDrawSeasonal({
		summer: { ...pine2Options, palette: 0 },
		autumn: { ...pine2Options, palette: 1 },
		winter: { ...pine2Options, palette: 2 },
	}),
	mixColliderRounded(-3, -2, 6, 4, 1));

export const [pine3] = createTree(n('pine3'), 25, 68, 2, {
	stumpCollider: mixColliderRounded(-5, -1, 12, 6, 1, stumpsTall),
	trunkCollider: mixColliderRounded(-5, -1, 12, 6, 1),
	crownCollider: mixColliderRounded(-14, -6, 29, 12, 4),
	cover: rect(-17, -41, 35, 40),
	variants: [
		{ stump: sprites.pine_3Stump0, crown: sprites.pine_3Crown0_0, palette: 0, paletteAutumn: 1, paletteWinter: 2 },
	]
});

export const [pine4] = createTree(n('pine4'), 41, 95, 8, {
	stumpCollider: mixColliderRounded(-5, 4, 11, 6, 1, stumpsTall),
	trunkCollider: mixColliderRounded(-5, 4, 11, 6, 1),
	crownCollider: mixColliderRounded(-23, -8, 46, 20, 6),
	cover: rect(-23, -68, 46, 70),
	variants: [
		{ stump: sprites.pine_4Stump0, crown: sprites.pine_4Crown0_0, palette: 0, paletteAutumn: 1, paletteWinter: 2 },
	]
});

export const [pine5] = createTree(n('pine5'), 53, 136, 5, {
	stumpCollider: mixColliderRounded(-8, -3, 18, 10, 4, stumpsTall),
	trunkCollider: mixColliderRounded(-8, -3, 18, 10, 4),
	crownCollider: mixColliderRounded(-29, -12, 60, 25, 6),
	cover: rect(-38, -95, 80, 100),
	variants: [
		{ stump: sprites.pine_5Stump0, crown: sprites.pine_5Crown0_0, palette: 0, paletteAutumn: 1, paletteWinter: 2 },
	]
});

const xmasCrown: ColorShadow = {
	color: sprites.christmastree.color,
	shadow: sprites.pine_6Crown0_0.shadow,
	palettes: sprites.christmastree.palettes,
};

export const [pine] = createTree(n('pine'), 75, 180, 17, {
	stumpCollider: mixColliderRounded(-16, -1, 32, 14, 4, stumpsTall),
	trunkCollider: mixColliderRounded(-16, -1, 32, 14, 4),
	crownCollider: mixColliderRounded(-38, -21, 76, 31, 7),
	cover: rect(-55, -120, 110, 133),
	variants: [
		{ stump: sprites.pine_6Stump0, crown: sprites.pine_6Crown0_0, palette: 0, paletteAutumn: 1, paletteWinter: 2 },
		{ stump: sprites.pine_6Stump0, crown: xmasCrown, palette: 0 },
	]
});

// tree helpers

interface TreeVariant {
	stump: PaletteRenderable;
	stumpWinter?: PaletteRenderable;
	trunk?: PaletteRenderable;
	crown: PaletteRenderable;
	webX?: number;
	webY?: number;
	spiderHeight?: number;
	palette?: number;
	paletteWinter?: number;
	paletteAutumn?: number;
}

interface TreeParams {
	variants: TreeVariant[];
	cover: Rect;
	stumpCollider?: MixinEntity;
	trunkCollider?: MixinEntity;
	crownCollider?: MixinEntity;
}

type CreateTreeMethod = (x: number, y: number, v: number, hasWeb?: boolean, hasSpider?: boolean) => Entity[];

function createTree(
	name: string, offsetX: number, offsetY: number, crownOffset: number,
	{ cover, stumpCollider, trunkCollider, crownCollider, variants }: TreeParams,
): [CreateTreeMethod, CreateEntityMethod[], (CreateEntityMethod | undefined)[], CreateEntityMethod[]] {
	const trunkCover: MixinEntity = base => base.coverBounds = cover;
	const crownCover = mixCover(cover.x, cover.y - crownOffset, cover.w, cover.h);
	const crownFlags = mixServerFlags(ServerFlags.TreeCrown);
	const crownMinimap = mixMinimap(0x386c4fff, rect(-1, -1, 3, 3), 2);

	const stumps = variants.map((v, i) => v.stump && registerMix(n(`${name}-stump-${i}`),
		mixDrawSeasonal({
			summer: { sprite: v.stump, dx: offsetX, dy: offsetY, palette: v.palette || 0 },
			autumn: { sprite: v.stump, dx: offsetX, dy: offsetY, palette: v.paletteAutumn || v.palette || 0 },
			winter: { sprite: v.stumpWinter || v.stump, dx: offsetX, dy: offsetY, palette: v.paletteWinter || v.palette || 0 },
		}),
		stumpCollider,
		mixOrder(1)));

	const stumpsTall = variants.map((v, i) => v.stump && registerMix(n(`${name}-stump-tall-${i}`),
		mixDrawSeasonal({
			summer: { sprite: v.stump, dx: offsetX, dy: offsetY, palette: v.palette || 0 },
			autumn: { sprite: v.stump, dx: offsetX, dy: offsetY, palette: v.paletteAutumn || v.palette || 0 },
			winter: { sprite: v.stumpWinter || v.stump, dx: offsetX, dy: offsetY, palette: v.paletteWinter || v.palette || 0 },
		}),
		trunkCollider,
		mixOrder(1)));

	const trunks = variants.map((v, i) => v.trunk && registerMix(n(`${name}-trunk-${i}`),
		mixDrawSeasonal({
			summer: { sprite: v.trunk, dx: offsetX, dy: offsetY, palette: v.palette || 0 },
			autumn: { sprite: v.trunk, dx: offsetX, dy: offsetY, palette: v.paletteAutumn || v.palette || 0 },
			winter: { sprite: v.trunk, dx: offsetX, dy: offsetY, palette: v.paletteWinter || v.palette || 0 },
		}),
		trunkCover,
		mixOrder(2)));

	const crowns = variants.map((v, i) => v.crown && registerMix(n(`${name}-crown-${i}`),
		mixDrawSeasonal({
			summer: { sprite: v.crown, dx: offsetX, dy: offsetY + crownOffset, palette: v.palette || 0 },
			autumn: { sprite: v.crown, dx: offsetX, dy: offsetY + crownOffset, palette: v.paletteAutumn || v.palette || 0 },
			winter: { sprite: v.crown, dx: offsetX, dy: offsetY + crownOffset, palette: v.paletteWinter || v.palette || 0 },
		}),
		crownCollider, crownCover, crownFlags, crownMinimap));

	const trees = variants.map((v, i) => ({
		stump: stumps[i],
		stumpTall: stumpsTall[i],
		trunk: trunks[i],
		crown: crowns[i],
		webX: v.webX,
		webY: v.webY,
		spiderHeight: v.spiderHeight,
	}));

	function tree(x: number, y: number, v?: number, hasWeb?: boolean, hasSpider?: boolean): Entity[] {
		const { stumpTall, trunk, crown, webX, webY, spiderHeight } = trees[v || 0];

		return compact([
			stumpTall && stumpTall(x, y),
			trunk && trunk(x, y),
			crown && crown(x, y + (crownOffset / tileHeight)),
			hasWeb ? web(x + (webX! / tileWidth), y + (webY! / tileHeight)) : undefined,
			hasSpider ? spider(x - 1, y + 0.3, { height: spiderHeight!, time: Math.random() * 100 }) : undefined,
		]);
	}

	return [tree, stumps, trunks, crowns];
}
