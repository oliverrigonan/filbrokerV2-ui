import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { ActivityCommissionListComponent } from './component/activity-commission-list/activity-commission-list.component';
import { ActivityCommissionDetailComponent } from './component/activity-commission-detail/activity-commission-detail.component';
import { SystemUserListComponent } from './component/system-user-list/system-user-list.component';
import { SystemUserDetailComponent } from './component/system-user-detail/system-user-detail.component';
import { SystemSettingsComponent } from './component/system-settings/system-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SoftwareComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'setup-project-list', component: SetupProjectListComponent },
      { path: 'setup-project-detail/:id', component: SetupProjectDetailComponent },
      { path: 'setup-unit-list', component: SetupUnitListComponent },
      { path: 'setup-unit-detail/:id', component: SetupUnitDetailComponent },
      { path: 'setup-checklist-list', component: SetupChecklistListComponent },
      { path: 'setup-checklist-detail/:id', component: SetupChecklistDetailComponent },
      { path: 'setup-customer-list', component: SetupCustomerListComponent },
      { path: 'setup-customer-detail/:id', component: SetupCustomerDetailComponent },
      { path: 'setup-broker-list', component: SetupBrokerListComponent },
      { path: 'setup-broker-detail/:id', component: SetupBrokerDetailComponent },
      { path: 'system-user-detail/:id', component: SystemUserDetailComponent },
      { path: 'activity-sold-unit-list', component: ActivitySoldUnitListComponent },
      { path: 'activity-sold-unit-detail/:id', component: ActivitySoldUnitDetailComponent },
      { path: 'activity-collection-list', component: ActivityCollectionListComponent },
      { path: 'activity-collection-detail/:id', component: ActivityCollectionDetailComponent },
      { path: 'activity-commission-list', component: ActivityCommissionListComponent },
      { path: 'activity-commission-detail/:id', component: ActivityCommissionDetailComponent },
      { path: 'system-user-list', component: SystemUserListComponent },
      { path: 'system-settings', component: SystemSettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareRoutingModule { }
