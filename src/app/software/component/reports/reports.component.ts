import { Component, OnInit, ViewChild, Inject, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';

import { TrnSoldUnitModel } from './../../model/trn-sold-unit.model';
import { TrnSoldUnitRequirementModel } from './../../model/trn-sold-unit-requirement.model';
import { TrnSoldUnitRequirementActivityModel } from './../../model/trn-sold-unit-requirement-activity.model';
import { TrnCommissionRequestModel } from './../../model/trn-commission-request.model';
import { MstCustomerModel } from './../../model/mst-customer.model';
import { MstBrokerModel } from './../../model/mst-broker.model';

import { RepSummaryService } from './../../service/rep-summary/rep-summary.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public isButtonExportDisabled: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private repSummaryService: RepSummaryService,
  ) { }

  public date = new Date();
  public firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  public lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  public startDateFilterFormControl = new FormControl(this.firstDay);
  public endDateFilterFormControl = new FormControl(this.lastDay);

  public isSpinnerShowRepSummarySoldUnit: boolean = true;
  public isContentShowRepSummarySoldUnit: boolean = false;

  public soldUnitDisplayedColumns: string[] = [
    'SoldUnitNumber',
    'SoldUnitDate',
    'Project',
    'Unit',
    'Customer',
    'Status',
    'IsLocked',
    'Space'
  ];

  public soldUnitDataSource: MatTableDataSource<TrnSoldUnitModel>;
  public soldUnitData: TrnSoldUnitModel[] = []

  @ViewChild('soldUnitPaginator') public soldUnitPaginator: MatPaginator;
  @ViewChild('soldUnitSort') public soldUnitSort: MatSort;

  public isSpinnerShowRepSummarySoldUnitRequirements: boolean = true;
  public isContentShowRepSummarySoldUnitRequirements: boolean = false;

  public soldUnitRequirementDisplayedColumns: string[] = [
    'ChecklistRequirementNo',
    'ChecklistRequirement',
    'ChecklistCategory',
    'ChecklistType',
    'ChecklistWithAttachments',
    'Status',
    'StatusDate',
    'Space'
  ];

  public soldUnitRequirementDataSource: MatTableDataSource<TrnSoldUnitRequirementModel>;
  public soldUnitRequirementData: TrnSoldUnitRequirementModel[] = []

  @ViewChild('soldUnitRequirementPaginator') public soldUnitRequirementPaginator: MatPaginator;
  @ViewChild('soldUnitRequirementSort') public soldUnitRequirementSort: MatSort;

  public isSpinnerShowRepSummarySoldUnitRequirementActivities: boolean = true;
  public isContentShowRepSummarySoldUnitRequirementActivities: boolean = false;

  public soldUnitRequirementActivityDisplayedColumns: string[] = [
    'ActivityDate',
    'Activity',
    'Remarks',
    'User',
    'Space'
  ];

  public soldUnitRequirementActivityDataSource: MatTableDataSource<TrnSoldUnitRequirementActivityModel>;
  public soldUnitRequirementActivityData: TrnSoldUnitRequirementActivityModel[] = []

  @ViewChild('soldUnitRequirementActivityPaginator') public soldUnitRequirementActivityPaginator: MatPaginator;
  @ViewChild('soldUnitRequirementActivitySort') public soldUnitRequirementActivitySort: MatSort;

  public isSpinnerShowRepSummaryCommissionRequest: boolean = true;
  public isContentShowRepSummaryCommissionRequest: boolean = false;

  public commissionRequestDisplayedColumns: string[] = [
    'CommissionRequestNumber',
    'CommissionRequestDate',
    'Broker',
    'SoldUnit',
    'Status',
    'IsLocked',
    'Space'
  ];

  public commissionRequestDataSource: MatTableDataSource<TrnCommissionRequestModel>;
  public commissionRequestData: TrnCommissionRequestModel[] = []

  @ViewChild('commissionRequestPaginator') public commissionRequestPaginator: MatPaginator;
  @ViewChild('commissionRequestSort') public commissionRequestSort: MatSort;

  public isSpinnerShowRepSummaryCustomer: boolean = true;
  public isContentShowRepSummaryCustomer: boolean = false;

  public customerDisplayedColumns: string[] = [
    'CustomerCode',
    'Customer',
    'Address',
    'Status',
    'IsLocked',
    'Space'
  ];

  public customerDataSource: MatTableDataSource<MstCustomerModel>;
  public customerData: MstCustomerModel[] = []

  @ViewChild('customerPaginator') public customerPaginator: MatPaginator;
  @ViewChild('customerSort') public customerSort: MatSort;

  public isSpinnerShowRepSummaryBroker: boolean = true;
  public isContentShowRepSummaryBroker: boolean = false;

  public brokerDisplayedColumns: string[] = [
    'BrokerCode',
    'Broker',
    'Address',
    'Status',
    'IsLocked',
    'Space'
  ];

  public brokerDataSource: MatTableDataSource<MstBrokerModel>;
  public brokerData: MstBrokerModel[] = []

  @ViewChild('brokerPaginator') public brokerPaginator: MatPaginator;
  @ViewChild('brokerSort') public brokerSort: MatSort;

  public getRepSummarySoldUnitListByDateRange(): void {
    this.soldUnitData = [];
    this.soldUnitDataSource = new MatTableDataSource(this.soldUnitData);
    this.soldUnitDataSource.paginator = this.soldUnitPaginator;
    this.soldUnitDataSource.sort = this.soldUnitSort;

    let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.repSummaryService.getRepSummarySoldUnitListByDateRange(startDateFilterValue, endDateFilterValue).subscribe(
      data => {
        if (data.length > 0) {
          this.soldUnitData = data;
          this.soldUnitDataSource = new MatTableDataSource(this.soldUnitData);
          this.soldUnitDataSource.paginator = this.soldUnitPaginator;
          this.soldUnitDataSource.sort = this.soldUnitSort;
        }

        this.isSpinnerShowRepSummarySoldUnit = false;
        this.isContentShowRepSummarySoldUnit = true;
      }
    );
  }

  public soldUnitFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.soldUnitDataSource.filter = filterValue.trim().toLowerCase();

    if (this.soldUnitDataSource.paginator) {
      this.soldUnitDataSource.paginator.firstPage();
    }
  }

  public getRepSummarySoldUnitRequirementListByDateRange(): void {
    this.soldUnitRequirementData = [];
    this.soldUnitRequirementDataSource = new MatTableDataSource(this.soldUnitRequirementData);
    this.soldUnitRequirementDataSource.paginator = this.soldUnitRequirementPaginator;
    this.soldUnitRequirementDataSource.sort = this.soldUnitRequirementSort;

    let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.repSummaryService.getRepSummarySoldUnitRequirementListByDateRange(startDateFilterValue, endDateFilterValue).subscribe(
      data => {
        if (data.length > 0) {
          this.soldUnitRequirementData = data;
          this.soldUnitRequirementDataSource = new MatTableDataSource(this.soldUnitRequirementData);
          this.soldUnitRequirementDataSource.paginator = this.soldUnitRequirementPaginator;
          this.soldUnitRequirementDataSource.sort = this.soldUnitRequirementSort;
        }

        this.isSpinnerShowRepSummarySoldUnitRequirements = false;
        this.isContentShowRepSummarySoldUnitRequirements = true;
      }
    );
  }

  public soldUnitRequirementFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.soldUnitRequirementDataSource.filter = filterValue.trim().toLowerCase();

    if (this.soldUnitRequirementDataSource.paginator) {
      this.soldUnitRequirementDataSource.paginator.firstPage();
    }
  }

  public getRepSummarySoldUnitRequirementActivityListByDateRange(): void {
    this.soldUnitRequirementActivityData = [];
    this.soldUnitRequirementActivityDataSource = new MatTableDataSource(this.soldUnitRequirementActivityData);
    this.soldUnitRequirementActivityDataSource.paginator = this.soldUnitRequirementActivityPaginator;
    this.soldUnitRequirementActivityDataSource.sort = this.soldUnitRequirementActivitySort;

    let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.repSummaryService.getRepSummarySoldUnitRequirementActivityListByDateRange(startDateFilterValue, endDateFilterValue).subscribe(
      data => {
        if (data.length > 0) {
          this.soldUnitRequirementActivityData = data;
          this.soldUnitRequirementActivityDataSource = new MatTableDataSource(this.soldUnitRequirementActivityData);
          this.soldUnitRequirementActivityDataSource.paginator = this.soldUnitRequirementActivityPaginator;
          this.soldUnitRequirementActivityDataSource.sort = this.soldUnitRequirementActivitySort;
        }

        this.isSpinnerShowRepSummarySoldUnitRequirementActivities = false;
        this.isContentShowRepSummarySoldUnitRequirementActivities = true;
      }
    );
  }

  public soldUnitRequirementActivityFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.soldUnitRequirementActivityDataSource.filter = filterValue.trim().toLowerCase();

    if (this.soldUnitRequirementActivityDataSource.paginator) {
      this.soldUnitRequirementActivityDataSource.paginator.firstPage();
    }
  }

  public getRepSummaryCommissionRequestListByDateRange(): void {
    this.commissionRequestData = [];
    this.commissionRequestDataSource = new MatTableDataSource(this.commissionRequestData);
    this.commissionRequestDataSource.paginator = this.commissionRequestPaginator;
    this.commissionRequestDataSource.sort = this.commissionRequestSort;

    let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.repSummaryService.getRepSummaryCommissionRequestListByDateRange(startDateFilterValue, endDateFilterValue).subscribe(
      data => {
        if (data.length > 0) {
          this.commissionRequestData = data;
          this.commissionRequestDataSource = new MatTableDataSource(this.commissionRequestData);
          this.commissionRequestDataSource.paginator = this.commissionRequestPaginator;
          this.commissionRequestDataSource.sort = this.commissionRequestSort;
        }

        this.isSpinnerShowRepSummaryCommissionRequest = false;
        this.isContentShowRepSummaryCommissionRequest = true;
      }
    );
  }

  public commissionRequestFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.commissionRequestDataSource.filter = filterValue.trim().toLowerCase();

    if (this.commissionRequestDataSource.paginator) {
      this.commissionRequestDataSource.paginator.firstPage();
    }
  }

  public getRepSummaryCustomerListByDateRange(): void {
    this.customerData = [];
    this.customerDataSource = new MatTableDataSource(this.customerData);
    this.customerDataSource.paginator = this.customerPaginator;
    this.customerDataSource.sort = this.customerSort;

    let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.repSummaryService.getRepSummaryCustomerListByDateRange(startDateFilterValue, endDateFilterValue).subscribe(
      data => {
        if (data.length > 0) {
          this.customerData = data;
          this.customerDataSource = new MatTableDataSource(this.customerData);
          this.customerDataSource.paginator = this.customerPaginator;
          this.customerDataSource.sort = this.customerSort;
        }

        this.isSpinnerShowRepSummaryCustomer = false;
        this.isContentShowRepSummaryCustomer = true;
      }
    );
  }

  public customerFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customerDataSource.filter = filterValue.trim().toLowerCase();

    if (this.customerDataSource.paginator) {
      this.customerDataSource.paginator.firstPage();
    }
  }

  public getRepSummaryBrokerListByDateRange(): void {
    this.brokerData = [];
    this.brokerDataSource = new MatTableDataSource(this.brokerData);
    this.brokerDataSource.paginator = this.brokerPaginator;
    this.brokerDataSource.sort = this.brokerSort;

    let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.repSummaryService.getRepSummaryBrokerListByDateRange(startDateFilterValue, endDateFilterValue).subscribe(
      data => {
        if (data.length > 0) {
          this.brokerData = data;
          this.brokerDataSource = new MatTableDataSource(this.brokerData);
          this.brokerDataSource.paginator = this.brokerPaginator;
          this.brokerDataSource.sort = this.brokerSort;
        }

        this.isSpinnerShowRepSummaryBroker = false;
        this.isContentShowRepSummaryBroker = true;
      }
    );
  }

  public brokerFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.brokerDataSource.filter = filterValue.trim().toLowerCase();

    if (this.brokerDataSource.paginator) {
      this.brokerDataSource.paginator.firstPage();
    }
  }

  public dateRangeFiltersDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.getRepSummarySoldUnitListByDateRange();
    this.getRepSummarySoldUnitRequirementListByDateRange();
    this.getRepSummarySoldUnitRequirementActivityListByDateRange();
    this.getRepSummaryCommissionRequestListByDateRange();
    this.getRepSummaryCustomerListByDateRange();
    this.getRepSummaryBrokerListByDateRange();
  }

  public buttonExport(): void {

  }

  ngOnInit(): void {
    this.getRepSummarySoldUnitListByDateRange();
    this.getRepSummarySoldUnitRequirementListByDateRange();
    this.getRepSummarySoldUnitRequirementActivityListByDateRange();
    this.getRepSummaryCommissionRequestListByDateRange();
    this.getRepSummaryCustomerListByDateRange();
    this.getRepSummaryBrokerListByDateRange();
  }

}
