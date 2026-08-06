import * as sprites from '../../generated/sprites';
import { EntityFlags, InteractAction } from '../interfaces';
import {
	mixColliderRect, mixInteract, mixPickable, mixInteractAt, mixColliderRounded
} from '../mixins';
import { doodad, mixFlags, mixInteractAction, n } from './entitiesCore';

// box

const boxCollider = mixColliderRect(-17, -22, 35, 22);
const boxInteractive = mixInteract(-16, -32, 32, 36, 4);
const boxInteractiveClose = mixInteract(-16, -32, 32, 36, 3);
const boxPickable = mixPickable(32, 72);
const boxParts = [boxCollider, boxInteractive, boxPickable];

export const box = doodad(n('box'), sprites.box_empty, 16, 32, 0,
	...boxParts);

export const boxLanterns = doodad(n('box-lanterns'), sprites.box_lanterns, 16, 32, 0,
	...boxParts,
	mixInteractAction(InteractAction.GiveLantern));

export const boxBaskets = doodad(n('box-baskets'), sprites.box_baskets, 16, 32, 0,
	...boxParts);

export const boxFruits = doodad(n('box-fruits'), sprites.box_fruits, 16, 32, 0,
	...boxParts,
	mixInteractAction(InteractAction.GiveFruits));

export const boxGifts = doodad(n('box-gifts'), sprites.box_gifts, 16, 32, 0,
	boxCollider,
	boxInteractiveClose,
	boxPickable);

const toolboxParts = [
	mixColliderRect(-15, -10, 30, 10),
	mixInteractAt(5),
	mixPickable(31, 60),
];

export const toolboxEmpty = doodad(n('toolbox-empty'), sprites.toolbox_empty, 16, 22, 0,
	...toolboxParts);
export const toolboxFull = doodad(n('toolbox-full'), sprites.toolbox_full, 16, 22, 0,
	...toolboxParts,
	base => base.interactRange = 20,
	mixInteractAction(InteractAction.Toolbox),
	mixFlags(EntityFlags.IgnoreTool));

export const barrel = doodad(n('barrel'), sprites.barrel, 13, 27, 0,
	mixColliderRounded(-12, -8, 24, 13, 5),
	mixFlags(EntityFlags.Interactive),
	base => base.interactRange = 3);

export const bench1 = doodad(n('bench-1'), sprites.bench_1, 37, 20, 0, mixColliderRect(-37, -3, 75, 8));
export const benchSeat = doodad(n('bench-seat'), sprites.bench_seat, 37, 0);
export const benchBack = doodad(n('bench-back'), sprites.bench_back, 37, 22, 0, mixColliderRect(-37, -3, 75, 8));
export const benchSeatH = doodad(n('bench-seat-h'), sprites.bench_seath, 11, 0);
export const benchBackH = doodad(n('bench-back-h'), sprites.bench_backh, 9, 84, 0, mixColliderRect(-15, -64, 30, 65));
export const benchBackH2 = doodad(n('bench-back-h2'), sprites.bench_backh2, 6, 84, 0, mixColliderRect(-15, -64, 30, 65));

export const table1 = doodad(n('table-1'), sprites.table_1, 14, 34, 0, mixColliderRect(-18, -22, 37, 23));
export const table2 = doodad(n('table-2'), sprites.table_2, 24, 29, 0, mixColliderRect(-27, -21, 56, 49));
export const table3 = doodad(n('table-3'), sprites.table_3, 24, 21, 0, mixColliderRect(-23, -14, 45, 14));

export const wallMap = doodad(n('wall-map'), sprites.wall_map, 20, 51, 0, mixFlags(EntityFlags.StaticY));

export const crate1A = doodad(n('crate-1a'), sprites.crate_1, 16, 45, 0, mixColliderRect(-15, -20, 30, 20));
export const crate1B = doodad(n('crate-1b'), sprites.crate_1, 16, 45, 1, mixColliderRect(-15, -20, 30, 20));
export const crate1AHigh = doodad(n('crate-1a-high'), sprites.crate_1, 16, 45 + 25, 0, mixColliderRect(-15, -20 - 25, 30, 20));
export const crate1BHigh = doodad(n('crate-1b-high'), sprites.crate_1, 16, 45 + 25, 1, mixColliderRect(-15, -20 - 25, 30, 20));
export const crate2A = doodad(n('crate-2a'), sprites.crate_2, 15, 23, 0, mixColliderRect(-14, -14, 29, 14));
export const crate2B = doodad(n('crate-2b'), sprites.crate_2, 15, 23, 1, mixColliderRect(-14, -14, 29, 14));
export const crate3A = doodad(n('crate-3a'), sprites.crate_3, 15, 23, 0, mixColliderRect(-14, -14, 29, 14));
export const crate3B = doodad(n('crate-3b'), sprites.crate_3, 15, 23, 1, mixColliderRect(-14, -14, 29, 14));
