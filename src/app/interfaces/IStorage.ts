import { TGem } from '~types/gem';
import { TRune, TRuneSort } from '~types/rune';
import { TRuneWord, TRuneWordSort } from '~types/runeWord';
import { ISettings } from './';
import { IRuneWordFilters } from './runeWord';

export interface IStorage {
    appVersion: string;
    darkMode: boolean;
    gemsOwned: Partial<Record<TGem, number>>;
    runeSort: TRuneSort;
    runeWordFilters: IRuneWordFilters;
    runeWordSort: TRuneWordSort;
    runeWordsOwned: Partial<Record<TRuneWord, number>>;
    runesOwned: Partial<Record<TRune, number>>;
    settings: ISettings;
    uiActiveTabs: Record<string, string>;
    uiCollapsibleState: Partial<Record<string, boolean>>;
}
