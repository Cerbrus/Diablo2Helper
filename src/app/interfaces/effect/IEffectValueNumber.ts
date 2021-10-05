import { IEffectValue } from './IEffectValue';

export interface IEffectValueNumber extends IEffectValue {
    value: number;
    unit?: '%' | '';
}
