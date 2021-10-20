import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '~testModule';
import { RuneTrackingCountersComponent } from './rune-tracking-counters.component';

describe('RuneTrackingCountersComponent', () => {
    let component: RuneTrackingCountersComponent;
    let fixture: ComponentFixture<RuneTrackingCountersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [RuneTrackingCountersComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RuneTrackingCountersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
