import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../testing/test-common.module';
import { TabPaneSettingsComponent } from './tab-pane-settings.component';

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
