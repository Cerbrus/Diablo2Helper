import { Component } from '@angular/core';
import { ITabPaneComponent } from '~interfaces/ui';

@Component({
    selector: 'tab-pane-runes',
    templateUrl: './tab-pane-runes.component.html',
    styleUrls: ['./tab-pane-runes.component.scss']
})
export class TabPaneRunesComponent implements ITabPaneComponent {}
