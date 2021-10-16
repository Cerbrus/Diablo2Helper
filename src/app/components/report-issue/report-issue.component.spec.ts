import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestModule } from '../../../testing/test-common.module';
import { ReportIssueComponent } from './report-issue.component';

describe('ReportIssueComponent', () => {
    let component: ReportIssueComponent;
    let fixture: ComponentFixture<ReportIssueComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [TestModule],
                declarations: [ReportIssueComponent]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportIssueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
