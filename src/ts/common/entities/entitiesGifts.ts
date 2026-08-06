import * as sprites from '../../generated/sprites';
import { EntityFlags } from '../interfaces';
import { mixInteract, mixPickable, mixColliderRounded, mixColliderRect } from '../mixins';
import { doodad, mixFlags, n } from './entitiesCore';

// gifts

const giftInteractive = mixInteract(-9, -15, 18, 20, 1.5);
const giftPickable = mixPickable(32, 52);
const giftOffsetX = 7;
const giftOffsetY = 15;

export const gift1 = doodad(n('gift-1'), sprites.gift_1, giftOffsetX, giftOffsetY, 0,
	giftInteractive,
	giftPickable,
	mixFlags(EntityFlags.Usable));

export const gift2 = doodad(n('gift-2'), sprites.gift_2, giftOffsetX, giftOffsetY, 0,
	giftInteractive,
	giftPickable,
	mixFlags(EntityFlags.Usable));

export const gift3 = doodad(n('gift-3'), sprites.gift_2, giftOffsetX, giftOffsetY, 1,
	giftInteractive,
	giftPickable);

// gift piles

export const giftPileSign = doodad(n('giftpile-sign'), sprites.giftpile_sign, 47, 39, 0,
	mixColliderRounded(-44, -21, 89, 55, 7));
export const giftPileTree = doodad(n('giftpile-tree'), sprites.giftpile_tree, 42, 21, 0,
	mixColliderRounded(-41, -12, 83, 28, 7));
export const giftPilePine = doodad(n('giftpile-pine'), sprites.giftpile_pine, 56, 24, 0,
	mixColliderRounded(-51, -19, 102, 40, 7));

export const giftPile1 = doodad(n('giftpile-1'), sprites.giftpile_1, 28, 26, 0, mixColliderRect(-28, -12, 57, 33));
export const giftPile2 = doodad(n('giftpile-2'), sprites.giftpile_2, 30, 27, 0, mixColliderRect(-28, -12, 57, 31));
export const giftPile3 = doodad(n('giftpile-3'), sprites.giftpile_3, 29, 23, 0, mixColliderRect(-28, -12, 57, 31));
export const giftPile4 = doodad(n('giftpile-4'), sprites.giftpile_4, 26, 16, 0, mixColliderRect(-25, -12, 51, 24));
export const giftPile5 = doodad(n('giftpile-5'), sprites.giftpile_5, 20, 20, 0, mixColliderRect(-19, -7, 42, 19));
export const giftPile6 = doodad(n('giftpile-6'), sprites.giftpile_6, 19, 23, 0, mixColliderRect(-19, -12, 38, 28));

export const giftPileInteractive = doodad(n('giftpile-5-interactive'), sprites.giftpile_5, 20, 20, 0,
	mixColliderRect(-19, -7, 42, 19),
	mixFlags(EntityFlags.Interactive),
	base => base.interactRange = 5);
