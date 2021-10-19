import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Diablo2HelperComponent } from '../../components/diablo2-helper/diablo2-helper.component';
import { ReportIssueComponent } from '../../components/report-issue/report-issue.component';
import { ParameterIssueType, ParameterTab } from './guards';

const routes: Routes = [
    { path: '', component: Diablo2HelperComponent },
    { path: ':tab', component: Diablo2HelperComponent, canActivate: [ParameterTab] },
    {
        path: 'issue/:issueType',
        component: ReportIssueComponent,
        canActivate: [ParameterIssueType]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        ParameterTab,
        ParameterIssueType
    ]
})
export class RoutingModule {
}
