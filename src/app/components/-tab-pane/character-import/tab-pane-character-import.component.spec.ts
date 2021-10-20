import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabPaneCharacterImportComponent } from '~components/-tab-pane';
import { TestModule } from '~testModule';

describe('TabPaneCharacterImportComponent', () => {
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
