import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '~testModule';
import { UiSpriteClassComponent } from '~modules/ui/components';

describe('UiSpriteClassComponent', () => {
    let component: UiSpriteClassComponent;
    let fixture: ComponentFixture<UiSpriteClassComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [UiSpriteClassComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UiSpriteClassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
