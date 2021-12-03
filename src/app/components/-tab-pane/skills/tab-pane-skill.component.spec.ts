import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabPaneSkillsComponent } from '~components/-tab-pane';
import { TestModule } from '~testModule';

describe('TabPaneSkillsComponent', () => {
    let component: TabPaneSkillsComponent;
    let fixture: ComponentFixture<TabPaneSkillsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [TabPaneSkillsComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabPaneSkillsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
