import {
    TClass,
    TClassUi,
    TSkillAmazon,
    TSkillAssassin,
    TSkillBarbarian,
    TSkillDruid,
    TSkillHireling,
    TSkillNecromancer,
    TSkillPaladin,
    TSkillSorceress,
    TSkillUi
} from '../../types/player';

interface ISkill {
    amazon: TSkillAmazon;
    assassin: TSkillAssassin;
    barbarian: TSkillBarbarian;
    druid: TSkillDruid;
    necromancer: TSkillNecromancer;
    paladin: TSkillPaladin;
    sorceress: TSkillSorceress;
}

export interface ISkillUi extends ISkill {
    hireling: TSkillHireling;
    ui: TSkillUi
}

export type ISkillArray<C extends TClass> = {
    [key in C]: Array<ISkill[key]>
}

export type ISkillArrayUi<C extends TClassUi> = {
    [key in C]: Array<ISkillUi[key]>
}
