import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '~testModule';
import { TabPaneRunesComponent } from '~components/-tab-pane';

describe('TabPaneRunesComponent', () => {
    let component: TabPaneRunesComponent;
    let fixture: ComponentFixture<TabPaneRunesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [TabPaneRunesComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabPaneRunesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
