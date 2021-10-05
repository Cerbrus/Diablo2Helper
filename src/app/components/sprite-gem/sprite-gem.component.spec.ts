import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpriteGemComponent } from './sprite-gem.component';

describe('DisplayGemComponent', () => {
    let component: SpriteGemComponent;
    let fixture: ComponentFixture<SpriteGemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [SpriteGemComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SpriteGemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
