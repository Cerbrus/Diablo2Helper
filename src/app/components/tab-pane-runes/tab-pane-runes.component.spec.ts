import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabPaneRunesComponent } from './tab-pane-runes.component';

describe('TabRunesComponent', () => {
    let component: TabPaneRunesComponent;
    let fixture: ComponentFixture<TabPaneRunesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [TabPaneRunesComponent]
            })
            .compileComponents();
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
