import { IRuneWord } from '~interfaces/runeWord';
import { ITable } from '~interfaces/ui';

export type TRuneWordSortKeys = 'runes' | 'name' | 'cLvl' | 'owned' | 'craft';
export type TRuneWordSort = Record<TRuneWordSortKeys, ITable<IRuneWord>>;
