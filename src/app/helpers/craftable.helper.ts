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

    public static sortByCraftable(a: ICraftable, b: ICraftable, asc: boolean): number {
        const [valA, valB] = [this.getCraftableSortValue(a), this.getCraftableSortValue(b)];
        return asc ? valB - valA : valA - valB;
    }

    private static getCraftableSortValue(item: ICraftable): number {
        return item.craft ? (item.craft.hasMaterials ? 2 : item.craft.canCraftMaterials ? 1 : 0) : 0;
    }

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

    public canCraftMaterialsFor(
        { craft }: ICraftable,
        usedRunes?: Partial<Record<TRune, number>>,
        usedGems?: Partial<Record<TGem, number>>
    ): boolean {
        if (!craft) return true;
        const ownRunes = this.getRunesOwned();
        const ownGems = this.getGemsOwned();
        const canCraft =
            ArrayHelper.toArray(craft.runes).every(r => r && this.hasOrCanCraftRune(ownRunes, r, 1, usedRunes)) &&
            ArrayHelper.toArray(craft.gems).every(r => r && this.hasOrCanCraftGem(ownGems, r, 1, usedGems));

        craft.canCraftMaterials = canCraft;

        return canCraft;
    }

    public hasOrCanCraftRune(
        ownedRunes: Record<TRune, number>,
        runeToCraft: TRune | IRune,
        amountNeeded = 1,
        usedRunes?: Partial<Record<TRune, number>>
    ): boolean {
        runeToCraft = this.runeHelper.asItem(runeToCraft);
        const craft = runeToCraft.name;

        if (ownedRunes[craft] >= amountNeeded) {
            ownedRunes[craft] -= amountNeeded;

            if (usedRunes) usedRunes[craft] = (usedRunes[craft] ?? 0) + amountNeeded;
            return true;
        } else {
            if (usedRunes && ownedRunes[craft]) usedRunes[craft] = ownedRunes[craft];

            const missingCount = amountNeeded - (ownedRunes[craft] ?? 0);
            ownedRunes[craft] = 0;

            const neededRunes = runeToCraft.craft?.runes;

            return (
                !!neededRunes &&
                ObjectHelper.every(
                    ArrayHelper.countStringOccurrences(neededRunes),
                    (requiredRune: TRune, amountForCraft: number) =>
                        this.hasOrCanCraftRune(ownedRunes, requiredRune, missingCount * amountForCraft, usedRunes)
                )
            );
        }
    }

    public hasOrCanCraftGem(
        ownedGems: Record<TGem, number>,
        gemToCraft: TGem | IGem,
        amountNeeded = 1,
        usedGems?: Partial<Record<TGem, number>>
    ): boolean {
        gemToCraft = this.gemHelper.asItem(gemToCraft);
        const craft = this.gemHelper.asType(gemToCraft);

        if (ownedGems[craft] >= amountNeeded) {
            ownedGems[craft] -= amountNeeded;

            if (usedGems) usedGems[craft] = (usedGems[craft] ?? 0) + amountNeeded;
            return true;
        } else {
            if (usedGems && ownedGems[craft]) usedGems[craft] = ownedGems[craft];

            const missingCount = amountNeeded - (ownedGems[craft] ?? 0);
            ownedGems[craft] = 0;

            const neededGems = ArrayHelper.toArray(gemToCraft.craft?.gems).map(gem =>
                this.gemHelper.asType(<TGem | IGem>gem)
            );

            return (
                !!neededGems &&
                ObjectHelper.every(
                    ArrayHelper.countStringOccurrences(neededGems),
                    (requiredGem: TGem, amountForCraft: number) =>
                        this.hasOrCanCraftGem(ownedGems, requiredGem, missingCount * amountForCraft, usedGems)
                )
            );
        }
    }

    public getRunesOwned(): Record<TRune, number> {
        const runes = this.runeHelper.itemsArray.filter(r => r.owned);
        return ArrayHelper.toRecordWithKey(
            runes,
            rune => rune.name,
            rune => rune.owned ?? 0
        );
    }

    public getGemsOwned(): Record<TGem, number> {
        const gems = this.gemHelper.itemsArray.filter(r => r.owned);
        return ArrayHelper.toRecordWithKey(
            gems,
            gem => `${gem.quality}|${gem.type}`,
            gem => gem.owned ?? 0
        );
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
}
