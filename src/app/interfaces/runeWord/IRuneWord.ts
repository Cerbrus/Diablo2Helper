import { TEffectApplication, TEffectKey, TItem } from '~types';
import { ItemOrArray } from '~types/helpers';
import { TRune } from '~types/rune';
import { TRuneWord } from '~types/runeWord';
import { IEffect } from '../effect';
import { IRune } from '../rune';

export interface IRuneWord {
    name: TRuneWord;
    cLvl: number;
    effects: ItemOrArray<IEffect | TEffectKey | TEffectApplication>;
    runes: Array<TRune | IRune>;
    itemTypes: ItemOrArray<TItem>;
    owned?: number;
}
