export type TItem = typeof Items[number];
export const Items = [
    'all',
    'weaponsMelee',
    'axe',
    'claw',
    'club',
    'hammer',
    'mace',
    'poleArm',
    'scepter',
    'stave',
    'sword',
    'wand',
    'weaponsRanged',
    'bow',
    'crossbow',
    'armor',
    'armorHead',
    'armorBody',
    'shield',
    'paladinShield'
] as const;

export type TItemCollection = typeof Items[number];
export const ItemCollections = ['all', 'weaponsMelee', 'weaponsRanged', 'armor'] as const;
