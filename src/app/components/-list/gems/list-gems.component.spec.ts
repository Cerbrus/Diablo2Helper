import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListGemsComponent } from '~components/-list';
import { TestModule } from '~testModule';

describe('ListGemsComponent', () => {
    let component: ListGemsComponent;
    let fixture: ComponentFixture<ListGemsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [ListGemsComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListGemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
