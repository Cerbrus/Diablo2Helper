import { Component } from '@angular/core';
import { RunewordFilterService } from '../../services';

@Component({
    selector: 'tab-pane-rune-words',
    templateUrl: './tab-pane-rune-words.component.html',
    styleUrls: ['./tab-pane-rune-words.component.scss']
})
export class TabPaneRuneWordsComponent {
    constructor(
        private readonly runeWordFilterService: RunewordFilterService
    ) {
    }

    public updateRunewordFilters(): void {
        this.runeWordFilterService.saveFilters();
    }
}
