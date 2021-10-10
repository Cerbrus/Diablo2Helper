import { Component } from '@angular/core';
import { ISettings } from '../../interfaces';
import { StorageService } from '../../services';

@Component({
    selector: 'tab-pane-settings',
    templateUrl: './tab-pane-settings.component.html',
    styleUrls: ['./tab-pane-settings.component.scss']
})
export class TabPaneSettingsComponent {
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
        classList.toggle('custom-cursor', settings.customCursor);
        classList.toggle('theme-dark', settings.darkMode);
        classList.toggle('theme-light', !settings.darkMode);
        classList.toggle('theme-background', settings.enableBackground);

        this.storageService.save.settings(settings);
    }
}
