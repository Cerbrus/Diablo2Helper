import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '~testModule';
import { Diablo2HelperComponent } from './diablo2-helper.component';

describe('RuneHelperComponent', () => {
    let component: Diablo2HelperComponent;
    let fixture: ComponentFixture<Diablo2HelperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [Diablo2HelperComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Diablo2HelperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
