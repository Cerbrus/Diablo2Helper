import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../testing/test-common.module';
import { TutorialOverlayComponent } from './tutorial-overlay.component';

describe('TutorialOverlayComponent', () => {
    let component: TutorialOverlayComponent;
    let fixture: ComponentFixture<TutorialOverlayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [TutorialOverlayComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TutorialOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
