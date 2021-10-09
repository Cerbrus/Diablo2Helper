import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../testing/test-common.module';
import { RuneTrackingSelectComponent } from './rune-tracking-select.component';

describe('RuneTrackingSelectComponent', () => {
    let component: RuneTrackingSelectComponent;
    let fixture: ComponentFixture<RuneTrackingSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [RuneTrackingSelectComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RuneTrackingSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
