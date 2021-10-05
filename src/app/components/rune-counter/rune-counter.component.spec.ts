import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RuneCounterComponent } from './rune-counter.component';

describe('RuneCounterComponent', () => {
    let component: RuneCounterComponent;
    let fixture: ComponentFixture<RuneCounterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [RuneCounterComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RuneCounterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
