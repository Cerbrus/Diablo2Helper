import { Component, Input } from '@angular/core';
import { ISkillUi } from '../../../interfaces';
import { ClassesUi, SkillsUi, TClassUi } from '../../../types';
import { SpriteBaseComponent } from '../sprite-base.component';

@Component({
    selector: 'ui-sprite-skill',
    templateUrl: './ui-sprite-skill.component.html'
})
export class UiSpriteSkillComponent<TClass extends TClassUi, TSkill extends ISkillUi[TClass]> extends SpriteBaseComponent {
    @Input()
    public class!: TClass;

    @Input()
    public skill?: TSkill;

    @Input()
    public index = 0;

    @Input()
    public isDown = false;

    constructor() {
        super();
        this.sprite = 'skills';
    }

    protected getBackground(): Record<'x' | 'y' | 'width' | 'height', number> {
        const index = this.skill
            ? (<Array<ISkillUi[TClass]>>SkillsUi[this.class]).indexOf(this.skill)
            : this.index;

        return {
            x: (index * 2 + (this.isDown ? 1 : 0)) * -this.size,
            y: ClassesUi.indexOf(this.class) * -this.size,
            width: 7919 * (this.size / 132),
            height: 1170 * (this.size / 130)
        };
    }
}
