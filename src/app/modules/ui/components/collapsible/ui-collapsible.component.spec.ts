import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '~testModule';
import { UiCollapsibleComponent } from '~modules/ui/components';

describe('UiCollapsibleComponent', () => {
    let component: UiCollapsibleComponent;
    let fixture: ComponentFixture<UiCollapsibleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [UiCollapsibleComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UiCollapsibleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
