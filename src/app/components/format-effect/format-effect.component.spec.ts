import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormatEffectComponent } from './format-effect.component';

describe('FormatEffectComponent', () => {
    let component: FormatEffectComponent;
    let fixture: ComponentFixture<FormatEffectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [FormatEffectComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormatEffectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
