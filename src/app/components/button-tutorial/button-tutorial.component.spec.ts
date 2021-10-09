import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../testing/test-common.module';
import { ButtonTutorialComponent } from './button-tutorial.component';

describe('ButtonTutorialComponent', () => {
    let component: ButtonTutorialComponent;
    let fixture: ComponentFixture<ButtonTutorialComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [ButtonTutorialComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonTutorialComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
