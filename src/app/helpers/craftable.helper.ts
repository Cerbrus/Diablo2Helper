import { Injectable } from '@angular/core';
import { BaseEntitiesHelper } from '~helpers/base-entities.helper';
import { GemHelper } from '~helpers/gem.helper';
import { RuneHelper } from '~helpers/rune.helper';
import { RuneWordHelper } from '~helpers/runeWord.helper';
import { ArrayHelper, ObjectHelper } from '~helpers/ts';
import { ICraftable } from '~interfaces/crafting';
import { IGem } from '~interfaces/gem';
import { IRune } from '~interfaces/rune';
import { TGem } from '~types/gem';
import { ItemOrArray } from '~types/helpers';
import { TRune } from '~types/rune';

@Injectable({ providedIn: 'root' })
export class CraftableHelper {
    constructor(
        private readonly gemHelper: GemHelper,
        private readonly runeHelper: RuneHelper,
        private readonly runeWordHelper: RuneWordHelper
    ) {}

    public calculateCraftability(): void {
        [...this.gemHelper.itemsArray, ...this.runeHelper.itemsArray, ...this.runeWordHelper.itemsArray].forEach(item =>
            this.calculateCraftabilityFor(item)
        );
    }

    public calculateCraftabilityFor(craftable: ICraftable): void {
        const craft = (craftable.craft = craftable.craft ?? {});
        craft.hasMaterials = this.hasMaterialsFor(craftable);
        craft.canCraftMaterials = craft.hasMaterials ? true : this.canCraftMaterialsFor(craftable);
    }

    public hasMaterialsFor({ craft }: ICraftable): boolean {
        return (
            !!craft &&
            craft.craftable !== false &&
            (!craft.gems || this.hasRequiredItems(craft.gems, this.gemHelper)) &&
            (!craft.runes || this.hasRequiredItems(craft.runes, this.runeHelper))
        );
    }

    public canCraftMaterialsFor({ craft }: ICraftable): boolean {
        // TODO
        return false;
        // if (!craft || craft.craftable === false) return false;
        //
        // if (
        //     craft.gems &&
        //     !this.hasRequiredItems(ArrayHelper.toArray(craft.gems).map(this.gemHelper.getType), this.gemHelper)
        // )
        //     return false;
        //
        // if (
        //     craft.runes &&
        //     !this.hasRequiredItems(ArrayHelper.toArray(craft.runes).map(this.runeHelper.getType), this.runeHelper)
        // )
        //     return false;
        //
        // return true;
    }

    private hasRequiredItems<TItem extends TGem | TRune, TEntity extends IGem | IRune>(
        items: ItemOrArray<TItem | TEntity>,
        helper: BaseEntitiesHelper<any, TItem, TEntity, any>
    ): boolean {
        const requiredItems = ArrayHelper.countStringOccurrences(ArrayHelper.toArray(items).map(helper.getType));

        return ObjectHelper.every(
            requiredItems,
            (requiredItem: TItem, requiredAmount: number) => (helper.getItem(requiredItem).owned ?? 0) >= requiredAmount
        );
    }

    public static sortByCraftable(a: ICraftable, b: ICraftable, asc: boolean): number {
        const [valA, valB] = [this.getCraftableSortValue(a), this.getCraftableSortValue(b)];
        return asc ? valB - valA : valA - valB;
    }

    private static getCraftableSortValue(item: ICraftable): number {
        return item.craft ? (item.craft.hasMaterials ? 2 : item.craft.canCraftMaterials ? 1 : 0) : 0;
    }
}
