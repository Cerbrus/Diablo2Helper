import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabPaneGemsComponent } from './tab-pane-gems.component';

describe('TabGemsComponent', () => {
    let component: TabPaneGemsComponent;
    let fixture: ComponentFixture<TabPaneGemsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [TabPaneGemsComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabPaneGemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
