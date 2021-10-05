import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'diablo2helper',
    templateUrl: './diablo2-helper.component.html',
    styleUrls: ['./diablo2-helper.component.scss']
})
export class Diablo2HelperComponent {
    constructor(
        titleService: Title,
        translate: TranslateService
    ) {
        translate.get('common.appTitle')
            .subscribe(title => titleService.setTitle(title));
    }
}
