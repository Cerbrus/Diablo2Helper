import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListGemsComponent } from './list-gems.component';

describe('ListGemsComponent', () => {
    let component: ListGemsComponent;
    let fixture: ComponentFixture<ListGemsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                declarations: [ListGemsComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListGemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
