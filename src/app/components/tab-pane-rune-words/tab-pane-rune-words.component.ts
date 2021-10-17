import { Component } from '@angular/core';
import { ITabPaneComponent } from '../../interfaces/ui';
import { RunewordFilterService } from '../../services';

@Component({
    selector: 'tab-pane-rune-words',
    templateUrl: './tab-pane-rune-words.component.html',
    styleUrls: ['./tab-pane-rune-words.component.scss']
})
export class TabPaneRuneWordsComponent implements ITabPaneComponent {
    constructor(
        private readonly runeWordFilterService: RunewordFilterService
    ) {
    }

    public updateRunewordFilters(): void {
        this.runeWordFilterService.saveFilters();
    }
}
