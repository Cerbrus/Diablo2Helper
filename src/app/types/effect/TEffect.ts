// noinspection JSUnusedGlobalSymbols

export type TEffectKey = `${
    | 'absorb'
    | 'chance'
    | 'damage'
    | 'effect'
    | 'on.hit'
    | 'on.kill'
    | 'resist'
    | 'skill'
    | 'stat'}.${string}`;

export type TEffectDescriptionKey = `effect.${TEffectKey}`;

export type TEffectApplication = `appliesTo.${'armor' | 'both' | 'headgear' | 'shields' | 'swords' | 'weapons'}`;
