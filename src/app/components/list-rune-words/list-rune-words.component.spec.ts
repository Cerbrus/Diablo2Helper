import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRuneWordsComponent } from './list-rune-words.component';

describe('ListRuneWordsComponent', () => {
    let component: ListRuneWordsComponent;
    let fixture: ComponentFixture<ListRuneWordsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [ListRuneWordsComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListRuneWordsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
