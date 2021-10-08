import { TGem } from '../types/gem';
import { TRune, TRuneSort } from '../types/rune';
import { TRuneWord, TRuneWordSort } from '../types/runeWord';
import { IRuneWordFilters } from './runeWord';

export interface IStorage {
    darkMode: boolean;
    runeSort: TRuneSort;
    runeWordFilters: IRuneWordFilters;
    runeWordSort: TRuneWordSort;
    gemsOwned: Partial<Record<TGem, number>>;
    runeWordsOwned: Partial<Record<TRuneWord, number>>;
    runesOwned: Partial<Record<TRune, number>>;
    uiActiveTabs: Record<string, string>;
    uiCollapsibleState: Partial<Record<string, boolean>>;
}
