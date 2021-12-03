import { Component } from '@angular/core';
import { ObjectHelper } from '~helpers';
import { SkillHelper } from '~helpers/skill.helper';
import { IClassSkill, ISkillMap, ISkillUi, TSkillTree } from '~interfaces/player';
import { ITabPaneComponent } from '~interfaces/ui';
import { Classes, Skills, TClass, TSkill } from '~types/player';

@Component({
    selector: 'tab-pane-skills',
    templateUrl: './tab-pane-skills.component.html',
    styleUrls: ['./tab-pane-skill.component.scss']
})
export class TabPaneSkillsComponent implements ITabPaneComponent {
    public skills = ObjectHelper.deepCopy(Skills);
    public skillTrees: ISkillMap;
    public class: TClass = 'amazon';
    public currentTab: 0 | 1 | 2 = 2;
    public skillIndex = 1;
    public skillName: TSkill = this.skills[this.class][this.skillIndex];

    constructor(skillHelper: SkillHelper) {
        this.skillTrees = skillHelper.items;
        console.log(this.skillTrees);
    }

    public autoCompleteClass(): void {
        let matches = Classes.filter(c => c.startsWith(this.class) || this.class.startsWith(c));
        if (matches.length === 1) {
            this.class = matches[0];
            this.skillIndex = 0;
            this.skillName = this.skills[this.class][this.skillIndex - 1];
        }
    }

    public autoCompleteSkill<TCurrentClass extends TClass>(): void {
        if (!this.skillName) return;
        const find = this.skillName.toLowerCase();

        const currentClassSkills = <Array<ISkillUi[TCurrentClass]>>(<unknown>Skills[this.class]);
        const matches = currentClassSkills.filter(s => {
            const skill = s?.toLowerCase();
            return skill && (skill.startsWith(find) || find.startsWith(skill));
        });

        if (matches.length === 1) {
            this.skillName = matches[0];
            if (this.skillName) this.skillIndex = currentClassSkills.indexOf(matches[0]);
        }
    }

    public getMax(): number {
        const max = ['ui', 'hireling'].includes(this.class) ? 19 : 30;
        this.skillIndex = Math.min(this.skillIndex, max);
        return max;
    }

    public getTrees(): TSkillTree<TClass> {
        return this.skillTrees[this.class];
    }

    public displaySkill(skill: IClassSkill<TClass>): void {
        this.skillIndex = (skill.index || 0) + 1;
        this.skillName = skill.name;
    }
}
