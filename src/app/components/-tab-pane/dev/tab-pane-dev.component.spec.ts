import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabPaneDevComponent } from '~components/-tab-pane';
import { TestModule } from '~testModule';

describe('TabPaneDevComponent', () => {
    let component: TabPaneDevComponent;
    let fixture: ComponentFixture<TabPaneDevComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [TabPaneDevComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabPaneDevComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
