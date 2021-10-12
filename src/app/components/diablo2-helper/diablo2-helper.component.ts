import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import settings from '../../../assets/settings.json';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'diablo2helper',
    templateUrl: './diablo2-helper.component.html',
    styleUrls: ['./diablo2-helper.component.scss']
})
export class Diablo2HelperComponent {
    public environment = environment;

    constructor(
        titleService: Title,
        translate: TranslateService
    ) {
        translate.setDefaultLang(settings.defaultLanguage);
        translate.use(settings.defaultLanguage);

        translate.get('common.appTitle')
            .subscribe(title => titleService.setTitle(`${title} [${environment.appVersion}]`));
    }
}
