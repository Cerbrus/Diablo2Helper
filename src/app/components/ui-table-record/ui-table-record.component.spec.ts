import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTableRecordComponent } from './ui-table-record.component';

describe('UiTableRecordComponent', () => {
    let component: UiTableRecordComponent;
    let fixture: ComponentFixture<UiTableRecordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [UiTableRecordComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UiTableRecordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
