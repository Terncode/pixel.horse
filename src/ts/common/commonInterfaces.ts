export const enum Season {
    Summer = 1,
    Autumn = 2,
    Winter = 4,
    Spring = 8,
}

export const enum Holiday {
    None,
    Christmas,
    Halloween,
    StPatricks,
    Easter,
}

export const enum Weather {
    None,
    Rain,
}

export const enum MapType {
    None,
    Island,
    House,
    Cave,
}

export const enum MapFlags {
    None = 0,
    EditableWalls = 1,
    EditableEntities = 2,
    EditableTiles = 4,
    EdibleGrass = 8,
}