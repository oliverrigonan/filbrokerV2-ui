import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

import { SoftwareRoutingModule } from './software-routing.module';
import { SoftwareRouterActivate } from './software-router-activate';

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
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
import { ActivitySoldUnitCancelReasonComponent } from './component/activity-sold-unit-cancel-reason/activity-sold-unit-cancel-reason.component';
import { ActivityCollectionListComponent } from './component/activity-collection-list/activity-collection-list.component';
import { ActivityCollectionDetailComponent } from './component/activity-collection-detail/activity-collection-detail.component';
import { ActivityCommissionRequestListComponent } from './component/activity-commission-request-list/activity-commission-request-list.component';
import { ActivityCommissionRequestDetailComponent } from './component/activity-commission-request-detail/activity-commission-request-detail.component';
import { SystemSettingsComponent } from './component/system-settings/system-settings.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ConfirmationDeleteComponent } from './component/confirmation-delete/confirmation-delete.component';
import { SetupHouseModelDetailComponent } from './component/setup-house-model-detail/setup-house-model-detail.component';
import { SetupChecklistRequirementDetailComponent } from './component/setup-checklist-requirement-detail/setup-checklist-requirement-detail.component';
import { ConfirmationAddChecklistComponent } from './component/confirmation-add-checklist/confirmation-add-checklist.component';
import { ActivitySoldUnitRequirementDetailComponent } from './component/activity-sold-unit-requirement-detail/activity-sold-unit-requirement-detail.component';
import { ActivitySoldUnitRequirementActivityDetailComponent } from './component/activity-sold-unit-requirement-activity-detail/activity-sold-unit-requirement-activity-detail.component';
import { ActivityCollectionPaymentDetailComponent } from './component/activity-collection-payment-detail/activity-collection-payment-detail.component';
import { PrintPdfCustomerComponent } from './component/print-pdf-customer/print-pdf-customer.component';
import { PrintPdfBrokerComponent } from './component/print-pdf-broker/print-pdf-broker.component';
import { PrintPdfChecklistComponent } from './component/print-pdf-checklist/print-pdf-checklist.component';
import { PrintPdfSoldUnitProposalComponent } from './component/print-pdf-sold-unit-proposal/print-pdf-sold-unit-proposal.component';
import { PrintPdfSoldUnitContractComponent } from './component/print-pdf-sold-unit-contract/print-pdf-sold-unit-contract.component';
import { PrintPdfSoldUnitEquityScheduleComponent } from './component/print-pdf-sold-unit-equity-schedule/print-pdf-sold-unit-equity-schedule.component';
import { PrintPdfBuyersUndertakingComponent } from './component/print-pdf-buyers-undertaking/print-pdf-buyers-undertaking.component';
import { PrintPdfReservationAgreementComponent } from './component/print-pdf-reservation-agreement/print-pdf-reservation-agreement.component';
import { PrintPdfComputationSheetComponent } from './component/print-pdf-computation-sheet/print-pdf-computation-sheet.component';
import { ConfirmationCancelComponent } from './component/confirmation-cancel/confirmation-cancel.component';
import { ReportsComponent } from './component/reports/reports.component';
import { GlobalSoldUnitListComponent } from './component/global-sold-unit-list/global-sold-unit-list.component';

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
    ActivitySoldUnitCancelReasonComponent,
    ActivityCollectionListComponent,
    ActivityCollectionDetailComponent,
    ActivityCommissionRequestListComponent,
    ActivityCommissionRequestDetailComponent,
    SystemSettingsComponent,
    DashboardComponent,
    ConfirmationDeleteComponent,
    SetupHouseModelDetailComponent,
    SetupChecklistRequirementDetailComponent,
    ConfirmationAddChecklistComponent,
    ActivitySoldUnitRequirementDetailComponent,
    ActivitySoldUnitRequirementActivityDetailComponent,
    ActivityCollectionPaymentDetailComponent,
    PrintPdfCustomerComponent,
    PrintPdfBrokerComponent,
    PrintPdfChecklistComponent,
    PrintPdfSoldUnitProposalComponent,
    PrintPdfSoldUnitContractComponent,
    PrintPdfSoldUnitEquityScheduleComponent,
    PrintPdfBuyersUndertakingComponent,
    PrintPdfReservationAgreementComponent,
    PrintPdfComputationSheetComponent,
    ConfirmationCancelComponent,
    ReportsComponent,
    GlobalSoldUnitListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SoftwareRoutingModule,
    FlexLayoutModule,
    NgxDocViewerModule,
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
    MatTabsModule,
    MatDatepickerModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    SoftwareRouterActivate
  ]
})
export class SoftwareModule { }
