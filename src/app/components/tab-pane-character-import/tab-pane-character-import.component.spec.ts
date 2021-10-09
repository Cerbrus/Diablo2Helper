import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../testing/test-common.module';
import { TabPaneCharacterImportComponent } from './tab-pane-character-import.component';

describe('TabCharacterImportComponent', () => {
    let component: TabPaneCharacterImportComponent;
    let fixture: ComponentFixture<TabPaneCharacterImportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [TabPaneCharacterImportComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabPaneCharacterImportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
