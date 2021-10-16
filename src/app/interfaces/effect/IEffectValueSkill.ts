import { TClass, TSkill, TSkillGroup } from '../../types';

export interface IEffectValueSkill {
    count: number;
    skill: TSkill | TSkillGroup | 'All';
    class?: string;
    classRestriction?: TClass | 'all';
    charges?: number;
}
