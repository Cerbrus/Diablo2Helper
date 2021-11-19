import { Injectable } from '@angular/core';
import {
    ArrayHelper,
    CraftableHelper,
    GemHelper,
    NumberHelper,
    ObjectHelper,
    RuneHelper,
    RuneWordHelper
} from '~helpers';
import { IGem } from '~interfaces/gem';
import { IRune } from '~interfaces/rune';
import { IRuneWord } from '~interfaces/runeWord';
import { TGem } from '~types/gem';
import { ItemOrArray } from '~types/helpers';
import { TRune } from '~types/rune';
import { StorageService } from './';

@Injectable({ providedIn: 'root' })
export class RuneTrackerService {
    public runeArray: Array<IRune>;

    public max = 999;
    public min = 0;

    constructor(
        private readonly gemHelper: GemHelper,
        private readonly runeHelper: RuneHelper,
        private readonly runeWordHelper: RuneWordHelper,
        private readonly storageService: StorageService,
        private readonly craftableHelper: CraftableHelper
    ) {
        this.runeArray = runeHelper.itemsArray;
        this.initializeRuneCounts();
    }

    public validate(rune: TRune | IRune): void {
        rune = this.runeHelper.asItem(rune);
        this.clampCount(rune);
        rune.track = (rune.owned ?? 0) > 0;
        this.saveStoredRunes();
    }

    public countRune(rune: TRune | IRune): void {
        rune = this.runeHelper.asItem(rune);
        rune.track = !rune.track;
        rune.owned = rune.track ? 1 : 0;
        this.saveStoredRunes();
    }

    public clampCount(rune: TRune | IRune): void {
        rune = this.runeHelper.asItem(rune);
        rune.owned = NumberHelper.clamp(rune.owned, this.min, this.max);
    }

    public saveStoredRunes(): void {
        this.storageService.save.runesOwned(this.craftableHelper.getRunesOwned());
    }

    public areRunesOwned(runes?: ItemOrArray<TRune | IRune>): boolean {
        if (!runes) return true;

        const runesArray = ArrayHelper.toArray(runes);
        const wishList = ArrayHelper.countStringOccurrences(this.runeHelper.asType(runesArray));

        return ObjectHelper.entries(wishList).every(
            (value: [TRune, number]) => (this.runeHelper.asItem(value[0]).owned ?? 0) >= value[1]
        );
    }

    // public canCraftRuneWordRunes(
    //     runeWord: IRuneWord,
    //     usedRunes?: Partial<Record<TRune, number>>,
    //     usedGems?: Partial<Record<TGem, number>>
    // ): boolean {
    //     //TODO
    //     if (!runeWord.craft) return true;
    //     const countClone = this.getRunesOwned();
    //     const canCraft = ArrayHelper.toArray(runeWord.craft?.runes).every(
    //         r => r && this.hasOrCanCraftRune(countClone, r, 1, runeWord, usedRunes)
    //     );
    //
    //     runeWord.craft.canCraftMaterials = canCraft;
    //
    //     console.log(canCraft, this.craftableHelper.canCraftMaterialsFor(runeWord, usedRunes, usedGems));
    //
    //     return canCraft;
    // }

    public hasOrCanCraftRune(
        ownedRunes: Record<TRune, number>,
        runeToCraft: TRune | IRune,
        amountNeeded = 1,
        runeWord?: IRuneWord,
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
                        this.hasOrCanCraftRune(
                            ownedRunes,
                            requiredRune,
                            missingCount * amountForCraft,
                            runeWord,
                            usedRunes
                        )
                )
            );
        }
    }

    public hasRunewordRunes(runeWord: IRuneWord): boolean {
        if (!runeWord.craft?.runes) return true;
        const runes = ArrayHelper.toArray(runeWord.craft?.runes);

        const hasMaterials = runes && this.areRunesOwned(runes);
        runeWord.craft.hasMaterials = hasMaterials;
        return hasMaterials;
    }

    public craft(runeWord: IRuneWord): void {
        if (!runeWord.craft) return this.incrementOwnedCount(runeWord);

        if (this.hasRunewordRunes(runeWord) && runeWord.craft.runes) {
            const usedRunes = ArrayHelper.countStringOccurrences(runeWord.craft.runes);
            const usedGems = ArrayHelper.countStringOccurrences(
                ArrayHelper.toArray(runeWord.craft?.gems).map(gem => this.gemHelper.asType(<TGem | IGem>gem))
            );
            return this.applyCraft(runeWord, usedRunes, usedGems);
        }

        const usedRunes: Partial<Record<TRune, number>> = {};
        const usedGems: Partial<Record<TGem, number>> = {};
        if (this.craftableHelper.canCraftMaterialsFor(runeWord, usedRunes, usedGems)) {
            this.applyCraft(runeWord, usedRunes, usedGems);
        }
    }

    private applyCraft(
        runeWord: IRuneWord,
        runes: Partial<Record<TRune, number>>,
        gems: Partial<Record<TGem, number>>
    ) {
        //TODO
        ObjectHelper.forEach(<Record<TRune, number>>runes, (runeName: TRune, count: number) => {
            if (!runeName) return;
            const rune = this.runeHelper.getItem(runeName);
            rune.owned = (rune.owned ?? 0) - count;
        });

        this.saveStoredRunes();

        return this.incrementOwnedCount(runeWord);
    }

    private incrementOwnedCount(runeWord: IRuneWord): void {
        runeWord.owned = (runeWord.owned ?? 0) + 1;
        this.runeWordHelper.saveEntitiesOwned();
    }

    // private getRunesOwned(): Record<TRune, number> {
    //     const runes = this.runeHelper.itemsArraySorted.filter(r => r.owned);
    //     return ArrayHelper.toRecordWithKey(
    //         runes,
    //         item => item.name,
    //         item => item.owned ?? 0
    //     );
    // }

    private initializeRuneCounts(): void {
        const runesOwned = this.storageService.get.runesOwned();
        this.runeHelper.itemsArray.forEach(rune => {
            rune.owned = runesOwned[rune.name] ?? 0;
            rune.track = rune.owned > 0;
        });
    }
}
