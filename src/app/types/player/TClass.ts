export type TClass = typeof Classes[number];
export const Classes = ['amazon', 'assassin', 'barbarian', 'druid', 'necromancer', 'paladin', 'sorceress'] as const;

export type TClassUi = typeof ClassesUi[number];
export const ClassesUi = [...Classes, 'hireling', 'ui'] as const;
