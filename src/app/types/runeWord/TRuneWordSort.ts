import { ITable } from '../../interfaces';
import { IRuneWord } from '../../interfaces/runeWord';

export type TRuneWordSortKeys = 'runes' | 'name' | 'cLvl' | 'owned';
export type TRuneWordSort = Record<TRuneWordSortKeys, ITable<IRuneWord>>;
