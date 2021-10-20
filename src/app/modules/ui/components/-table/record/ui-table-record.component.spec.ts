import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTableRecordComponent } from '~modules/ui/components';
import { TestModule } from '~testModule';

describe('UiTableRecordComponent', () => {
    let component: UiTableRecordComponent<any, any>;
    let fixture: ComponentFixture<UiTableRecordComponent<any, any>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
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
