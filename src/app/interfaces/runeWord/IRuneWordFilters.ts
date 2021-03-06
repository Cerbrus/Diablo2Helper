import { TItem } from '~types';

export interface IRuneWordFilters {
    cLvl?: number;
    numberOfRunes?: number;
    itemTypes: { [key in TItem]?: boolean };
    name?: string;
    showCraftable: boolean;
    showFavorite: boolean;
    showUnavailable: boolean;
}
