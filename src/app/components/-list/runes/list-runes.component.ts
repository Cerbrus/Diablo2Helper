import { Component } from '@angular/core';
import { RuneHelper } from '~helpers';
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

    public get runeArraySorted(): Array<IRune> {
        return this.runeHelper.itemsArraySorted;
    }

    public get runeSort(): TRuneSort {
        return this.runeHelper.entitySort;
    }

    public headers: Array<ITableHeader<TRuneSort, IRune>> = [
        { title: 'common.rune', key: 'name', colSpan: 2 },
        { title: 'labels.owned', key: 'owned' }
    ];

    constructor(
        private readonly runeHelper: RuneHelper,
        private readonly runeTracker: RuneTrackerService,
        private readonly runeWordFilterService: RunewordFilterService
    ) {
        this.runes = runeHelper.getItems();
    }

    public applySort(changedSort?: ITable<IRune>): void {
        this.runeHelper.applySort(changedSort);
    }

    public onCountChange(rune: IRune): void {
        this.runeTracker.validate(rune);
        this.runeWordFilterService.calculateRuneWordVisibility();
    }
}
