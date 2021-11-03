import { ICraftable } from '~interfaces/crafting';
import { TRune } from '~types/rune';
import { ISocketable } from '../socketable';

export interface IRune extends ISocketable<'Rune'>, ICraftable {
    number: number;
    name: TRune;
    iLvl?: number;
    owned?: number;
    track?: boolean;
}
