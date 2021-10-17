import { Component, HostBinding, Input } from '@angular/core';
import { ISkillUi } from '../../../../interfaces/player';
import { ClassesUi, SkillsUi, TClassUi } from '../../../../types/player';
import { SpriteBaseComponent } from '../sprite-base.component';

@Component({
    selector: 'ui-sprite-skill',
    templateUrl: './ui-sprite-skill.component.html',
    styleUrls: ['./ui-sprite-skill.component.scss']
})
export class UiSpriteSkillComponent<TClass extends TClassUi, TSkill extends ISkillUi[TClass]> extends SpriteBaseComponent {
    @Input()
    public class!: TClass;

    @Input()
    public skill?: TSkill;

    @HostBinding('title')
    public get title(): string | null {
        return this.skill ?? (SkillsUi[this.class] && SkillsUi[this.class][this.index]);
    }

    @Input()
    public index = 0;

    @Input()
    public isDown = false;

    constructor() {
        super();
        this.sprite = 'skills';
    }

    protected getBackground(): Record<'x' | 'y' | 'width' | 'height', number> {
        const hasDown = this.class !== 'hireling';
        const index = this.skill
            ? (<Array<ISkillUi[TClass]>>SkillsUi[this.class]).indexOf(this.skill)
            : this.index;

        return {
            x: -this.size * (index * (hasDown ? 2 : 1) + (hasDown && this.isDown ? 1 : 0)),
            y: -this.size * ClassesUi.indexOf(this.class),
            width: 7919 * (this.size / 132),
            height: 1170 * (this.size / 130)
        };
    }
}
