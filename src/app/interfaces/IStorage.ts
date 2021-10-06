import { TRune, TRuneSort } from '../types/rune';
import { TRuneWord, TRuneWordSort } from '../types/runeWord';
import { IRuneWordFilters } from './runeWord';

export interface IStorage {
    darkMode: boolean;
    runeSort: TRuneSort;
    runeWordFilters: IRuneWordFilters;
    runeWordSort: TRuneWordSort;
    runeWordsOwned: Partial<Record<TRuneWord, number>>;
    runesOwned: Partial<Record<TRune, number>>;
    uiActiveTabs: Record<string, string>;
    uiCollapsibleState: Partial<Record<string, boolean>>;
}
