import { Component } from '@angular/core';
import { RunewordFilterService } from '../../services';

@Component({
    selector: 'tab-rune-words',
    templateUrl: './tab-rune-words.component.html',
    styleUrls: ['./tab-rune-words.component.scss']
})
export class TabRuneWordsComponent {
    constructor(
        private readonly runeWordFilterService: RunewordFilterService
    ) {
    }

    public updateRunewordFilters(): void {
        this.runeWordFilterService.saveFilters();
    }
}
