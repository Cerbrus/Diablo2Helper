import { IGem } from '~interfaces/gem';

export type TGem = `${TGemQuality}|${TGemType}`;

export type TGemType = typeof GemTypes[number];
export const GemTypes = ['ruby', 'sapphire', 'topaz', 'emerald', 'diamond', 'amethyst', 'skull'] as const;

export type TGemQuality = typeof GemQualities[number];
export const GemQualities = ['chipped', 'flawed', 'normal', 'flawless', 'perfect'] as const;

export type GemQualityMap<TType> = { [q in TGemQuality]: IGem & { type: TType; quality: q } };
