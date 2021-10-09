import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ISettings } from '../../interfaces';
import { StorageService } from '../../services';

@Component({
    selector: 'tab-pane-settings',
    templateUrl: './tab-pane-settings.component.html',
    styleUrls: ['./tab-pane-settings.component.scss']
})
export class TabPaneSettingsComponent {
    public settings: ISettings;

    public get darkModeIcon(): IconDefinition {
        return this.settings.darkMode ? faMoon : faSun;
    }

    public get darkModeTitleKey(): string {
        return this.settings.darkMode ? 'common.darkMode' : 'common.lightMode';
    }

    constructor(private readonly storageService: StorageService) {
        this.settings = storageService.get.settings();
        this.applySettings();
    }

    public onChangeDarkMode(): void {
        this.settings.darkMode = !this.settings.darkMode;
        this.applySettings();
    }

    public onChangeSystemCursor(): void {
        this.settings.systemCursor = !this.settings.systemCursor;
        this.applySettings();
    }

    private applySettings(): void {
        const { settings } = this;
        const classList = document.getElementsByTagName('html')[0].classList;
        classList.toggle('system-cursor', settings.systemCursor);
        classList.toggle('theme-dark', settings.darkMode);
        classList.toggle('theme-light', !settings.darkMode);

        this.storageService.save.settings(settings);
    }
}
