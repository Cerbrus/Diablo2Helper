import { IGem } from '../../interfaces/gem';
import { ITable } from '../../interfaces/ui';

export type TGemSortKeys = 'type' | 'quality';
export type TGemSort = Record<TGemSortKeys, ITable<IGem>>;
