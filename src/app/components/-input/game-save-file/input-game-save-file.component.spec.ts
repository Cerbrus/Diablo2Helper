import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '~testModule';
import { InputGameSaveFileComponent } from '~components/-input';

describe('InputGameSaveFileComponent', () => {
    let component: InputGameSaveFileComponent;
    let fixture: ComponentFixture<InputGameSaveFileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [InputGameSaveFileComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InputGameSaveFileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
