import { IRuneWord } from '.';
import { TRuneWord } from '../../types/runeWord';

export interface IRuneWordMap extends TRuneWordMap {
}

type TRuneWordMap = {
    [key in TRuneWord]: IRuneWord & { name: key };
};
