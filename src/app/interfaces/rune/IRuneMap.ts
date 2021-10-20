import { TRune } from '~types/rune';
import { IRune } from '.';

export interface IRuneMap extends TRuneMap {}

type TRuneMap = {
    [key in TRune]: IRune & { name: key };
};
