import {
	rose, cookie, cookiePony, letter, apple, apple2, appleGreen, appleGreen2, orange, pear, banana,
	lemon, lime, carrotHeld, mango, grapesGreen, grapesPurple, saw, broom, hammer, shovel, candyCane1,
	candyCane2, cookieTable2
} from './entitiesPickables';
import { rope } from './entitiesBoat';
import { cushion1, cushion2, cushion3, picture1, picture2, window1, bookshelf } from './entitiesHouse';
import {
	barrel, box, boxLanterns, boxFruits, table1, table2, table3, crate1A, crate2A, crate3A
} from './entitiesFurniture';
import { lanternOn } from './entitiesLighting';
import { pumpkin, jackoOn, jackoOff } from './entitiesPumpkins';
import { largeLeafedBush1, largeLeafedBush3 } from './entitiesVegetation';
import { rock } from './entitiesRocks';

export const stashEntities = [
	rose, cookie, cookiePony, letter, rope,
];

export const placeableEntities: { type: number; name: string; }[] = [
	{ type: cushion1.type, name: 'Cushion (red)' },
	{ type: cushion2.type, name: 'Cushion (blue)' },
	{ type: cushion3.type, name: 'Cushion (green)' },
	{ type: barrel.type, name: 'Barrel' },
	{ type: box.type, name: 'Box' },
	{ type: boxLanterns.type, name: 'Box of lanterns' },
	{ type: boxFruits.type, name: 'Box of fruits' },
	{ type: cookieTable2.type, name: 'Cookie table' },
	{ type: table1.type, name: 'Small table' },
	{ type: table2.type, name: 'Large table' },
	{ type: table3.type, name: 'Long table' },
	{ type: lanternOn.type, name: 'Lantern' },
	{ type: pumpkin.type, name: 'Pumpkin' },
	{ type: jackoOn.type, name: `Jack-o'-lantern (lit)` },
	{ type: jackoOff.type, name: `Jack-o'-lantern (unlit)` },
	{ type: crate1A.type, name: 'Large crate' },
	{ type: crate3A.type, name: 'Small crate' },
	{ type: crate2A.type, name: 'Lockbox' },
	{ type: largeLeafedBush1.type, name: 'Large plant' },
	{ type: largeLeafedBush3.type, name: 'Small plant' },
	{ type: picture1.type, name: 'Picture (1)' },
	{ type: picture2.type, name: 'Picture (2)' },
	{ type: window1.type, name: 'Window' },
	{ type: bookshelf.type, name: 'Bookshelf' },
	{ type: rock.type, name: 'Rock' },
];

export const fruits = [
	apple, apple2, appleGreen, appleGreen2, orange, pear, banana,
	lemon, lime, carrotHeld, mango, grapesGreen[0], grapesPurple[0],
];

export const tools = [
	{ type: saw.type, text: 'Saw: place & remove walls', textMobile: undefined },
	{ type: broom.type, text: 'Broom: remove furniture', textMobile: undefined },
	{ type: hammer.type,
		text: 'Hammer: place furniture\nuse [mouse wheel] to switch item',
		textMobile: 'Hammer: place furniture\nuse [Switch item to place] action to switch item' },
	{ type: shovel.type,
		text: 'Shovel: change floor\nuse [mouse wheel] to switch floor type',
		textMobile: 'Shovel: change floor\nuse [Switch tile to place] action to switch floor type' },
];

export const candies1Types = [candyCane1, candyCane2, cookie, cookiePony].map(e => e.type);
export const candies2Types = [cookie, cookiePony].map(e => e.type);
