import * as sprites from '../../generated/sprites';
import { EntityFlags } from '../interfaces';
import {
	mixDraw, mixInteract, mixColliderRect, mixColliders, collider
} from '../mixins';
import { doodad, decal, decalOffset, registerMix, mixOrder, mixFlags, n } from './entitiesCore';

// mine

export const mineEntrance = registerMix(n('mine-entrance'),
	mixDraw(sprites.mine_entrance, 49, 0),
	mixInteract(-32, -48, 65, 46, 3),
	mixOrder(10));

export const mineClosed = registerMix(n('mine-closed'),
	mixDraw(sprites.mine_closed, 36, -24),
	mixOrder(11));

export const mineCart = doodad(n('mine-cart'), sprites.mine_cart, 26, 32, 0,
	mixColliderRect(-27, 0, 54, 21),
	mixFlags(EntityFlags.StaticY),
	mixOrder(1));

export const mineCartFront = doodad(n('mine-cart-front'), sprites.mine_cart_front, 26, 52, 0,
	mixColliders(
		collider(-30, -25, 55, 4),
		collider(-30, -19, 15, 20),
		collider(-30, 2, 55, 4),
	),
	mixFlags(EntityFlags.StaticY));

export const mineCartBack = doodad(n('mine-cart-back'), sprites.mine_cart_back, 26, 30, 0,
	mixFlags(EntityFlags.StaticY));

const railsExtra = mixFlags(EntityFlags.StaticY);

export const mineRailsH = decal(n('mine-rails-h'), sprites.mine_rails_h, 0, railsExtra);
export const mineRailsV = decal(n('mine-rails-v'), sprites.mine_rails_v, 0, railsExtra);
export const mineRailsSE = decalOffset(n('mine-rails-se'), sprites.mine_rails_se, 16, 0, 0, railsExtra);
export const mineRailsSW = decalOffset(n('mine-rails-sw'), sprites.mine_rails_sw, 16, 0, 0, railsExtra);
export const mineRailsNE = decalOffset(n('mine-rails-ne'), sprites.mine_rails_ne, 16, 0, 0, railsExtra);
export const mineRailsNW = decalOffset(n('mine-rails-nw'), sprites.mine_rails_nw, 16, 0, 0, railsExtra);

export const mineRailsNSW = decalOffset(n('mine-rails-nsw'), sprites.mine_rails_nsw, 16, 1, 0, railsExtra);
export const mineRailsNSE = decalOffset(n('mine-rails-nse'), sprites.mine_rails_nse, 16, 1, 0, railsExtra);
export const mineRailsNWE = decalOffset(n('mine-rails-nwe'), sprites.mine_rails_nwe, 16, 0, 0, railsExtra);
export const mineRailsSWE = decalOffset(n('mine-rails-swe'), sprites.mine_rails_swe, 16, 0, 0, railsExtra);

export const mineRailsEndLeft = doodad(n('mine-rails-end-left'), sprites.mine_rails_end_left, 17, 30, 0,
	mixColliderRect(-20, -10, 38, 23),
	railsExtra);

export const mineRailsEndRight = doodad(n('mine-rails-end-right'), sprites.mine_rails_end_right, 16, 30, 0,
	mixColliderRect(-16, -10, 38, 23),
	railsExtra);

export const mineRailsEndTop = doodad(n('mine-rails-end-top'), sprites.mine_rails_end_top, 16, 32, 0,
	mixColliderRect(-16, -32, 32, 32),
	railsExtra);

export const mineRailsFadeUp = decal(n('mine-rails-fade-up'), sprites.mine_rail_fade_up, 0,
	railsExtra);
