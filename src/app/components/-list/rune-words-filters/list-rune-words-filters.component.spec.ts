import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../../testing/test-common.module';
import { ListRuneWordsFiltersComponent } from './list-rune-words-filters.component';

describe('ListRuneWordsFiltersComponent', () => {
    let component: ListRuneWordsFiltersComponent;
    let fixture: ComponentFixture<ListRuneWordsFiltersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [ListRuneWordsFiltersComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListRuneWordsFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
