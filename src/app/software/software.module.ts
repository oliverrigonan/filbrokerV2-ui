import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { SoftwareRoutingModule } from './software-routing.module';

import { SoftwareComponent } from './software.component';
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
import { SystemUserListComponent } from './component/system-user-list/system-user-list.component';
import { SystemUserDetailComponent } from './component/system-user-detail/system-user-detail.component';
import { ActivitySoldUnitListComponent } from './component/activity-sold-unit-list/activity-sold-unit-list.component';
import { ActivitySoldUnitDetailComponent } from './component/activity-sold-unit-detail/activity-sold-unit-detail.component';
import { ActivityCollectionListComponent } from './component/activity-collection-list/activity-collection-list.component';
import { ActivityCollectionDetailComponent } from './component/activity-collection-detail/activity-collection-detail.component';
import { ActivityCommissionListComponent } from './component/activity-commission-list/activity-commission-list.component';
import { ActivityCommissionDetailComponent } from './component/activity-commission-detail/activity-commission-detail.component';
import { SystemSettingsComponent } from './component/system-settings/system-settings.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import { ConfirmationDeleteComponent } from './component/confirmation-delete/confirmation-delete.component';

import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    SoftwareComponent,
    SetupProjectListComponent,
    SetupProjectDetailComponent,
    SetupUnitListComponent,
    SetupUnitDetailComponent,
    SetupChecklistDetailComponent,
    SetupChecklistListComponent,
    SetupCustomerListComponent,
    SetupCustomerDetailComponent,
    SetupBrokerListComponent,
    SetupBrokerDetailComponent,
    SystemUserListComponent,
    SystemUserDetailComponent,
    ActivitySoldUnitListComponent,
    ActivitySoldUnitDetailComponent,
    ActivityCollectionListComponent,
    ActivityCollectionDetailComponent,
    ActivityCommissionListComponent,
    ActivityCommissionDetailComponent,
    SystemSettingsComponent,
    DashboardComponent,
    ConfirmationDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SoftwareRoutingModule,
    FlexLayoutModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class SoftwareModule { }
