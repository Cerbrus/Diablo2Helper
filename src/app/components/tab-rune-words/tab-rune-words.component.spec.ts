import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabRuneWordsComponent } from './tab-rune-words.component';

describe('TabRuneWordsComponent', () => {
    let component: TabRuneWordsComponent;
    let fixture: ComponentFixture<TabRuneWordsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [TabRuneWordsComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabRuneWordsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
