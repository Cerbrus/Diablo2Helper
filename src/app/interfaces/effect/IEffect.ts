import { EffectOptions, EffectType } from '~enums';
import { TEffectDescriptionKey } from '~types';
import { TClass, TSkill, TSkillGroup, TSkillRuneWord } from '~types/player';

export interface IEffect {
    description: TEffectDescriptionKey;
    type: EffectType;
    value?: string | number;
    options?: EffectOptions | null;
    parameters?: IEffectParameters;
}

export interface IEffectParameters {
    skill?: TSkill | TSkillGroup | TSkillRuneWord;
    level?: number;
    duration?: number;
    class?: TClass;
}
