import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../testing/test-common.module';
import { ButtonsComponent } from './buttons.component';

describe('ButtonsComponent', () => {
    let component: ButtonsComponent;
    let fixture: ComponentFixture<ButtonsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [ButtonsComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
