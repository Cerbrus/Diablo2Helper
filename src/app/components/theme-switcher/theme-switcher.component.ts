import { Component, HostListener } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { StorageService } from '../../services';

@Component({
    selector: 'theme-switcher',
    templateUrl: './theme-switcher.component.html',
    styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {
    public isDark: boolean;

    public get icon(): IconDefinition {
        return this.isDark ? faMoon : faSun;
    }

    constructor(private readonly storageService: StorageService) {
        this.isDark = storageService.get.darkMode(true);
        this.setClass();
    }

    @HostListener('click')
    public click(): void {
        this.isDark = !this.isDark;
        this.storageService.save.darkMode(this.isDark);
        this.setClass();
    }

    private setClass(): void {
        const classList = document.getElementsByTagName('html')[0].classList;
        classList.toggle('theme-dark', this.isDark);
        classList.toggle('theme-light', !this.isDark);
    }
}
