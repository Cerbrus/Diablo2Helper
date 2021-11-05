import { ICraftable } from '~interfaces/crafting';

export class CraftableHelper {
    public static sortByCraftable(a: ICraftable, b: ICraftable, asc: boolean): number {
        const [valA, valB] = [this.getCraftableSortValue(a), this.getCraftableSortValue(b)];
        return asc ? valB - valA : valA - valB;
    }

    private static getCraftableSortValue(item: ICraftable): number {
        return item.craft ? (item.craft.hasMaterials ? 2 : item.craft.canCraftMaterials ? 1 : 0) : 0;
    }
}
