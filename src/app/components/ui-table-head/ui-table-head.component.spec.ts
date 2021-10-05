import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTableHeadComponent } from './ui-table-head.component';

describe('UiTableHeadComponent', () => {
    let component: UiTableHeadComponent;
    let fixture: ComponentFixture<UiTableHeadComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [UiTableHeadComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UiTableHeadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
