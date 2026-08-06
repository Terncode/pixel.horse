import { compact } from 'lodash';
import {
	Entity, PaletteManager, ServerFlags, PaletteRenderable, EntityDescriptor, EntityOptions,
	CreateEntityMethod, CreateEntity, EntityFlags, MixinEntity, EntityWorldState, defaultWorldState, InteractAction
} from '../interfaces';
import { ENTITY_TYPE_LIMIT } from '../constants';
import {
	setPaletteManager, ponyColliders, ponyCollidersBounds, mixTrigger, mixDraw, mixInteract
} from '../mixins';
import { times } from '../utils';
import { rect } from '../rect';

export const entities: EntityDescriptor[] = [];

export function createBaseEntity(type: number, id: number, x: number, y: number): Entity {
	return { id, type, x, y, z: 0, vx: 0, vy: 0, depth: 0, order: 0, state: 0, playerState: 0, flags: 0, timestamp: 0 };
}

function createEntity(
	type: number, id: number, x: number, y: number, options: EntityOptions, worldState: EntityWorldState
): Entity {
	const descriptor = entities[type];

	if (!descriptor) {
		throw new Error(`Invalid entity type ${type}`);
	}

	return descriptor.create(createBaseEntity(type, id, x, y), options, worldState);
}

export function register(typeName: string, create: CreateEntity): CreateEntityMethod {
	if (DEVELOPMENT && entities.length >= ENTITY_TYPE_LIMIT) {
		throw new Error(`Exceeded entity limit of ${ENTITY_TYPE_LIMIT} with (${typeName})`);
	}

	if (DEVELOPMENT && entities.some(e => e.typeName === typeName)) {
		throw new Error(`Entity name already registered (${typeName})`);
	}

	const type = entities.length;
	entities.push({ type, typeName, create });
	const method: any = (x: number, y: number, options: EntityOptions = {}, worldState: EntityWorldState = defaultWorldState) =>
		createEntity(type, 0, x, y, options, worldState);
	method.type = type;
	method.typeName = typeName;

	return method;
}

export function registerMix(typeName: string, ...mixins: (MixinEntity | undefined)[]) {
	const mixinsCompacted = compact(mixins);

	return register(typeName, (base, options, worldState) => {
		for (const mixin of mixinsCompacted) {
			mixin(base, options, worldState);
		}

		return base;
	});
}

export function getEntityTypeName(type: number): string {
	return entities[type].typeName;
}

export function getEntityType(typeName: string): number {
	for (let i = 1; i < entities.length; i++) {
		if (entities[i].typeName === typeName) {
			return i;
		}
	}

	return 0;
}

export function getEntityTypesAndNames() {
	return entities.map(({ type, typeName }) => ({ type, name: typeName }));
}

function checkEntity(entity: Entity) {
	if (entity.draw && !entity.bounds) {
		console.error('missing bounds for', getEntityTypeName(entity.type), entity);
	}

	if (entity.drawLight && !entity.lightBounds) {
		console.error('missing lightBounds for', getEntityTypeName(entity.type), entity);
	}

	if (entity.drawLightSprite && !entity.lightSpriteBounds) {
		console.error('missing lightSpriteBounds for', getEntityTypeName(entity.type), entity);
	}
}

export function createAnEntity(
	type: number, id: number, x: number, y: number, options: any, paletteManager: PaletteManager,
	worldState: EntityWorldState
): Entity {
	setPaletteManager(paletteManager);

	const entity = createEntity(type, id, x, y, options, worldState);

	if (DEVELOPMENT) {
		checkEntity(entity);
	}

	return entity;
}

// helpers

// strips names in release build
export function n(value: string) {
	return (DEVELOPMENT || SERVER) ? value : '';
}

export function mixCover(x: number, y: number, w: number, h: number): MixinEntity {
	const bounds = rect(x, y, w, h);
	return base => base.coverBounds = bounds;
}

export function mixFlags(flags: EntityFlags): MixinEntity {
	return base => base.flags |= flags;
}

export function mixInteractAction(action: InteractAction): MixinEntity {
	return base => base.interactAction = action;
}

export function mixBounds(x: number, y: number, w: number, h: number): MixinEntity {
	const bounds = rect(x, y, w, h);
	return base => base.bounds = bounds;
}

export function mixServerFlags(flags: ServerFlags): MixinEntity {
	if (SERVER) {
		return base => base.serverFlags! |= flags;
	} else {
		return () => { };
	}
}

export function mixOrder(order: number): MixinEntity {
	return base => base.order = order;
}

export const collectableInteractive = mixInteract(-8, -12, 16, 16, 1.5);

// entity with centered sprite and larger clickable area
export function collectable(name: string, sprite: PaletteRenderable, paletteIndex = 0, ...other: MixinEntity[]) {
	return doodad(name, sprite, Math.floor(sprite.color!.w / 2), sprite.color!.h - 1, paletteIndex,
		collectableInteractive,
		...other);
}

// for ground details. puts origin point on the top of sprite, so you always go on top of it. collectables are able to spawn overlapping decals
export function decal(name: string, sprite: PaletteRenderable, palette = 0, ...other: MixinEntity[]) {
	return registerMix(name,
		mixDraw(sprite, Math.floor((sprite.color!.w + sprite.color!.ox) / 2), sprite.color!.oy, palette),
		mixFlags(EntityFlags.Decal),
		...other);
}

export function decalOffset(name: string, sprite: PaletteRenderable, dx: number, dy: number, palette = 0, ...other: MixinEntity[]) {
	return registerMix(name,
		mixDraw(sprite, dx, dy, palette),
		mixFlags(EntityFlags.Decal),
		...other);
}

// for decorative objects
export function doodad(
	name: string, sprite: PaletteRenderable, ox: number, oy: number, palatte = 0, ...other: (MixinEntity | undefined)[]
) {
	return registerMix(name, mixDraw(sprite, ox, oy, palatte), ...compact(other));
}

export function doodadSet(name: string, sprite: PaletteRenderable, ox: number, oy: number, ...other: MixinEntity[]) {
	return times(sprite.palettes!.length, i => registerMix(`${name}-${i}`, mixDraw(sprite, ox, oy, i), ...other));
}

// placeholder entity

registerMix(n('null'), () => { throw new Error('Invalid type (0)'); });

// entities

export const pony = registerMix(n('pony'),
	base => {
		base.flags = EntityFlags.Movable | EntityFlags.CanCollide;
		base.colliders = ponyColliders;
		base.collidersBounds = ponyCollidersBounds;
	},
	mixServerFlags(ServerFlags.DoNotSave));

// triggers

export const triggerDoor = registerMix(n('trigger-door'),
	mixTrigger(-32, -6, 64, 12, true));

export const triggerHouseDoor = registerMix(n('trigger-house-door'),
	mixTrigger(-32, -6, 64, 12, false));

export const triggerBoat = registerMix(n('trigger-boat'),
	mixTrigger(-50, -12, 100, 24, false));

export const trigger3x1 = registerMix(n('trigger-3x1'),
	mixTrigger(-48, 0, 96, 24, true));
