import * as sprites from '../../generated/sprites';
import { EntityFlags } from '../interfaces';
import { mixInteract, mixPickable, mixColliderRect } from '../mixins';
import { collectable, doodad, mixFlags, n } from './entitiesCore';

// easter

export const candy = doodad(n('candy'), sprites.candy, 4, 2, 0,
	mixInteract(-6, -6, 13, 13, 1.5));

const eggInteractive = mixInteract(-6, -6, 13, 13, 1.5);

export const eggs = [
	// upright
	collectable(n('egg-1-0'), sprites.egg_1, 0, eggInteractive),
	collectable(n('egg-1-1'), sprites.egg_1, 1, eggInteractive),
	collectable(n('egg-1-2'), sprites.egg_1, 2, eggInteractive),
	collectable(n('egg-2-0'), sprites.egg_2, 0, eggInteractive),
	collectable(n('egg-3-0'), sprites.egg_3, 0, eggInteractive),
	collectable(n('egg-3-1'), sprites.egg_3, 3, eggInteractive),
	collectable(n('egg-3-2'), sprites.egg_3, 4, eggInteractive),
	collectable(n('egg-4-0'), sprites.egg_4, 0, eggInteractive),
	collectable(n('egg-5-0'), sprites.egg_5, 0, eggInteractive),
	collectable(n('egg-5-1'), sprites.egg_5, 8, eggInteractive),
	collectable(n('egg-6-0'), sprites.egg_6, 0, eggInteractive),
	collectable(n('egg-6-1'), sprites.egg_6, 5, eggInteractive),
	collectable(n('egg-7-0'), sprites.egg_7, 0, eggInteractive),
	collectable(n('egg-7-1'), sprites.egg_7, 6, eggInteractive),
	collectable(n('egg-8-0'), sprites.egg_8, 0, eggInteractive),
	collectable(n('egg-8-1'), sprites.egg_8, 7, eggInteractive),
	collectable(n('egg-9-0'), sprites.egg_9, 0, eggInteractive),
	collectable(n('egg-10-0'), sprites.egg_10, 0, eggInteractive),
	collectable(n('egg-11-0'), sprites.egg_11, 0, eggInteractive),
	collectable(n('egg-12-0'), sprites.egg_12, 0, eggInteractive),
	collectable(n('egg-13-0'), sprites.egg_13, 0, eggInteractive),
	collectable(n('egg-14-0'), sprites.egg_14, 0, eggInteractive),
	// tilted
	collectable(n('egg-14-1'), sprites.egg_14, 1, eggInteractive),
	collectable(n('egg-14-2'), sprites.egg_14, 2, eggInteractive),
	collectable(n('egg-15-0'), sprites.egg_15, 0, eggInteractive),
	collectable(n('egg-15-1'), sprites.egg_15, 3, eggInteractive),
	collectable(n('egg-15-2'), sprites.egg_15, 4, eggInteractive),
	collectable(n('egg-16-0'), sprites.egg_16, 0, eggInteractive),
	collectable(n('egg-16-1'), sprites.egg_16, 8, eggInteractive),
	collectable(n('egg-17-0'), sprites.egg_17, 0, eggInteractive),
	collectable(n('egg-17-1'), sprites.egg_17, 5, eggInteractive),
	collectable(n('egg-18-0'), sprites.egg_18, 0, eggInteractive),
	collectable(n('egg-18-1'), sprites.egg_18, 7, eggInteractive),
	collectable(n('egg-19-0'), sprites.egg_19, 0, eggInteractive),
	collectable(n('egg-20-0'), sprites.egg_20, 0, eggInteractive),
	collectable(n('egg-21-0'), sprites.egg_21, 0, eggInteractive),
	collectable(n('egg-22-0'), sprites.egg_22, 0, eggInteractive),
	collectable(n('egg-23-0'), sprites.egg_23, 0, eggInteractive),
];

const eggBasketPickable = mixPickable(31, 53);
const eggBasketCollider = mixColliderRect(-5, -5, 11, 6);
const eggBasketParts = [eggBasketPickable, eggBasketCollider];

export const basket = doodad(n('egg-basket-1'), sprites.egg_basket_1, 6, 13, 0, ...eggBasketParts);
export const eggBasket2 = doodad(n('egg-basket-2'), sprites.egg_basket_2, 6, 13, 0, ...eggBasketParts);
export const eggBasket3 = doodad(n('egg-basket-3'), sprites.egg_basket_3, 6, 13, 0, ...eggBasketParts);
export const eggBasket4 = doodad(n('egg-basket-4'), sprites.egg_basket_4, 6, 13, 0, ...eggBasketParts);
export const eggBaskets = [basket, eggBasket2, eggBasket3, eggBasket4];

export const basketBin = doodad(n('basket-bin'), sprites.basket_bin, 21, 31, 0,
	mixColliderRect(-20, -8, 46, 26),
	mixFlags(EntityFlags.Interactive),
	base => base.interactRange = 3);
