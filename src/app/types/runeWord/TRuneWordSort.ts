import { IRuneWord } from '~interfaces/runeWord';
import { ITable } from '~interfaces/ui';

export type TRuneWordSortKeys = 'owned' | 'name' | 'cLvl' | 'runes' | 'craft' | 'effect';
export type TRuneWordSort = Record<TRuneWordSortKeys, ITable<IRuneWord>>;
