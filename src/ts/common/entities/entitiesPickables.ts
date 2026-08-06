import * as sprites from '../../generated/sprites';
import { ColorShadow, EntityFlags, InteractAction } from '../interfaces';
import { mixPickable, mixColliderRect } from '../mixins';
import { collectable, doodad, n, collectableInteractive, mixFlags, mixInteractAction } from './entitiesCore';

// pickables

const applePickable = mixPickable(29, 47);
export const apple = collectable(n('apple'), sprites.apple_1, 0, applePickable);
export const apple2 = collectable(n('apple-2'), sprites.apple_2, 0, applePickable);
export const appleGreen = collectable(n('apple-green'), sprites.apple_1, 1, applePickable);
export const appleGreen2 = collectable(n('apple-green-2'), sprites.apple_2, 1, applePickable);

const orangePickable = mixPickable(29, 46);
export const orange = collectable(n('orange'), sprites.orange_1, 0, orangePickable);
export const orange2 = collectable(n('orange-2'), sprites.orange_2, 0, orangePickable);

export const pear = collectable(n('pear'), sprites.pear, 0, mixPickable(30, 48));

export const banana = collectable(n('banana'), sprites.banana, 0, mixPickable(30, 44));

const lemonPickable = mixPickable(31, 45);
export const lemon = collectable(n('lemon'), sprites.lemon_1, 0, lemonPickable);
export const lime = collectable(n('lime'), sprites.lemon_1, 1, lemonPickable);

const carrotPalette = 1;
export const carrot1 = doodad(n('carrot-1'), sprites.carrot_1, 4, 9, carrotPalette, collectableInteractive);
export const carrot1b = doodad(n('carrot-1b'), sprites.carrot_1b, 4, 9, carrotPalette, collectableInteractive);
export const carrot2 = doodad(n('carrot-2'), sprites.carrot_2, 4, 9, carrotPalette);
export const carrot2b = doodad(n('carrot-2b'), sprites.carrot_2b, 4, 9, carrotPalette);
export const carrot3 = doodad(n('carrot-3'), sprites.carrot_3, 4, 9, carrotPalette);
export const carrot4 = doodad(n('carrot-4'), sprites.carrot_4, 4, 9, carrotPalette);
export const carrotHeld = doodad(n('carrot-held'), sprites.carrot_hold, 8, 4, carrotPalette, mixPickable(32, 44));

const grapesPickable = mixPickable(32, 54);

export const grapePurple = collectable(n('grape-purple'), sprites.grapes_one, 0, mixPickable(29, 43));
export const grapeGreen = collectable(n('grape-green'), sprites.grapes_one, 1, mixPickable(29, 43));

function grapes(name: string, sprite: ColorShadow, palette: number) {
	return doodad(name, sprite, 5, 15, palette, collectableInteractive, grapesPickable);
}

export const grapesPurple = [
	grapes(n('grapes-purple-1'), sprites.grapes_1, 0),
	grapes(n('grapes-purple-2'), sprites.grapes_2, 0),
	grapes(n('grapes-purple-3'), sprites.grapes_3, 0),
	grapes(n('grapes-purple-4'), sprites.grapes_4, 0),
	grapes(n('grapes-purple-5'), sprites.grapes_5, 0),
	grapes(n('grapes-purple-6'), sprites.grapes_6, 0),
	grapes(n('grapes-purple-7'), sprites.grapes_7, 0),
];

export const grapesGreen = [
	grapes(n('grapes-green-1'), sprites.grapes_1, 1),
	grapes(n('grapes-green-2'), sprites.grapes_2, 1),
	grapes(n('grapes-green-3'), sprites.grapes_3, 1),
	grapes(n('grapes-green-4'), sprites.grapes_4, 1),
	grapes(n('grapes-green-5'), sprites.grapes_5, 1),
	grapes(n('grapes-green-6'), sprites.grapes_6, 1),
	grapes(n('grapes-green-7'), sprites.grapes_7, 1),
];

export const mango = collectable(n('mango'), sprites.mango, 0, mixPickable(31, 46));

export const candyCane1 = collectable(n('candy-cane-1'), sprites.candy_cane_1, 0, mixPickable(31, 46)); // horizontal
export const candyCane2 = collectable(n('candy-cane-2'), sprites.candy_cane_2, 0, mixPickable(31, 49)); // vertical
export const cookie = collectable(n('cookie'), sprites.cookie, 0, mixPickable(31, 46));
export const cookiePony = collectable(n('cookie-pony'), sprites.cookie_pony, 0, mixPickable(30, 45));

export const cookieTable = doodad(n('cookie-table'), sprites.cookie_table_1, 13, 28, 0,
	mixFlags(EntityFlags.Interactive),
	base => base.interactRange = 5,
	mixInteractAction(InteractAction.GiveCookie1),
	mixColliderRect(-13, -12, 26, 14));

export const cookieTable2 = doodad(n('cookie-table-2'), sprites.cookie_table_2, 13, 28, 0,
	mixFlags(EntityFlags.Interactive),
	base => base.interactRange = 5,
	mixInteractAction(InteractAction.GiveCookie2),
	mixColliderRect(-13, -12, 26, 14));

export const letter = doodad(n('letter'), sprites.letter, 4, 10, 0,
	mixPickable(30, 50));

export const rose = doodad(n('rose'), sprites.rose, 8, 1, 0,
	mixPickable(30, 41));

// tools

export const hammer = doodad(n('hammer'), sprites.hammer, 8, 10, 0,
	mixPickable(25, 46),
	mixFlags(EntityFlags.Usable));

export const shovel = doodad(n('shovel'), sprites.shovel, 16, 6, 0,
	mixPickable(29, 42),
	mixFlags(EntityFlags.Usable));

export const rake = doodad(n('rake'), sprites.rake, 16, 6, 0,
	mixPickable(30, 42));

export const pickaxe = doodad(n('pickaxe'), sprites.pickaxe, 10, 8, 0,
	mixPickable(28, 42));

export const broom = doodad(n('broom'), sprites.broom, 16, 6, 0,
	mixPickable(27, 42));

export const saw = doodad(n('saw'), sprites.saw, 10, 7, 0,
	mixPickable(26, 47));
