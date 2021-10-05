import { Component } from '@angular/core';
import { RuneHelper } from '../../helpers';
import { IRune } from '../../interfaces/rune';
import { RuneTrackerService, RunewordFilterService } from '../../services';
import { TRune } from '../../types/rune';

@Component({
    selector: 'rune-tracking-select',
    templateUrl: './rune-tracking-select.component.html',
    styleUrls: ['./rune-tracking-select.component.scss']
})
export class RuneTrackingSelectComponent {
    public runes: Array<IRune>;

    constructor(
        private readonly runeHelper: RuneHelper,
        private readonly runeTracker: RuneTrackerService,
        private readonly runeWordFilterService: RunewordFilterService
    ) {
        this.runes = runeHelper.itemsArray;
    }

    public getRune(rune: TRune | IRune): IRune {
        return this.runeHelper.asItem(rune);
    }

    public countRune(rune: IRune): void {
        this.runeTracker.countRune(rune);
        this.runeWordFilterService.saveFilters();
    }
}
