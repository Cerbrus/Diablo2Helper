import { ITable } from '../../interfaces';
import { IRune } from '../../interfaces/rune';

export type TRuneSortKeys = 'name' | 'owned' | 'number';
export type TRuneSort = Record<TRuneSortKeys, ITable<IRune>>;
