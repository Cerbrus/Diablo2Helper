import { TRune, TRuneSort } from '../types/rune';
import { TRuneWord, TRuneWordSort } from '../types/runeWord';
import { IRuneWordFilters } from './runeWord';

export interface IStorage {
    activeTabs: Record<string, string>;
    darkMode: boolean;
    runeSort: TRuneSort;
    runeWordFilters: IRuneWordFilters;
    runeWordSort: TRuneWordSort;
    runeWordsOwned: Partial<Record<TRuneWord, number>>;
    runesOwned: Partial<Record<TRune, number>>;
    uiCollapsibleState: Partial<Record<string, boolean>>;
}
