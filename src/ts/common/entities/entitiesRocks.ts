import * as sprites from '../../generated/sprites';
import { WATER_FPS } from '../constants';
import { EntityFlags } from '../interfaces';
import { mixMinimap, mixColliderRounded, mixAnimation } from '../mixins';
import { doodad, registerMix, mixFlags, n } from './entitiesCore';
import { rect } from '../rect';

// rocks

const rockMinimap = mixMinimap(0x78716aff, rect(0, 0, 1, 1));

export const rock = doodad(n('rock'), sprites.rock_1, 15, 20, 0,
	mixColliderRounded(-16, -12, 32, 12, 3, false),
	rockMinimap);

export const rock2 = doodad(n('rock-2'), sprites.rock_2, 11, 11, 0,
	mixColliderRounded(-10, -4, 17, 5, 2, false),
	rockMinimap);

export const rock3 = doodad(n('rock-3'), sprites.rock_3, 10, 11, 0,
	mixColliderRounded(-10, -4, 18, 5, 2, false),
	rockMinimap);

export const rockB = doodad(n('rockb'), sprites.rock_1, 15, 20, 1,
	mixColliderRounded(-16, -12, 32, 12, 3, false),
	rockMinimap);

export const rock2B = doodad(n('rock-2b'), sprites.rock_2, 11, 11, 1,
	mixColliderRounded(-10, -4, 17, 5, 2, false),
	rockMinimap);

export const rock3B = doodad(n('rock-3b'), sprites.rock_3, 10, 11, 1,
	mixColliderRounded(-10, -4, 18, 5, 2, false),
	rockMinimap);

// water rocks

const waterRockFPS = WATER_FPS;

export const waterRock1 = registerMix(n('water-rock-1'),
	mixAnimation(sprites.water_rock_1, waterRockFPS, 10, 12),
	mixColliderRounded(-12, -6, 25, 7, 2, false),
	mixFlags(EntityFlags.StaticY));

export const waterRock2 = registerMix(n('water-rock-2'),
	mixAnimation(sprites.water_rock_2, waterRockFPS, 11, 8),
	mixColliderRounded(-12, -5, 22, 8, 2, false),
	mixFlags(EntityFlags.StaticY));

export const waterRock3 = registerMix(n('water-rock-3'),
	mixAnimation(sprites.water_rock_3, waterRockFPS, 12, 9),
	mixColliderRounded(-12, -4, 22, 7, 2, false),
	mixFlags(EntityFlags.StaticY));

export const waterRock4 = registerMix(n('water-rock-4'),
	mixAnimation(sprites.water_rock_4, waterRockFPS, 11, 12),
	mixColliderRounded(-10, -4, 18, 7, 2, false),
	mixFlags(EntityFlags.StaticY));

export const waterRock5 = registerMix(n('water-rock-5'),
	mixAnimation(sprites.water_rock_5, waterRockFPS, 11, 11),
	mixColliderRounded(-12, -4, 22, 7, 2, false),
	mixFlags(EntityFlags.StaticY));

export const waterRock6 = registerMix(n('water-rock-6'),
	mixAnimation(sprites.water_rock_6, waterRockFPS, 13, 11),
	mixColliderRounded(-12, -4, 22, 7, 2, false),
	mixFlags(EntityFlags.StaticY));

export const waterRock7 = registerMix(n('water-rock-7'),
	mixAnimation(sprites.water_rock_7, waterRockFPS, 10, 10),
	mixColliderRounded(-12, -4, 22, 7, 2, false),
	mixFlags(EntityFlags.StaticY));

export const waterRock8 = registerMix(n('water-rock-8'),
	mixAnimation(sprites.water_rock_8, waterRockFPS, 11, 9),
	mixColliderRounded(-12, -4, 22, 7, 2, false),
	mixFlags(EntityFlags.StaticY));

export const waterRock9 = registerMix(n('water-rock-9'),
	mixAnimation(sprites.water_rock_9, waterRockFPS, 10, 15),
	mixColliderRounded(-12, -4, 22, 7, 2, false),
	mixFlags(EntityFlags.StaticY));

export const waterRock10 = registerMix(n('water-rock-10'),
	mixAnimation(sprites.water_rock_10, waterRockFPS, 10, 12),
	mixColliderRounded(-12, -4, 22, 7, 2, false),
	mixFlags(EntityFlags.StaticY));

export const waterRock11 = registerMix(n('water-rock-11'),
	mixAnimation(sprites.water_rock_11, waterRockFPS, 10, 13),
	mixColliderRounded(-12, -4, 22, 7, 2, false),
	mixFlags(EntityFlags.StaticY));
