import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../../../../testing/test-common.module';
import { UiSpriteSkillComponent } from './ui-sprite-skill.component';

describe('UiSpriteSkillComponent', () => {
    let component: UiSpriteSkillComponent<'necromancer', 'Bone Spear'>;
    let fixture: ComponentFixture<UiSpriteSkillComponent<'necromancer', 'Bone Spear'>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [UiSpriteSkillComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent<UiSpriteSkillComponent<'necromancer', 'Bone Spear'>>(UiSpriteSkillComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
