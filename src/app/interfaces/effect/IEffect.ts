import { IEffectValueMinMax, IEffectValueNumber, IEffectValueSkill } from '.';
import { EffectType } from '../../enums/EffectType';
import { TEffect } from '../../types';

export interface IEffect {
    description: TEffect;
    value?: number | IEffectValueNumber | IEffectValueMinMax | IEffectValueSkill;
    type: EffectType;
}
