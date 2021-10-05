import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRunesComponent } from './list-runes.component';

describe('ListRunesComponent', () => {
    let component: ListRunesComponent;
    let fixture: ComponentFixture<ListRunesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [ListRunesComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListRunesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
