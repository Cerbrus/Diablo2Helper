import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabCharacterImportComponent } from './tab-character-import.component';

describe('TabCharacterImportComponent', () => {
    let component: TabCharacterImportComponent;
    let fixture: ComponentFixture<TabCharacterImportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [TabCharacterImportComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabCharacterImportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
