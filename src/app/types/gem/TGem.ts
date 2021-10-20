import { IGem } from '~interfaces/gem';

export type TGem = `${TGemQuality}|${TGemType}`;

export const GemTypes: Array<TGemType> = [
    'ruby', 'sapphire', 'topaz',
    'emerald', 'diamond', 'amethyst',
    'skull'
];

export const GemQualities: Array<TGemQuality> = [
    'chipped', 'flawed', 'normal', 'flawless', 'perfect'
];

export type TGemType =
    'ruby' | 'sapphire' | 'topaz' |
    'emerald' | 'diamond' | 'amethyst' |
    'skull';

export type TGemQuality =
    'chipped' | 'flawed' | 'normal' | 'flawless' | 'perfect';

export type GemQualityMap<TType> = { [q in TGemQuality]: IGem & { type: TType, quality: q } };
