import { TItem } from '~types';

export interface IRuneWordFilters {
    cLvl?: number;
    name?: string;
    showUnavailable: boolean;
    showCraftable: boolean;
    itemTypes: { [key in TItem]?: boolean };
}
