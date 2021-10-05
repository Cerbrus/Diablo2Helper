import { IWeaponArmorHelmShield } from '.';
import { ItemOrArray } from '../../types/helpers';
import { IEffect } from '../effect';

export interface ISocketableEffects
    extends IWeaponArmorHelmShield<ItemOrArray<IEffect>,
        ItemOrArray<IEffect>,
        ItemOrArray<IEffect>> {
}
