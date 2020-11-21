import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoftwareRouterActivate } from './software-router-activate';

import { SoftwareComponent } from './software.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SetupProjectListComponent } from './component/setup-project-list/setup-project-list.component';
import { SetupProjectDetailComponent } from './component/setup-project-detail/setup-project-detail.component';
import { SetupUnitListComponent } from './component/setup-unit-list/setup-unit-list.component';
import { SetupUnitDetailComponent } from './component/setup-unit-detail/setup-unit-detail.component';
import { SetupChecklistDetailComponent } from './component/setup-checklist-detail/setup-checklist-detail.component';
import { SetupChecklistListComponent } from './component/setup-checklist-list/setup-checklist-list.component';
import { SetupCustomerListComponent } from './component/setup-customer-list/setup-customer-list.component';
import { SetupCustomerDetailComponent } from './component/setup-customer-detail/setup-customer-detail.component';
import { SetupBrokerListComponent } from './component/setup-broker-list/setup-broker-list.component';
import { SetupBrokerDetailComponent } from './component/setup-broker-detail/setup-broker-detail.component';
import { ActivitySoldUnitListComponent } from './component/activity-sold-unit-list/activity-sold-unit-list.component';
import { ActivitySoldUnitDetailComponent } from './component/activity-sold-unit-detail/activity-sold-unit-detail.component';
import { ActivityCollectionListComponent } from './component/activity-collection-list/activity-collection-list.component';
import { ActivityCollectionDetailComponent } from './component/activity-collection-detail/activity-collection-detail.component';
import { ActivityCommissionRequestListComponent } from './component/activity-commission-request-list/activity-commission-request-list.component';
import { ActivityCommissionRequestDetailComponent } from './component/activity-commission-request-detail/activity-commission-request-detail.component';
import { SystemUserListComponent } from './component/system-user-list/system-user-list.component';
import { SystemUserDetailComponent } from './component/system-user-detail/system-user-detail.component';
import { SystemSettingsComponent } from './component/system-settings/system-settings.component';
import { ReportsComponent } from './component/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [SoftwareRouterActivate],
    component: SoftwareComponent,
    children: [
      { path: '', canActivate: [SoftwareRouterActivate], component: DashboardComponent },
      { path: 'dashboard', canActivate: [SoftwareRouterActivate], component: DashboardComponent },
      { path: 'setup-project-list', canActivate: [SoftwareRouterActivate], component: SetupProjectListComponent },
      { path: 'setup-project-detail/:id', canActivate: [SoftwareRouterActivate], component: SetupProjectDetailComponent },
      { path: 'setup-unit-list', canActivate: [SoftwareRouterActivate], component: SetupUnitListComponent },
      { path: 'setup-unit-detail/:id', canActivate: [SoftwareRouterActivate], component: SetupUnitDetailComponent },
      { path: 'setup-checklist-list', canActivate: [SoftwareRouterActivate], component: SetupChecklistListComponent },
      { path: 'setup-checklist-detail/:id', canActivate: [SoftwareRouterActivate], component: SetupChecklistDetailComponent },
      { path: 'setup-customer-list', canActivate: [SoftwareRouterActivate], component: SetupCustomerListComponent },
      { path: 'setup-customer-detail/:id', canActivate: [SoftwareRouterActivate], component: SetupCustomerDetailComponent },
      { path: 'setup-broker-list', canActivate: [SoftwareRouterActivate], component: SetupBrokerListComponent },
      { path: 'setup-broker-detail/:id', canActivate: [SoftwareRouterActivate], component: SetupBrokerDetailComponent },
      { path: 'system-user-detail/:id', canActivate: [SoftwareRouterActivate], component: SystemUserDetailComponent },
      { path: 'activity-sold-unit-list', canActivate: [SoftwareRouterActivate], component: ActivitySoldUnitListComponent },
      { path: 'activity-sold-unit-detail/:id', canActivate: [SoftwareRouterActivate], component: ActivitySoldUnitDetailComponent },
      { path: 'activity-collection-list', canActivate: [SoftwareRouterActivate], component: ActivityCollectionListComponent },
      { path: 'activity-collection-detail/:id', canActivate: [SoftwareRouterActivate], component: ActivityCollectionDetailComponent },
      { path: 'activity-commission-request-list', canActivate: [SoftwareRouterActivate], component: ActivityCommissionRequestListComponent },
      { path: 'activity-commission-request-detail/:id', canActivate: [SoftwareRouterActivate], component: ActivityCommissionRequestDetailComponent },
      { path: 'system-user-list', canActivate: [SoftwareRouterActivate], component: SystemUserListComponent },
      { path: 'system-settings', canActivate: [SoftwareRouterActivate], component: SystemSettingsComponent },
      { path: 'reports', canActivate: [SoftwareRouterActivate], component: ReportsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule { }
