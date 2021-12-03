import { Injectable } from '@angular/core';
import { BaseEntitiesHelper } from '~helpers/base-entities.helper';
import { GemHelper } from '~helpers/gem.helper';
import { RuneHelper } from '~helpers/rune.helper';
import { RuneWordHelper } from '~helpers/runeWord.helper';
import { ArrayHelper, ObjectHelper } from '~helpers/ts';
import { ICraftable } from '~interfaces/crafting';
import { IGem } from '~interfaces/gem';
import { IRune } from '~interfaces/rune';
import { IRuneWord } from '~interfaces/runeWord';
import { StorageService } from '~services';
import { TGem } from '~types/gem';
import { ItemOrArray } from '~types/helpers';
import { TRune } from '~types/rune';
import { TRuneWord } from '~types/runeWord';

type TType = TGem | TRune | TRuneWord;
type TCEntity = (IGem | IRune | IRuneWord) & ICraftable;

@Injectable({ providedIn: 'root' })
export class CraftableHelper {
    constructor(
        private readonly gemHelper: GemHelper,
        private readonly runeHelper: RuneHelper,
        private readonly runeWordHelper: RuneWordHelper,
        private readonly storageService: StorageService
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

    public calculateCraftabilityFor(craftable: ICraftable & { name: string }): void {
        const craft = (craftable.craft = craftable.craft ?? {});
        craft.hasMaterials = this.canCraft(craftable);
        craft.canCraftMaterials = craft.hasMaterials || this.canCraftMaterialsFor(craftable);
    }

    public canCraft(craftable: ICraftable): boolean {
        const { craft } = craftable;

        return !craft || craft.craftable === false || (!craft.gems && !craft.runes)
            ? false
            : !(
                  (craft.gems && !this.hasRequiredItems(craft.gems, this.gemHelper)) ||
                  (craft.runes && !this.hasRequiredItems(craft.runes, this.runeHelper))
              );
    }

    public canCraftMaterialsFor(
        { craft, name }: ICraftable & { name: string },
        usedRunes?: Partial<Record<TRune, number>>,
        usedGems?: Partial<Record<TGem, number>>
    ): boolean {
        if (!craft) return true;
        const ownRunes = this.getRunesOwned();
        const ownGems = this.getGemsOwned();
        const runes = ArrayHelper.toArray(craft.runes);
        const gems = ArrayHelper.toArray(craft.gems);

        const canCraftRunes =
            !!runes.length && runes.every(rune => rune && this.hasOrCanCraftRune(ownRunes, rune, 1, usedRunes));
        const canCraftGems =
            !!gems.length && gems.every(gem => gem && this.hasOrCanCraftGem(ownGems, gem, 1, usedGems));

        craft.canCraftMaterials = canCraftRunes && canCraftGems;

        return craft.canCraftMaterials;
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
                !!neededRunes?.length &&
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
                !!neededGems.length &&
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

    public calculateRunes(): void {
        [...this.runeHelper.itemsArray].reverse().forEach(rune => {
            this.calculateCraftabilityFor(rune);
        });
    }

    public craft<TItem extends TType, TEntity extends TCEntity>(
        craftable: TEntity,
        helper: BaseEntitiesHelper<any, TItem, TEntity, any>
    ): void {
        if (!craftable.craft) return this.incrementOwnedCount(craftable, helper);

        if (craftable.craft && this.hasRequiredItems(craftable.craft.runes as any, this.runeHelper)) {
            const usedRunes = ArrayHelper.countStringOccurrences(<ItemOrArray<TRune>>craftable.craft.runes);
            const usedGems = ArrayHelper.countStringOccurrences(
                ArrayHelper.toArray(craftable.craft?.gems).map(gem => this.gemHelper.asType(<TGem | IGem>gem))
            );
            return this.applyCraft(craftable, usedRunes, usedGems, helper);
        }

        const usedRunes: Partial<Record<TRune, number>> = {};
        const usedGems: Partial<Record<TGem, number>> = {};
        if (this.canCraftMaterialsFor(craftable, usedRunes, usedGems)) {
            this.applyCraft(craftable, usedRunes, usedGems, helper);
        }
    }

    private hasRequiredItems<TItem extends TType, TEntity extends TCEntity>(
        items: ItemOrArray<TItem | TEntity>,
        helper: BaseEntitiesHelper<any, TItem, TEntity, any>
    ): boolean {
        const requiredItems = ArrayHelper.countStringOccurrences(ArrayHelper.toArray(items).map(helper.getType));

        return ObjectHelper.every(
            requiredItems,
            (requiredItem: TItem, requiredAmount: number) => (helper.getItem(requiredItem).owned ?? 0) >= requiredAmount
        );
    }

    private incrementOwnedCount<TItem extends TType, TEntity extends TCEntity>(
        craftable: TEntity,
        helper: BaseEntitiesHelper<any, TItem, TEntity, any>
    ): void {
        craftable.owned = (craftable.owned ?? 0) + 1;
        helper.saveEntitiesOwned();
    }

    private applyCraft<TItem extends TType, TEntity extends TCEntity>(
        craftable: TEntity,
        runes: Partial<Record<TRune, number>>,
        gems: Partial<Record<TGem, number>>,
        helper: BaseEntitiesHelper<any, TItem, TEntity, any>
    ) {
        ObjectHelper.forEach(<Record<TRune, number>>runes, (runeName: TRune, count: number) => {
            if (!runeName) return;
            const rune = this.runeHelper.getItem(runeName);
            rune.owned = (rune.owned ?? 0) - count;
        });
        ObjectHelper.forEach(<Record<TGem, number>>gems, (gemName: TGem, count: number) => {
            if (!gemName) return;
            const gem = this.gemHelper.getItem(gemName);
            gem.owned = (gem.owned ?? 0) - count;
        });

        this.storageService.save.runesOwned(this.getRunesOwned());
        this.storageService.save.gemsOwned(this.getGemsOwned());

        return this.incrementOwnedCount(craftable, helper);
    }
}
