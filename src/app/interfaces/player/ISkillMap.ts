import { Classes, Skills, TClass } from '~types/player';

export interface ISkillMap extends TSkillMap {}

type TSkillMap = {
    [c in typeof Classes[number]]: TSkillTree<c>;
};

export type TSkillTree<c extends typeof Classes[number]> = [TSkillTreeTab<c>, TSkillTreeTab<c>, TSkillTreeTab<c>];

export type TSkillTreeTab<c extends typeof Classes[number]> = {
    name: string;
    skills: Array<IClassSkill<c>>;
};

export interface IClassSkill<c extends typeof Classes[number]> {
    tier: 1 | 2 | 3 | 4 | 5 | 6;
    position: 0 | 1 | 2;
    index?: number;
    name: typeof Skills[c][number];
}

export const SkillTrees: Record<TClass, Array<string>> = {
    amazon: ['Javelin and Spear', 'Passive and Magic', 'Bow and Crossbow'],
    assassin: ['', '', ''],
    barbarian: ['', '', ''],
    druid: ['', '', ''],
    necromancer: ['', '', ''],
    paladin: ['', '', ''],
    sorceress: ['', '', '']
};
