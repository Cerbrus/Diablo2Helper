import { IItem } from '@dschu012/d2s/lib/d2/types';
import { BaseEntityFactory } from '~factories/base-entity.factory';
import { ITable } from '~interfaces/ui';
import { ItemOrArray } from '~types/helpers';
import { ArrayHelper, ObjectHelper } from './ts';

export abstract class BaseEntitiesHelper<
    TEntityMap,
    TType,
    TEntity,
    TSort extends Record<keyof TSort, ITable<TEntity>>
> {
    public entitySort!: TSort;

    public get itemsArray(): Array<TEntity> {
        if (!this.itemsArrayCache) {
            this.itemsArrayCache = Object.values(this.items);
            if (!this.isItem(this.itemsArrayCache[0])) {
                this.itemsArrayCache = this.itemsArrayCache.map(i => Object.values(i)).flat();
            }
        }
        return this.itemsArrayCache;
    }

    public itemsArraySorted!: Array<TEntity>;

    public items!: TEntityMap;

    private itemsArrayCache!: Array<TEntity>;

    protected constructor(private readonly entityFactory: BaseEntityFactory<TEntityMap>) {
        this.items = this.entityFactory.buildItems();
    }

    public abstract fromSaveItem(item: IItem): TEntity | null;

    public abstract getItem(item: TType): TEntity;

    public abstract getType(item: TType | TEntity): TType;

    public abstract isItem<T>(item: any): item is TEntity;

    public abstract isType(item: any): item is TType;

    public abstract saveEntitiesOwned(): void;

    public asItem(item: TType | TEntity): TEntity;
    public asItem(item: Array<TType | TEntity>): Array<TEntity>;
    public asItem(item: ItemOrArray<TType | TEntity>): ItemOrArray<TEntity> {
        return item instanceof Array ? item.map(i => this.asItem(i)) : this.isItem(item) ? item : this.getItem(item);
    }

    public asType(item: TType | TEntity): TType;
    public asType(item: Array<TType | TEntity>): Array<TType>;
    public asType(item: ItemOrArray<TType | TEntity>): ItemOrArray<TType> {
        return item instanceof Array ? item.map(i => this.asType(i)) : this.isType(item) ? item : this.getType(item);
    }

    protected abstract applySort?(changedSort?: ITable<TEntity>): void;

    protected applyChangedSort<TKey extends keyof TSort>(
        sortMethods: Record<TKey, (a: TEntity, b: TEntity, asc: boolean) => number>,
        defaultMethod: TKey,
        changedSort?: ITable<TEntity>
    ): void {
        if (changedSort) {
            ObjectHelper.forEach(this.entitySort, (key, current) => {
                if (changedSort !== current) current.direction = 'none';
            });
        }

        const unsorted = [undefined, 'none'];
        const [key, activeSort] = <[TKey, ITable<TEntity>]>(
            (ObjectHelper.find(this.entitySort, (key, current) => !unsorted.includes(current.direction)) ?? [])
        );

        const sortMethod = sortMethods[key ?? defaultMethod];

        this.itemsArraySorted = ArrayHelper.clone(this.itemsArray).sort((a, b) =>
            sortMethod(a, b, activeSort?.direction !== 'desc')
        );
    }
}
