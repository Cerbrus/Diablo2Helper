import { IRune } from '~interfaces/rune';
import { ITable } from '~interfaces/ui';

export type TRuneSortKeys = 'name' | 'owned' | 'number';
export type TRuneSort = Record<TRuneSortKeys, ITable<IRune>>;
