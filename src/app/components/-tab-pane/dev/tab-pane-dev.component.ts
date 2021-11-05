import { Component } from '@angular/core';
import { ObjectHelper } from '~helpers';
import { ISkillUi } from '~interfaces/player';
import { ITabPaneComponent } from '~interfaces/ui';
import { ClassesUi, SkillsUi, TClass, TClassUi, TSkill, TSkillUi } from '~types/player';

@Component({
    selector: 'tab-pane-dev',
    templateUrl: './tab-pane-dev.component.html',
    styleUrls: ['./tab-pane-dev.component.scss']
})
export class TabPaneDevComponent implements ITabPaneComponent {
    public skills = ObjectHelper.deepCopy(SkillsUi);

    public class: TClassUi = 'amazon';
    public skillIndex = 0;
    public skill: TSkill | TSkillUi = this.skills[this.class][this.skillIndex];

    public isDown = false;
    public skillsString?: string;

    public autoCompleteClass(): void {
        let matches = ClassesUi.filter(c => c.startsWith(this.class) || this.class.startsWith(c));
        if (matches.length === 1) {
            this.class = matches[0];
            this.skillIndex = 0;
            this.skill = this.skills[this.class][this.skillIndex];
        }
    }

    public get characterClass(): TClass | undefined {
        return this.class !== 'ui' && this.class !== 'hireling' ? this.class : undefined;
    }

    public autoCompleteSkill<TCurrentClass extends TClassUi>(): void {
        if (!this.skill) return;
        const find = this.skill.toLowerCase();

        const currentClassSkills = <Array<ISkillUi[TCurrentClass]>>(<unknown>SkillsUi[this.class]);
        const matches = currentClassSkills.filter(s => {
            const skill = s?.toLowerCase();
            return skill && (skill.startsWith(find) || find.startsWith(skill));
        });

        if (matches.length === 1) {
            this.skill = matches[0];
            if (this.skill) this.skillIndex = currentClassSkills.indexOf(matches[0]);
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
