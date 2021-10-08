import { Injectable } from '@angular/core';
import { ArrayHelper, NumberHelper, ObjectHelper, RuneHelper } from '../helpers';
import { IRune } from '../interfaces/rune';
import { IRuneWord } from '../interfaces/runeWord';
import { TRune } from '../types/rune';
import { StorageService } from './';

@Injectable({ providedIn: 'root' })
export class RuneTrackerService {
    public runeArray: Array<IRune>;

    public max = 999;
    public min = 0;

    constructor(
        private readonly runeHelper: RuneHelper,
        private readonly storageService: StorageService
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
        this.storageService.save.runesOwned(this.getRunesOwned());
    }

    public areRunesOwned(runes: Array<TRune | IRune>): boolean {
        const wishList = ArrayHelper.countStringOccurrences(this.runeHelper.asType(runes));

        return ObjectHelper.entries(wishList)
            .every((value: [TRune, number]) =>
                (this.runeHelper.asItem(value[0]).owned ?? 0) >= value[1]);
    }

    public calculateCraftableRunes(runeWord: IRuneWord): boolean {
        const countClone = this.getRunesOwned();
        return runeWord.runes.every(r => this.hasOrCanCraftRune(countClone, r, 1, runeWord));
    }

    public hasOrCanCraftRune(
        ownedRunes: Record<TRune, number>,
        runeToCraft: TRune | IRune,
        amountNeeded = 1,
        runeWord?: IRuneWord
    ): boolean {
        runeToCraft = this.runeHelper.asItem(runeToCraft);
        const craft = runeToCraft.name;

        if (ownedRunes[craft] >= amountNeeded) {
            ownedRunes[craft] -= amountNeeded;
            return true;
        } else {
            const missingCount = amountNeeded - (ownedRunes[craft] ?? 0);
            ownedRunes[craft] = 0;

            const neededRunes = runeToCraft.craft?.runes;

            return !!neededRunes && ObjectHelper.every(
                ArrayHelper.countStringOccurrences(neededRunes),
                (requiredRune: TRune, amountForCraft: number) =>
                    this.hasOrCanCraftRune(ownedRunes, requiredRune, missingCount * amountForCraft, runeWord));
        }
    }

    private getRunesOwned(): Record<TRune, number> {
        const runes = this.runeHelper.itemsArraySorted
            .filter(r => r.owned);
        return ArrayHelper.toRecordWithKey(
            runes,
            item => item.name,
            item => item.owned ?? 0);
    }

    private initializeRuneCounts(): void {
        const runesOwned = this.storageService.get.runesOwned();
        this.runeHelper.itemsArray.forEach(rune => {
            rune.owned = runesOwned[rune.name] ?? 0;
            rune.track = rune.owned > 0;
        });
    }
}
