import { PONY_TYPE, tileWidth, tileHeight } from './constants';
import { EntityFlags, defaultWorldState } from './interfaces';
import { hasFlag } from './utils';
import { mockPaletteManager } from './ponyInfo';
import { entities, pony, createAnEntity, getEntityTypeName } from './entities/entitiesCore';

export {
	createBaseEntity, createAnEntity, getEntityType, getEntityTypeName, getEntityTypesAndNames,
	pony, triggerDoor, triggerHouseDoor, triggerBoat, trigger3x1
} from './entities/entitiesCore';

export * from './entities/entitiesHouse';
export * from './entities/entitiesBoat';
export * from './entities/entitiesPickables';
export * from './entities/entitiesHalloween';
export * from './entities/entitiesLighting';
export * from './entities/entitiesEaster';
export * from './entities/entitiesSigns';
export * from './entities/entitiesFurniture';
export * from './entities/entitiesWalls';
export * from './entities/entitiesRocks';
export * from './entities/entitiesFences';
export * from './entities/entitiesWeather';
export * from './entities/entitiesFlora';
export * from './entities/entitiesGifts';
export * from './entities/entitiesWinter';
export * from './entities/entitiesPumpkins';
export * from './entities/entitiesTorch';
export * from './entities/entitiesCritters';
export * from './entities/entitiesVegetation';
export * from './entities/entitiesCliffs';
export * from './entities/entitiesCave';
export * from './entities/entitiesCrystals';
export * from './entities/entitiesMine';
export * from './entities/entitiesColliders';
export * from './entities/entitiesTrees';
export * from './entities/entitiesLists';

if (DEVELOPMENT) {
	if (pony.type !== PONY_TYPE) {
		throw new Error(`Invalid pony type ${pony.type} !== ${PONY_TYPE}`);
	}

	for (const { type } of entities) {
		if (type === 0) {
			continue;
		}

		const entity = createAnEntity(type, 0, 0, 0, {}, mockPaletteManager, defaultWorldState);
		const name = getEntityTypeName(type);

		if (entity.colliders) {
			const maxWidth = (hasFlag(entity.flags, EntityFlags.Movable) ? 1 : 4) * tileWidth;
			const maxHeight = (hasFlag(entity.flags, EntityFlags.Movable) ? 1 : 5) * tileHeight;

			for (const { x, y, w, h } of entity.colliders) {
				if ((x < -maxWidth || (x + w) > maxWidth || y < -maxHeight || (y + h) > maxHeight)) {
					throw new Error(`Invalid entity "${name}": Collider too large ${JSON.stringify({ x, y, w, h })}`);
				}
			}
		}
	}
}
