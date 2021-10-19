import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../../../testing/test-common.module';
import { UiFormatEffectComponent } from './ui-format-effect.component';

describe('UiFormatEffectComponent', () => {
    let component: UiFormatEffectComponent;
    let fixture: ComponentFixture<UiFormatEffectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [UiFormatEffectComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UiFormatEffectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
