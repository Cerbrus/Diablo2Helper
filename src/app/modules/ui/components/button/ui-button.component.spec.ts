import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiScrollableComponent } from '~modules/ui/components';
import { TestModule } from '~testModule';

import { UiButtonComponent } from './ui-button.component';

describe('UiButtonComponent', () => {
    let component: UiButtonComponent;
    let fixture: ComponentFixture<UiButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [UiScrollableComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UiButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
