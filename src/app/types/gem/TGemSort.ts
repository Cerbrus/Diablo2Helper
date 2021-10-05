import { ITable } from '../../interfaces';
import { IGem } from '../../interfaces/gem';

export type TGemSortKeys = 'type' | 'quality';
export type TGemSort = Record<TGemSortKeys, ITable<IGem>>;
