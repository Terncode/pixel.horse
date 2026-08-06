import * as sprites from '../../generated/sprites';
import { ColorExtra, MixinEntity, EntityFlags, ServerFlags } from '../interfaces';
import { mixDrawWall, mixMinimap, mixColliderRect } from '../mixins';
import { doodad, registerMix, mixFlags, mixServerFlags, n } from './entitiesCore';
import { rect } from '../rect';

// walls

export type Walls = ReturnType<typeof createWalls>;

function createWalls(baseName: string, spriteFull: ColorExtra[], spritesHalf: ColorExtra[]) {
	function wall(name: string, index: number, ox: number, oy: number, oy2: number, ...other: MixinEntity[]) {
		return registerMix(name,
			mixDrawWall(spriteFull[index], spritesHalf[index], ox, oy, oy2),
			mixMinimap(0x503d45ff, rect(0, 0, 1, 1)),
			mixFlags(EntityFlags.StaticY),
			mixServerFlags(ServerFlags.DoNotSave),
			...other);
	}

	function wallShort(name: string, index: number, ox: number, _oy: number, oy2: number, ...other: MixinEntity[]) {
		return doodad(name, spritesHalf[index], ox, oy2, 0,
			mixMinimap(0x503d45ff, rect(0, 0, 1, 1)),
			mixFlags(EntityFlags.StaticY),
			mixServerFlags(ServerFlags.DoNotSave),
			...other);
	}

	const wallThickness = 8;
	const wallOffsetX = wallThickness / 2;
	const wallOffsetY = 18;
	const wallOffsetFullY = 81;
	const wallHCollider = mixColliderRect(-16, -6, 32, 6);
	const wallVCollider = mixColliderRect(-10, -15, 20, 30);

	const wallH = wall(
		n(`${baseName}-h`), 16, (32 - wallThickness) / 2, wallOffsetFullY, wallOffsetY, wallHCollider);

	const wallHShort = wallShort(
		n(`${baseName}-h-short`), 16, (32 - wallThickness) / 2, wallOffsetFullY, wallOffsetY, wallHCollider);

	const wallV = wall(
		n(`${baseName}-v`), 17, wallOffsetX, wallOffsetFullY + 3, wallOffsetY + 3, wallVCollider);

	const wallVShort = wallShort(
		n(`${baseName}-v-short`), 17, wallOffsetX, wallOffsetFullY + 3, wallOffsetY + 3, wallVCollider);

	const wallCutL = doodad(
		n(`${baseName}-cut-l`), spriteFull[18], (32 - wallThickness) / 2, wallOffsetFullY, 0,
		wallHCollider,
		mixFlags(EntityFlags.StaticY),
		mixServerFlags(ServerFlags.DoNotSave));

	const wallCutR = doodad(
		n(`${baseName}-cut-r`), spriteFull[19], (32 - wallThickness) / 2, wallOffsetFullY, 0,
		wallHCollider,
		mixFlags(EntityFlags.StaticY),
		mixServerFlags(ServerFlags.DoNotSave));

	const wallCorners = [
		// top right bottom left
		wall(n(`${baseName}-00`), 0, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 0 0 0
		wall(n(`${baseName}-01`), 1, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 0 0 1
		wall(n(`${baseName}-02`), 2, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 0 1 0
		wall(n(`${baseName}-03`), 3, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 0 1 1
		wall(n(`${baseName}-04`), 4, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 1 0 0
		wall(n(`${baseName}-05`), 5, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 1 0 1
		wall(n(`${baseName}-06`), 6, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 1 1 0
		wall(n(`${baseName}-07`), 7, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 1 1 1
		wall(n(`${baseName}-08`), 8, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 0 0 0
		wall(n(`${baseName}-09`), 9, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 0 0 1
		wall(n(`${baseName}-10`), 10, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 0 1 0
		wall(n(`${baseName}-11`), 11, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 0 1 1
		wall(n(`${baseName}-12`), 12, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 1 0 0
		wall(n(`${baseName}-13`), 13, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 1 0 1
		wall(n(`${baseName}-14`), 14, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 1 1 0
		wall(n(`${baseName}-15`), 15, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 1 1 1
	];

	const wallCornersShort = [
		// top right bottom left
		wallShort(n(`${baseName}-00-short`), 0, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 0 0 0
		wallShort(n(`${baseName}-01-short`), 1, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 0 0 1
		wallShort(n(`${baseName}-02-short`), 2, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 0 1 0
		wallShort(n(`${baseName}-03-short`), 3, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 0 1 1
		wallShort(n(`${baseName}-04-short`), 4, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 1 0 0
		wallShort(n(`${baseName}-05-short`), 5, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 1 0 1
		wallShort(n(`${baseName}-06-short`), 6, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 1 1 0
		wallShort(n(`${baseName}-07-short`), 7, wallOffsetX, wallOffsetFullY, wallOffsetY), // 0 1 1 1
		wallShort(n(`${baseName}-08-short`), 8, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 0 0 0
		wallShort(n(`${baseName}-09-short`), 9, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 0 0 1
		wallShort(n(`${baseName}-10-short`), 10, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 0 1 0
		wallShort(n(`${baseName}-11-short`), 11, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 0 1 1
		wallShort(n(`${baseName}-12-short`), 12, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 1 0 0
		wallShort(n(`${baseName}-13-short`), 13, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 1 0 1
		wallShort(n(`${baseName}-14-short`), 14, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 1 1 0
		wallShort(n(`${baseName}-15-short`), 15, wallOffsetX, wallOffsetFullY, wallOffsetY), // 1 1 1 1
	];

	return { wallH, wallHShort, wallV, wallVShort, wallCutL, wallCutR, wallCorners, wallCornersShort };
}

export const woodenWalls = createWalls('wall', sprites.wall_wood_full, sprites.wall_wood_half);
export const stoneWalls = createWalls('wall-stone', sprites.wall_stone_full, sprites.wall_stone_half);
