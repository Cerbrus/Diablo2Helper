import { ICraftable } from '~interfaces/crafting';
import { TItem } from '~types';
import { TEffectApplication, TEffectKey } from '~types/effect';
import { ItemOrArray } from '~types/helpers';
import { TRuneWord } from '~types/runeWord';
import { IEffect } from '../effect';

export interface IRuneWord extends ICraftable {
    name: TRuneWord;
    cLvl: number;
    effects: ItemOrArray<IEffect | TEffectKey | TEffectApplication>;
    itemTypes: ItemOrArray<TItem>;
    owned?: number;
    favorite?: boolean;
}
