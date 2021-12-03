import { Component } from '@angular/core';
import { CraftableHelper, RuneHelper } from '~helpers';
import { IRune, IRuneMap } from '~interfaces/rune';
import { ITable, ITableHeader } from '~interfaces/ui';
import { RuneTrackerService, RunewordFilterService } from '~services';
import { TRuneSort } from '~types/rune';

@Component({
    selector: 'list-runes',
    templateUrl: './list-runes.component.html',
    styleUrls: ['./list-runes.component.scss']
})
export class ListRunesComponent {
    public runes: IRuneMap;
    public headers: Array<ITableHeader<TRuneSort, IRune>> = [
        { title: 'common.rune', key: 'name', colSpan: 2 },
        { title: 'labels.owned', key: 'owned' }
    ];

    constructor(
        private readonly runeHelper: RuneHelper,
        private readonly runeTracker: RuneTrackerService,
        private readonly runeWordFilterService: RunewordFilterService,
        private readonly craftableHelper: CraftableHelper
    ) {
        this.runes = runeHelper.items;
        this.craftableHelper.calculateRunes();
    }

    public get runeArraySorted(): Array<IRune> {
        return this.runeHelper.itemsArraySorted;
    }

    public get runeSort(): TRuneSort {
        return this.runeHelper.entitySort;
    }

    public applySort(changedSort?: ITable<IRune>): void {
        this.runeHelper.applySort(changedSort);
    }

    public onCountChange(rune: IRune, amount: number | null = null): void {
        if (amount != null) rune.owned = amount;

        this.runeTracker.validate(rune);
        this.craftableHelper.calculateRunes();
        this.runeWordFilterService.calculateRuneWordVisibility();
    }

    public craft(rune: IRune): void {
        this.craftableHelper.craft(rune, this.runeHelper);
        this.craftableHelper.calculateRunes();
        this.runeWordFilterService.calculateRuneWordVisibility();
    }
}
