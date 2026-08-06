import { tileWidth, tileHeight } from '../constants';
import { mixColliderRect } from '../mixins';
import { registerMix, n } from './entitiesCore';

// collider utils

export const collider1x1 = registerMix(n('collider-1x1'), mixColliderRect(0, 0, 1 * tileWidth, 1 * tileHeight, false, true));
export const collider2x1 = registerMix(n('collider-2x1'), mixColliderRect(0, 0, 2 * tileWidth, 1 * tileHeight, false, true));
export const collider3x1 = registerMix(n('collider-3x1'), mixColliderRect(0, 0, 3 * tileWidth, 1 * tileHeight, false, true));
export const collider1x2 = registerMix(n('collider-1x2'), mixColliderRect(0, 0, 1 * tileWidth, 2 * tileHeight, false, true));
export const collider1x3 = registerMix(n('collider-1x3'), mixColliderRect(0, 0, 1 * tileWidth, 3 * tileHeight, false, true));
