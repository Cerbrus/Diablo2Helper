import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '~testModule';
import { UiSpriteAnimatedComponent } from '~modules/ui/components';

describe('UiSpriteAnimatedComponent', () => {
    let component: UiSpriteAnimatedComponent;
    let fixture: ComponentFixture<UiSpriteAnimatedComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [UiSpriteAnimatedComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UiSpriteAnimatedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
