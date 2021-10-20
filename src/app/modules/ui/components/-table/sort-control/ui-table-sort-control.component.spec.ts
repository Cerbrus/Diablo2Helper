import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTableSortControlComponent } from '~modules/ui/components';
import { TestModule } from '~testModule';

describe('UiTableSortControlComponent', () => {
    let component: UiTableSortControlComponent<any, any>;
    let fixture: ComponentFixture<UiTableSortControlComponent<any, any>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
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
