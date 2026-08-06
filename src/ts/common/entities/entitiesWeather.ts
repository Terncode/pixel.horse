import * as sprites from '../../generated/sprites';
import { mixAnimation, mixDrawRain } from '../mixins';
import { registerMix, n } from './entitiesCore';

// rain

const rainColor = 0xffffff77; // 48

export const rain = registerMix(n('rain'),
	mixAnimation(sprites.rain, 12, 16, 512, { color: rainColor }));

export const raindrop = registerMix(n('raindrop'),
	mixAnimation(sprites.raindrop, 12, 4, 0, { color: rainColor }));

export const weatherRain = registerMix(n('weather-rain'), mixDrawRain());
