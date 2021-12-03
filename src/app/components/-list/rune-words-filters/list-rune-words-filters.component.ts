import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { RuneWordHelper } from '~helpers';
import { IRuneWordFilters } from '~interfaces/runeWord';
import { faTimesCircle } from '~modules/font-awesome';
import { RunewordFilterService } from '~services';
import { Items, TItem } from '~types';

@Component({
    selector: 'list-rune-words-filters',
    templateUrl: './list-rune-words-filters.component.html',
    styleUrls: ['./list-rune-words-filters.component.scss']
})
export class ListRuneWordsFiltersComponent implements OnInit {
    public itemTypes = Items.filter(t => t !== 'all');

    public readonly minClvl: number;
    public readonly maxClvl: number;

    public filters: IRuneWordFilters;

    public clearInputIcon = faTimesCircle;

    public largeItemTypes: Array<TItem> = ['weaponsMelee', 'weaponsRanged', 'armor'];

    private onSearch$ = new Subject<void>();
    private debounceDelay = 250;

    constructor(runeWordHelper: RuneWordHelper, private readonly runewordFilterService: RunewordFilterService) {
        const cLvls = runeWordHelper.itemsArray.map(r => r.cLvl);
        this.minClvl = Math.min(...cLvls);
        this.maxClvl = Math.max(...cLvls);

        this.filters = runewordFilterService.filters;
    }

    public ngOnInit(): void {
        this.onSearch$
            .pipe(
                debounceTime(this.debounceDelay),
                map(() => this.applyFilters())
            )
            .subscribe();
    }

    public clampClvl(): void {
        this.runewordFilterService.clampClvl(this.minClvl, this.maxClvl);
    }

    public updateFilters(itemType: TItem): void {
        this.runewordFilterService.updateFilters(itemType);
    }

    public applyFilters(): void {
        this.runewordFilterService.saveFilters();
    }

    public search(): void {
        this.onSearch$.next();
    }
}
