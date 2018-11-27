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
