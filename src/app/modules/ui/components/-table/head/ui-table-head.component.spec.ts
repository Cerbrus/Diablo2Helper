import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTableHeadComponent } from '~modules/ui/components';
import { TestModule } from '~testModule';

describe('UiTableHeadComponent', () => {
    let component: UiTableHeadComponent;
    let fixture: ComponentFixture<UiTableHeadComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [UiTableHeadComponent]
        }).compileComponents();
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
