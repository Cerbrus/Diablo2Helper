import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '~testModule';
import { InputNumberCheckboxComponent } from '~components/-input';

describe('InputNumberComponent', () => {
    let component: InputNumberCheckboxComponent;
    let fixture: ComponentFixture<InputNumberCheckboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [InputNumberCheckboxComponent]
        }).compileComponents();
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
