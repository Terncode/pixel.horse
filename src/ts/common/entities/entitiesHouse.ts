import * as sprites from '../../generated/sprites';
import {
	mixColliders, collider, mixInteract, mixDrawWindow, mixPickable, mixColliderRect
} from '../mixins';
import { doodad, registerMix, decal, mixOrder, n } from './entitiesCore';

// house

export const house = doodad(n('house'), sprites.house, 79, 186, 0,
	mixColliders(
		collider(-70, -92, 137, 90, true),
		collider(-70, -2, 32, 2, true),
		collider(-70, 0, 30, 3, true),
		collider(0, -2, 67, 2, true),
		collider(2, 0, 65, 3, true),
	),
	mixInteract(-35, -49, 32, 49, 3));

export const window1 = registerMix(n('window-1'),
	mixDrawWindow(sprites.window_1, 21, 53, 0, 3, 0, 3, 1),
	mixOrder(1));

export const picture1 = doodad(n('picture-1'), sprites.picture_1, 15, 54, 0);
export const picture2 = doodad(n('picture-2'), sprites.picture_1, 15, 54, 1);

const cushionPickable = mixPickable(32, 39);
export const cushion1 = decal(n('cushion-1'), sprites.cushion_1, 0, cushionPickable);
export const cushion2 = decal(n('cushion-2'), sprites.cushion_1, 1, cushionPickable);
export const cushion3 = decal(n('cushion-3'), sprites.cushion_1, 2, cushionPickable);

export const bookshelf = doodad(n('bookshelf'), sprites.bookshelf, 28, 81, 0,
	mixColliderRect(-32, -14, 66, 15));
