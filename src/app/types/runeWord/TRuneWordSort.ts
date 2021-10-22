import { IRuneWord } from '~interfaces/runeWord';
import { ITable } from '~interfaces/ui';

export type TRuneWordSortKeys = 'runes' | 'name' | 'cLvl' | 'owned';
export type TRuneWordSort = Record<TRuneWordSortKeys, ITable<IRuneWord>>;
