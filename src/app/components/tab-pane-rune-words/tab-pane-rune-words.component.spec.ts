import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../testing/test-common.module';
import { TabPaneRuneWordsComponent } from './tab-pane-rune-words.component';

describe('TabRuneWordsComponent', () => {
    let component: TabPaneRuneWordsComponent;
    let fixture: ComponentFixture<TabPaneRuneWordsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [TabPaneRuneWordsComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabPaneRuneWordsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
