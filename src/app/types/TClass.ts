export const Classes: Array<TClass> = [
    'amazon', 'assassin', 'barbarian', 'druid', 'necromancer', 'paladin', 'sorceress'
];

export type TClass =
    'amazon' | 'assassin' | 'barbarian' | 'druid' | 'necromancer' | 'paladin' | 'sorceress';

export const ClassesUi: Array<TClassUi> = [
    ...Classes,
    'hireling',
    'ui'
];
export type TClassUi = TClass | 'hireling' | 'ui';
