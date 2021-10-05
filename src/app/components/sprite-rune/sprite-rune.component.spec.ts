import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpriteRuneComponent } from './sprite-rune.component';

describe('DisplayRuneComponent', () => {
    let component: SpriteRuneComponent;
    let fixture: ComponentFixture<SpriteRuneComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [SpriteRuneComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SpriteRuneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
