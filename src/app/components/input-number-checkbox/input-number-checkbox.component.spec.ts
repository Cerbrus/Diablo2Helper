import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../testing/test-common.module';

import { InputNumberCheckboxComponent } from './input-number-checkbox.component';

describe('InputNumberComponent', () => {
    let component: InputNumberCheckboxComponent;
    let fixture: ComponentFixture<InputNumberCheckboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [InputNumberCheckboxComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InputNumberCheckboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
