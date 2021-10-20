import { ItemOrArray } from '~types/helpers';
import { IWeaponArmorHelmShield } from '.';
import { IEffect } from '../effect';

export interface ISocketableEffects
    extends IWeaponArmorHelmShield<ItemOrArray<IEffect>, ItemOrArray<IEffect>, ItemOrArray<IEffect>> {}
