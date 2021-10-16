import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Diablo2HelperComponent } from '../components/diablo2-helper/diablo2-helper.component';
import { ReportIssueComponent } from '../components/report-issue/report-issue.component';
import { CanActivateIndexTab } from './index-tab.validator';
import { CanActivateIssueType } from './issue-type.validator';

const routes: Routes = [
    { path: '', component: Diablo2HelperComponent },
    { path: ':tab', component: Diablo2HelperComponent, canActivate: [CanActivateIndexTab] },
    {
        path: 'issue/:issueType',
        component: ReportIssueComponent,
        canActivate: [CanActivateIssueType]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        CanActivateIndexTab,
        CanActivateIssueType
    ]
})
export class RoutingModule {
}
