import * as sprites from '../../generated/sprites';
import { mixDrawSeasonal, mixColliderRounded } from '../mixins';
import { registerMix, n } from './entitiesCore';

// vegetation

const largeLeafedBushLarge = mixColliderRounded(-14, -6, 28, 12, 2, false);
const largeLeafedBushSmall = mixColliderRounded(-8, -4, 16, 8, 2, false);

export const largeLeafedBush1 = registerMix(n('large-leafed-bush-1'),
	mixDrawSeasonal({
		summer: { sprite: sprites.large_leafed_bush_1, dx: 17, dy: 23, palette: 0 },
		winter: { palette: 1 },
	}),
	largeLeafedBushLarge);

export const largeLeafedBush2 = registerMix(n('large-leafed-bush-2'),
	mixDrawSeasonal({
		summer: { sprite: sprites.large_leafed_bush_2, dx: 17, dy: 23, palette: 0 },
		winter: { palette: 1 },
	}),
	largeLeafedBushLarge);

export const largeLeafedBush3 = registerMix(n('large-leafed-bush-3'),
	mixDrawSeasonal({
		summer: { sprite: sprites.large_leafed_bush_3, dx: 12, dy: 17, palette: 0 },
		winter: { palette: 1 },
	}),
	largeLeafedBushSmall);

export const largeLeafedBush4 = registerMix(n('large-leafed-bush-4'),
	mixDrawSeasonal({
		summer: { sprite: sprites.large_leafed_bush_4, dx: 12, dy: 17, palette: 0 },
		winter: { palette: 1 },
	}),
	largeLeafedBushSmall);
