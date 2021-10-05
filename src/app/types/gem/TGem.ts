export type TGem = [TGemType, TGemQuality];

export const GemTypes: Array<TGemType> = [
    'ruby', 'sapphire', 'topaz',
    'emerald', 'diamond',
    'amethyst', 'skull'
];

export const GemQualities: Array<TGemQuality> = [
    'chipped', 'flawed', 'normal', 'flawless', 'perfect'
];

export type TGemType =
    'ruby' | 'sapphire' | 'topaz' |
    'emerald' | 'diamond' |
    'amethyst' | 'skull';

export type TGemQuality =
    'chipped' | 'flawed' | 'normal' | 'flawless' | 'perfect';

