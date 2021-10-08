import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputGameSaveFileComponent } from './input-game-save-file.component';

describe('InputGameSaveFileComponent', () => {
    let component: InputGameSaveFileComponent;
    let fixture: ComponentFixture<InputGameSaveFileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [InputGameSaveFileComponent]
            })
            .compileComponents();
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
