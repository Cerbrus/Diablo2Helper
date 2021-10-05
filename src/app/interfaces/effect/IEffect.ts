import { EffectType } from '../../enums/EffectType';
import { TEffect } from '../../types';
import { IEffectValueMinMax, IEffectValueNumber } from '.';

export interface IEffect {
    description: TEffect;
    value?: number | IEffectValueNumber | IEffectValueMinMax;
    type: EffectType;
}
