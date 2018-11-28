import { HERO } from './image-manager';
import AnimationDefenition from './core/animation-defenition';

export const HERO_WALK_UP = AnimationDefenition.fromArrays(
    HERO,
    [16, 16],
    [
        0, 0,
        1, 0,
        2, 0,
        3, 0,
    ]
);

export const HERO_WALK_DOWN = AnimationDefenition.fromArrays(
    HERO,
    [16, 16],
    [
        4, 0,
        5, 0,
        6, 0,
        7, 0,
    ]
);

export const HERO_WALK_LEFT = AnimationDefenition.fromArrays(
    HERO,
    [16, 16],
    [
        0, 1,
        1, 1,
        2, 1,
        3, 1,
    ]
);

export const HERO_WALK_RIGHT = AnimationDefenition.fromArrays(
    HERO,
    [16, 16],
    [
        4, 1,
        5, 1,
        6, 1,
        7, 1,
    ]
);

export const HERO_PUNCH_LEFT = AnimationDefenition.fromArrays(
    HERO,
    [16, 16],
    [
        0, 2,
        1, 2,
    ]
);

export const HERO_PUNCH_RIGHT = AnimationDefenition.fromArrays(
    HERO,
    [16, 16],
    [
        2, 2,
        3, 2,
    ]
);

export const HERO_PUNCH_UP = AnimationDefenition.fromArrays(
    HERO,
    [16, 16],
    [
        4, 2,
        5, 2,
    ]
);

export const HERO_PUNCH_DOWN = AnimationDefenition.fromArrays(
    HERO,
    [16, 16],
    [
        6, 2,
        7, 2,
    ]
);
