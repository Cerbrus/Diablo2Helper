import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ObjectHelper } from '../../helpers';
import { ISettings } from '../../interfaces';
import { StorageService } from '../../services';

@Component({
    selector: 'tab-pane-settings',
    templateUrl: './tab-pane-settings.component.html',
    styleUrls: ['./tab-pane-settings.component.scss']
})
export class TabPaneSettingsComponent {
    public environment = environment;

    public settings: ISettings;

    constructor(private readonly storageService: StorageService) {
        this.settings = storageService.get.settings();
        this.applySettings();
    }

    public getTitleKey(key: keyof ISettings) {
        return `settings.${key}${this.settings[key] ? 'On' : 'Off'}`;
    }

    public onToggle(key: keyof ISettings): void {
        this.settings[key] = !this.settings[key];
        this.applySettings();
    }

    private applySettings(): void {
        const { settings } = this;
        const classList = document.getElementsByTagName('html')[0].classList;

        ObjectHelper.forEach({
            'custom-cursor': settings.customCursor && !settings.customCursorLarge,
            'custom-cursor-large': settings.customCursor && settings.customCursorLarge,
            'theme-dark': settings.darkMode,
            'theme-light': !settings.darkMode,
            'theme-background': settings.enableBackground
        }, (className: string, value: boolean) => classList.toggle(className, value));

        this.storageService.save.settings(settings);
    }
}
