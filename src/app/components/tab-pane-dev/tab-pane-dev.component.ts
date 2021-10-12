import { Component } from '@angular/core';
import { ObjectHelper } from '../../helpers';
import { ISkillUi } from '../../interfaces';
import { ClassesUi, SkillsUi, TClass, TClassUi } from '../../types';

@Component({
    selector: 'tab-pane-dev',
    templateUrl: './tab-pane-dev.component.html',
    styleUrls: ['./tab-pane-dev.component.scss']
})
export class TabPaneDevComponent {
    public class: TClassUi = 'amazon';
    public skillIndex = 0;
    public isDown = false;
    public skills = ObjectHelper.deepCopy(SkillsUi);
    public skillsString?: string;

    public autoCompleteClass(): void {
        let matches = ClassesUi.filter(c => c.startsWith(this.class) || this.class.startsWith(c));
        if (matches.length === 1) {
            this.class = matches[0];
            this.skillIndex = 0;
        }
    }

    public get characterClass(): TClass | undefined {
        return this.class !== 'ui' && this.class !== 'hireling'
            ? this.class
            : undefined;
    }

    public autoCompleteSkill<TCurrentClass extends TClassUi>(): void {
        const currentClass: TCurrentClass = <TCurrentClass>this.class;
        const currentSkill = this.skills[currentClass][this.skillIndex]?.toLowerCase();
        if (!currentSkill)
            return;

        const currentClassSkills = (<Array<ISkillUi[TCurrentClass]>>SkillsUi[currentClass]);
        const matches = currentClassSkills.filter(s => {
            const skill = s?.toLowerCase();
            return skill && (skill.startsWith(currentSkill) || currentSkill.startsWith(skill));
        });

        if (matches.length === 1) {
            this.skills[currentClass][this.skillIndex] = matches[0];
        }
    }

    public getMax(): number {
        const max = ['ui', 'hireling'].includes(this.class) ? 18 : 29;
        this.skillIndex = Math.min(this.skillIndex, max);
        return max;
    }

    public stringifySkills(): void {
        this.skillsString = JSON.stringify(this.skills)
            .replace(/ +/, ' ')
            .replace(/{/g, '{\r\n')
            .replace(/([}\]])/g, '\r\n$1')
            .replace(/\[/g, '[\r\n\t')
            .replace(/],"/g, '],\r\n"')
            .replace(/,/g, ', ');
    }
}
