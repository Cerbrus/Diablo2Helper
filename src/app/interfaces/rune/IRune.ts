import { ItemOrArray } from '~types/helpers';
import { TRune } from '~types/rune';
import { IGem } from '../gem';
import { ISocketable } from '../socketable';

export interface IRune extends ISocketable<'Rune'> {
    number: number;
    name: TRune;
    iLvl?: number;
    craft?: IRuneCraft;
    owned?: number;
    track?: boolean;
}

export interface IRuneCraft {
    runes: ItemOrArray<TRune>;
    gems?: ItemOrArray<IGem>;
}
