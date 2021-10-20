export abstract class BaseEntityFactory<TEntityMap> {
    public abstract buildItems(): TEntityMap;
}
