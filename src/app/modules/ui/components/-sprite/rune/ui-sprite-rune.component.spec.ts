import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '~testModule';
import { UiSpriteRuneComponent } from '~modules/ui/components';

describe('UiSpriteRuneComponent', () => {
    let component: UiSpriteRuneComponent;
    let fixture: ComponentFixture<UiSpriteRuneComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [UiSpriteRuneComponent]
        }).compileComponents();
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
