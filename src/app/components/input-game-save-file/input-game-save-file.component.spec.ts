import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { TestModule } from '../../../testing/test-common.module';
import { InputGameSaveFileComponent } from './input-game-save-file.component';

describe('InputGameSaveFileComponent', () => {
    let component: InputGameSaveFileComponent;
    let fixture: ComponentFixture<InputGameSaveFileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
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
