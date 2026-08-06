import * as sprites from '../../generated/sprites';
import { mixColliderRounded } from '../mixins';
import { decal, doodad, mixOrder, n } from './entitiesCore';

// winter

const snowponyCollider = mixColliderRounded(-12, -4, 25, 7, 2);
export const snowpony1 = doodad(n('snowpony-1'), sprites.snowpony_1, 13, 36, 0, snowponyCollider);
export const snowpony2 = doodad(n('snowpony-2'), sprites.snowpony_2, 16, 46, 0, snowponyCollider);
export const snowpony3 = doodad(n('snowpony-3'), sprites.snowpony_3, 20, 45, 0, snowponyCollider);
export const snowpony4 = doodad(n('snowpony-4'), sprites.snowpony_4, 20, 45, 0, snowponyCollider);
export const snowpony5 = doodad(n('snowpony-5'), sprites.snowpony_5, 20, 45, 0, snowponyCollider);
export const snowpony6 = doodad(n('snowpony-6'), sprites.snowpony_6, 12, 31, 0, snowponyCollider);
export const snowpony7 = doodad(n('snowpony-7'), sprites.snowpony_7, 12, 31, 0, snowponyCollider);
export const snowpony8 = doodad(n('snowpony-8'), sprites.snowpony_8, 12, 31, 0, snowponyCollider);
export const snowpony9 = doodad(n('snowpony-9'), sprites.snowpony_9, 12, 31, 0, snowponyCollider);
export const mistletoe = doodad(n('mistletoe'), sprites.mistletoe, 5, 65);
export const holly = doodad(n('holly'), sprites.holly, 5, 25, 0, mixOrder(1));

export const snowponies = [
	snowpony1,
	snowpony2,
	snowpony3,
	snowpony4,
	snowpony5,
	snowpony6,
	snowpony7,
	snowpony8,
	snowpony9,
];

export const snowPileTinier = decal(n('snowpile-tinier'), sprites.snowpile_tinier);
export const snowPileTiny = decal(n('snowpile-tiny'), sprites.snowpile_tiny);
export const snowPileSmall = doodad(n('snowpile-small'), sprites.snowpile_small, 22, 15, 0,
	mixColliderRounded(-15, -4, 31, 7, 2, false));
export const snowPileMedium = doodad(n('snowpile-medium'), sprites.snowpile_medium, 33, 20, 0,
	mixColliderRounded(-23, -4, 46, 12, 4, false));
export const snowPileBig = doodad(n('snowpile-big'), sprites.snowpile_big, 43, 28, 0,
	mixColliderRounded(-39, -2, 78, 16, 6, false));

export const sandPileTinier = decal(n('sandpile-tinier'), sprites.snowpile_tinier, 1);
export const sandPileTiny = decal(n('sandpile-tiny'), sprites.snowpile_tiny, 1);
export const sandPileSmall = doodad(n('sandpile-small'), sprites.snowpile_small, 22, 15, 1,
	mixColliderRounded(-15, -4, 31, 7, 2, false));
export const sandPileMedium = doodad(n('sandpile-medium'), sprites.snowpile_medium, 33, 20, 1,
	mixColliderRounded(-23, -4, 46, 12, 4, false));
export const sandPileBig = doodad(n('sandpile-big'), sprites.snowpile_big, 43, 28, 1,
	mixColliderRounded(-39, -2, 78, 16, 6, false));
