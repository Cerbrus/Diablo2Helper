import { Component } from '@angular/core';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons/faLightbulb';
import { environment } from '~environment';
import { DomHelper, Helper, ObjectHelper } from '~helpers';
import { ISettings } from '~interfaces';
import { ITabPaneComponent } from '~interfaces/ui';
import { faBug, IconDefinition } from '~modules/font-awesome';
import { StorageService } from '~services';

@Component({
    selector: 'tab-pane-settings',
    templateUrl: './tab-pane-settings.component.html',
    styleUrls: ['./tab-pane-settings.component.scss']
})
export class TabPaneSettingsComponent implements ITabPaneComponent {
    public environment = environment;

    public settings: ISettings;

    public bug: IconDefinition = faBug;
    public lightBulb: IconDefinition = faLightbulb;

    constructor(private readonly storageService: StorageService) {
        this.settings = storageService.get.settings();
        this.registerDarkModeWatch();
        this.applySettings();
    }

    private registerDarkModeWatch(): void {
        if (!window.matchMedia) return;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        if (!Helper.hasValue(this.settings.darkMode)) this.settings.darkMode = prefersDark.matches;

        prefersDark.addEventListener('change', e => {
            this.settings.darkMode = e.matches;
            this.applySettings();
        });
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
        const classList = DomHelper.getRoot().classList;

        ObjectHelper.forEach(
            {
                'custom-cursor': settings.customCursor && !settings.customCursorLarge,
                'custom-cursor-large': settings.customCursor && settings.customCursorLarge,
                'theme-dark': settings.darkMode ?? true,
                'theme-light': !settings.darkMode,
                'theme-background': settings.enableBackground
            },
            (className: string, value: boolean) => classList.toggle(className, value)
        );

        this.storageService.save.settings(settings);
    }
}
