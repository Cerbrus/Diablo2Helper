import { ItemOrArray } from '~types/helpers';
import { IWeaponArmorHelmShield } from '../socketable';
import { IEffect } from './';

export interface IEffectBuilders<W, A, S> extends IEffectBuildersType<W, A, S> {
}

export interface IEffectBuilderParams<W, A, S> extends IEffectBuilderParamsType<W, A, S> {
}

type IEffectBuildersType<W, A, S> = {
    [key in keyof IWeaponArmorHelmShield<W, A, S>]: EffectBuilder<IWeaponArmorHelmShield<W, A, S>[key]>
}

type IEffectBuilderParamsType<W, A, S> = {
    [key in keyof IWeaponArmorHelmShield<W, A, S>]: ParamsArray<IWeaponArmorHelmShield<W, A, S>[key]>
}

type EffectBuilder<T> = (params: T) => ItemOrArray<IEffect>;

type ParamsArray<TValue> = [
    chipped: TValue,
    flawed: TValue,
    normal: TValue,
    flawless: TValue,
    perfect: TValue
];
