import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCollapsibleComponent } from './ui-collapsible.component';

describe('UiCollapsibleComponent', () => {
    let component: UiCollapsibleComponent;
    let fixture: ComponentFixture<UiCollapsibleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
