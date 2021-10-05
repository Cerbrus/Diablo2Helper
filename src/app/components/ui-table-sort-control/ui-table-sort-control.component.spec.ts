import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTableSortControlComponent } from './ui-table-sort-control.component';

describe('ControlTableSortComponent', () => {
    let component: UiTableSortControlComponent<any>;
    let fixture: ComponentFixture<UiTableSortControlComponent<any>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [UiTableSortControlComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UiTableSortControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
