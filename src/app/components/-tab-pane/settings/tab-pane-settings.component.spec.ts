import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '~testModule';
import { TabPaneSettingsComponent } from '~components/-tab-pane';

describe('TabPaneSettingsComponent', () => {
    let component: TabPaneSettingsComponent;
    let fixture: ComponentFixture<TabPaneSettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [TabPaneSettingsComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabPaneSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
