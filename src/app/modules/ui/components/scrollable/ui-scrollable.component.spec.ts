import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../../../testing/test-common.module';
import { UiScrollableComponent } from './ui-scrollable.component';

describe('UiScrollableComponent', () => {
    let component: UiScrollableComponent;
    let fixture: ComponentFixture<UiScrollableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [UiScrollableComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UiScrollableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
