import { Component } from '@angular/core';
import { ClassesUi, SkillsUi, TClassUi } from '../../types';

@Component({
    selector: 'tab-pane-dev',
    templateUrl: './tab-pane-dev.component.html',
    styleUrls: ['./tab-pane-dev.component.scss']
})
export class TabPaneDevComponent {
    public class: TClassUi = 'amazon';
    public skillIndex = 0;
    public isDown = false;
    public skills = SkillsUi;
    public skillsString?: string;

    public autoCompleteClass(): void {
        let matches = ClassesUi.filter(c => c.startsWith(this.class) || this.class.startsWith(c));
        if (matches.length === 1) {
            this.class = matches[0];
            this.skillIndex = 0;
        }
    }

    public getMax(): number {
        const max = ['ui', 'hireling'].includes(this.class) ? 18 : 29;
        this.skillIndex = Math.min(this.skillIndex, max);
        return max;
    }

    public stringifySkills(): void {
        this.skillsString = JSON.stringify(SkillsUi)
            .replace(/ +/, ' ')
            .replace(/{/g, '{\r\n')
            .replace(/([}\]])/g, '\r\n$1')
            .replace(/\[/g, '[\r\n\t')
            .replace(/],"/g, '],\r\n"')
            .replace(/,/g, ', ');
    }
}
