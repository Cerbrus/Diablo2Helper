import { TRuneWord } from '~types/runeWord';
import { IRuneWord } from '.';

export interface IRuneWordMap extends TRuneWordMap {
}

type TRuneWordMap = {
    [key in TRuneWord]: IRuneWord & { name: key };
};
