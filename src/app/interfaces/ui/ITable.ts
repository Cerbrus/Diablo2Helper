import { Key, SuffixKey } from '~types/helpers';

type TableSortIcons = 'amount' | 'alpha' | 'numeric';
export type TableSortIcon = TableSortIcons | SuffixKey<TableSortIcons, 'Alt'>;
export type TableSortDirection = 'none' | 'asc' | 'desc';

export interface ITable<T> {
    key: keyof T;
    direction?: TableSortDirection;
    icon?: TableSortIcon;
}

export interface ITableHeader<TSort extends Record<Key, ITable<Entity>>, Entity> {
    title: string;
    key: keyof TSort;
    width?: number;
    colSpan?: number;
}
