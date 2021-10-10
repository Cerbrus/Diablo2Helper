import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../../testing/test-common.module';
import { UiSpriteRuneComponent } from './ui-sprite-rune.component';

describe('UiSpriteRuneComponent', () => {
    let component: UiSpriteRuneComponent;
    let fixture: ComponentFixture<UiSpriteRuneComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [UiSpriteRuneComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UiSpriteRuneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
