import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '~testModule';
import { UiSpriteGemComponent } from '~modules/ui/components';

describe('UiSpriteGemComponent', () => {
    let component: UiSpriteGemComponent;
    let fixture: ComponentFixture<UiSpriteGemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [UiSpriteGemComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UiSpriteGemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
