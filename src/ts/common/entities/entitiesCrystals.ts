import * as sprites from '../../generated/sprites';
import { WHITE } from '../colors';
import { WATER_FPS } from '../constants';
import { EntityFlags } from '../interfaces';
import {
	mixDraw, mixAnimation, mixLight, mixLightSprite, mixColliderRounded, mixInteract,
	mixPickable
} from '../mixins';
import { registerMix, mixFlags, mixOrder, n } from './entitiesCore';

// crystals

const crystalLight = 0x299ad5ff;
const mixCrystalLight = mixLight(crystalLight, 0, 0, 200, 200);
const waterCrystalFPS = WATER_FPS;

export const crystals1 = registerMix(n('crystals-1'),
	mixDraw(sprites.crystals_1, 8, 16),
	mixLightSprite(sprites.light_crystals_1, WHITE, 8, 16),
	mixCrystalLight,
	mixColliderRounded(-7, -4, 16, 4, 1));

export const crystals2 = registerMix(n('crystals-2'),
	mixDraw(sprites.crystals_2, 11, 19),
	mixLightSprite(sprites.light_crystals_2, WHITE, 11, 19),
	mixCrystalLight,
	mixColliderRounded(-9, -4, 18, 4, 1));

export const crystals3 = registerMix(n('crystals-3'),
	mixDraw(sprites.crystals_3, 13, 18),
	mixLightSprite(sprites.light_crystals_3, WHITE, 13, 18),
	mixCrystalLight,
	mixColliderRounded(-9, -4, 18, 4, 1));

export const crystals4 = registerMix(n('crystals-4'),
	mixDraw(sprites.crystals_4, 11, 15),
	mixLightSprite(sprites.light_crystals_4, WHITE, 11, 15),
	mixCrystalLight,
	mixColliderRounded(-9, -4, 18, 4, 1));

export const crystals5 = registerMix(n('crystals-5'),
	mixDraw(sprites.crystals_5, 12, 18),
	mixLightSprite(sprites.light_crystals_5, WHITE, 12, 18),
	mixCrystalLight,
	mixColliderRounded(-9, -4, 18, 4, 1));

export const crystals6 = registerMix(n('crystals-6'),
	mixDraw(sprites.crystals_6, 11, 13),
	mixLightSprite(sprites.light_crystals_6, WHITE, 11, 13),
	mixCrystalLight,
	mixColliderRounded(-9, -4, 18, 4, 1));

export const crystals7 = registerMix(n('crystals-7'),
	mixDraw(sprites.crystals_7, 13, 16),
	mixLightSprite(sprites.light_crystals_7, WHITE, 13, 16),
	mixCrystalLight,
	mixColliderRounded(-9, -4, 18, 4, 1));

export const crystals8 = registerMix(n('crystals-8'),
	mixDraw(sprites.crystals_8, 8, 17),
	mixLightSprite(sprites.light_crystals_8, WHITE, 8, 17),
	mixCrystalLight,
	mixColliderRounded(-9, -4, 18, 4, 1));

export const crystals9 = registerMix(n('crystals-9'),
	mixDraw(sprites.crystals_9, 8, 11),
	mixLightSprite(sprites.light_crystals_9, WHITE, 8, 11),
	mixCrystalLight,
	mixColliderRounded(-9, -4, 18, 4, 1));

export const crystals10 = registerMix(n('crystals-10'),
	mixDraw(sprites.crystals_10, 5, 12),
	mixLightSprite(sprites.light_crystals_10, WHITE, 5, 12),
	mixCrystalLight,
	mixColliderRounded(-9, -4, 18, 4, 1));

export const crystalsCartPile = registerMix(n('crystals-cart-pile'),
	mixDraw(sprites.crystals_cart_pile, 21, 28),
	mixLightSprite(sprites.light_crystals_cart_pile, WHITE, 21, 28),
	mixCrystalLight,
	mixInteract(-20, -28, 40, 40, 3),
	mixFlags(EntityFlags.StaticY),
	mixOrder(2));

export const crystalHeld = registerMix(n('crystal-held'),
	mixDraw(sprites.crystals_held, 7, 4),
	mixLightSprite(sprites.light_crystals_held, WHITE, 7, 4),
	mixLight(crystalLight, 0, 0, 160, 160),
	mixPickable(31, 44));

export const crystalLantern = registerMix(n('crystal-lantern'),
	mixDraw(sprites.crystal_lantern, 4, 15),
	mixLightSprite(sprites.light_crystal_lantern, WHITE, 4, 15),
	mixLight(crystalLight, 0, 0, 192, 144),
	mixPickable(31, 55));

export const waterCrystal1 = registerMix(n('water-crystal-1'),
	mixAnimation(sprites.water_crystal_1, waterCrystalFPS, 4, 12, {
		lightSprite: sprites.water_crystal_1_light,
	}),
	mixCrystalLight,
	mixColliderRounded(-4, -4, 9, 8, 2, false),
	mixFlags(EntityFlags.StaticY));

export const waterCrystal2 = registerMix(n('water-crystal-2'),
	mixAnimation(sprites.water_crystal_2, waterCrystalFPS, 9, 11, {
		lightSprite: sprites.water_crystal_2_light,
	}),
	mixCrystalLight,
	mixColliderRounded(-9, -6, 16, 7, 2, false),
	mixFlags(EntityFlags.StaticY));


export const waterCrysta3 = registerMix(n('water-crystal-3'),
	mixAnimation(sprites.water_crystal_3, waterCrystalFPS, 5, 10, {
		lightSprite: sprites.water_crystal_3_light,
	}),
	mixCrystalLight,
	mixColliderRounded(-4, -4, 7, 5, 2, false),
	mixFlags(EntityFlags.StaticY));
