import { Component, OnInit, ViewChild, Inject, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { DecimalPipe } from '@angular/common';

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
import { TrnCollectionPaymentModel } from './../../model/trn-collection-payment.model';
import { TrnSoldUnitEquityScheduleModel } from '../../model/trn-sold-unit-equity-schedule.model';

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
    public decimalPipe: DecimalPipe,
  ) { }

  public date = new Date();
  public firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  public lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  public startDateFilterFormControl = new FormControl(this.firstDay);
  public endDateFilterFormControl = new FormControl(this.lastDay);

  public dateAsOfFilterFormControl = new FormControl(this.date);

  public isSpinnerShowRepSummarySoldUnit: boolean = true;
  public isContentShowRepSummarySoldUnit: boolean = false;

  public soldUnitDisplayedColumns: string[] = [
    'SoldUnitNumber',
    'SoldUnitDate',
    'Project',
    'Unit',
    'Customer',
    'Broker',
    'Price',
    'PriceDiscount',
    'PricePayment',
    'PriceBalance',
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
    'SoldUnitDate',
    'Project',
    'Unit',
    'ChecklistRequirementNo',
    'ChecklistRequirement',
    'Status',
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
    'Project',
    'UnitCode',
    'Customer',
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
    'Remarks',
    'Amount',
    'Status',
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
    'Gender',
    'Address',
    'EmailAddress',
    'TelephoneNumber',
    'Citizen',
    'Position',
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
    'Gender',
    'Address',
    'EmailAddress',
    'TelephoneNumber',
    'Space'
  ];

  public brokerDataSource: MatTableDataSource<MstBrokerModel>;
  public brokerData: MstBrokerModel[] = []

  @ViewChild('brokerPaginator') public brokerPaginator: MatPaginator;
  @ViewChild('brokerSort') public brokerSort: MatSort;

  public isSpinnerShowRepSummaryAccountsReceivable: boolean = true;
  public isContentShowRepSummaryAccountsReceivable: boolean = false;

  public accountsReceivableDisplayedColumns: string[] = [
    'SoldUnitNumber',
    'SoldUnitDate',
    'Customer',
    'Price',
    'PricePayment',
    'PriceBalance',
    'Status',
    'Space'
  ];

  public accountsReceivableDataSource: MatTableDataSource<TrnSoldUnitModel>;
  public accountsReceivableData: TrnSoldUnitModel[] = []

  @ViewChild('accountsReceivablePaginator') public accountsReceivablePaginator: MatPaginator;
  @ViewChild('accountsReceivableSort') public accountsReceivableSort: MatSort;


  public isSpinnerShowRepCollectionReport: boolean = true;
  public isContentShowRepCollectionReport: boolean = false;

  public collectionReportDisplayedColumns: string[] = [
    'ManualNumber',
    'ORDate',
    'Customer',
    'PayType',
    'Amount',
    'PreparedBy',
    'Space'
  ];

  public collectionReportDataSource: MatTableDataSource<TrnCollectionPaymentModel>;
  public collectionReportData: TrnCollectionPaymentModel[] = []

  @ViewChild('collectionReportPaginator') public collectionReportPaginator: MatPaginator;
  @ViewChild('collectionReportSort') public collectionReportSort: MatSort;

  public isSpinnerShowRepSummaryCapitalGains: boolean = true;
  public isContentShowRepSummaryCapitalGains: boolean = false;

  public capitalGainsDisplayedColumns: string[] = [
    'SoldUnitNumber',
    'SoldUnitDate',
    'Customer',
    'Unit',
    'TSP',
    'PricePayment',
    'LastPaymentDate',
    'Ratio',
    'Space'
  ];

  public capitalGainsDataSource: MatTableDataSource<TrnSoldUnitModel>;
  public capitalGainsData: TrnSoldUnitModel[] = []

  @ViewChild('capitalGainsPaginator') public capitalGainsPaginator: MatPaginator;
  @ViewChild('capitalGainsSort') public capitalGainsSort: MatSort;

  public isSpinnerShowRepSummaryPDCMonitoring: boolean = true;
  public isContentShowRepSummaryPDCMonitoring: boolean = false;

  public soldUnitEquityScheduleDisplayedColumns: string[] = [
    'PaymentDate',
    'SoldUnitNumber',
    'SoldUnitCustomer',
    'CheckNumber',
    'CheckDate',
    'CheckBank',
    'Remarks',
    'Amortization',
    'PaidAmount',
    'BalanceAmount',
    'Space'
  ];

  public soldUnitEquityScheduleDataSource: MatTableDataSource<TrnSoldUnitEquityScheduleModel>;
  public soldUnitEquityScheduleData: TrnSoldUnitEquityScheduleModel[] = []

  @ViewChild('soldUnitEquitySchedulePaginator') public soldUnitEquitySchedulePaginator: MatPaginator;
  @ViewChild('soldUnitEquityScheduleSort') public soldUnitEquityScheduleSort: MatSort;

  public selectedTabIndex: number = 0;
  public isAccountReceivable: boolean = false;

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
    this.getRepCollectionReportListByDateRange();
    this.getRepSummaryCapitalGainsListByDateRange();
    this.getSoldUnitEquityScheduleData();
  }

  public buttonExport(): void {
    switch (this.selectedTabIndex) {
      case 0: {
        let data: any[] = [
          {
            SoldUnitNumber: "Sold Unit Number",
            SoldUnitDate: "Sold Unit Date",
            Project: "Project",
            Unit: "Unit",
            Customer: "Customer",
            Broker: "Broker",
            Price: "Price",
            PriceDiscount: "Discount",
            PricePayment: "Payment",
            PriceBalance: "Balance",
            Status: "Status",
          }
        ];

        if (this.soldUnitData.length > 0) {
          for (let i = 0; i < this.soldUnitData.length; i++) {
            data.push({
              SoldUnitNumber: this.soldUnitData[i].SoldUnitNumber,
              SoldUnitDate: this.soldUnitData[i].SoldUnitDate,
              Project: this.soldUnitData[i].Project,
              Unit: this.soldUnitData[i].Unit,
              Customer: this.soldUnitData[i].Customer,
              Broker: this.soldUnitData[i].Broker,
              Price: this.soldUnitData[i].Price,
              PriceDiscount: this.soldUnitData[i].PriceDiscount,
              PricePayment: this.soldUnitData[i].PricePayment,
              PriceBalance: this.soldUnitData[i].PriceBalance,
              Status: this.soldUnitData[i].Status
            });
          }
        }

        let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
        let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

        new Angular5Csv(data, 'Sold Unit Data from ' + startDateFilterValue + ' to ' + endDateFilterValue);

        break;
      }
      case 1: {
        let data: any[] = [
          {
            SoldUnitDate: "Sold Unit Date",
            Project: "Project",
            Unit: "Unit",
            ChecklistRequirementNo: "No.",
            ChecklistRequirement: "Requirement",
            Status: "Status"
          }
        ];

        if (this.soldUnitRequirementData.length > 0) {
          for (let i = 0; i < this.soldUnitRequirementData.length; i++) {
            data.push({
              SoldUnitDate: this.soldUnitRequirementData[i].SoldUnitDate,
              Project: this.soldUnitRequirementData[i].Project,
              Unit: this.soldUnitRequirementData[i].Unit,
              ChecklistRequirementNo: this.soldUnitRequirementData[i].ChecklistRequirementNo,
              ChecklistRequirement: this.soldUnitRequirementData[i].ChecklistRequirement,
              Status: this.soldUnitRequirementData[i].Status
            });
          }
        }

        let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
        let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

        new Angular5Csv(data, 'Sold Unit Requirements Data from ' + startDateFilterValue + ' to ' + endDateFilterValue);

        break;
      }
      case 2: {
        let data: any[] = [
          {
            ActivityDate: "Activity Date",
            Activity: "Activity",
            Remarks: "Remarks",
            User: "User",
            Project: "Project",
            UnitCode: "Unit Code",
            Customer: "Customer"
          }
        ];

        if (this.soldUnitRequirementActivityData.length > 0) {
          for (let i = 0; i < this.soldUnitRequirementActivityData.length; i++) {
            data.push({
              ActivityDate: this.soldUnitRequirementActivityData[i].ActivityDate,
              Activity: this.soldUnitRequirementActivityData[i].Activity,
              Remarks: this.soldUnitRequirementActivityData[i].Remarks,
              User: this.soldUnitRequirementActivityData[i].User,
              Project: this.soldUnitRequirementActivityData[i].Project,
              UnitCode: this.soldUnitRequirementActivityData[i].UnitCode,
              Customer: this.soldUnitRequirementActivityData[i].Customer
            });
          }
        }

        let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
        let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

        new Angular5Csv(data, 'Sold Unit Requirement Activities Data from ' + startDateFilterValue + ' to ' + endDateFilterValue);

        break;
      }
      case 3: {
        let data: any[] = [
          {
            CommissionRequestNumber: "Commission Request Number",
            CommissionRequestDate: "Commission Request Date",
            Broker: "Broker",
            SoldUnit: "Sold Unit",
            Remarks: "Remarks",
            Amount: "Amount",
            Status: "Status"
          }
        ];

        if (this.commissionRequestData.length > 0) {
          for (let i = 0; i < this.commissionRequestData.length; i++) {
            data.push({
              CommissionRequestNumber: this.commissionRequestData[i].CommissionRequestNumber,
              CommissionRequestDate: this.commissionRequestData[i].CommissionRequestDate,
              Broker: this.commissionRequestData[i].Broker,
              SoldUnit: this.commissionRequestData[i].SoldUnit,
              Remarks: this.commissionRequestData[i].Remarks,
              Amount: this.commissionRequestData[i].Amount,
              Status: this.commissionRequestData[i].Status
            });
          }
        }

        let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
        let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

        new Angular5Csv(data, 'Commission Request Data from ' + startDateFilterValue + ' to ' + endDateFilterValue);

        break;
      }
      case 4: {
        let data: any[] = [
          {
            CustomerCode: "Customer Code",
            Customer: "Customer",
            Gender: "Gender",
            Address: "Address",
            EmailAddress: "Email Address",
            TelephoneNumber: "Telephone Number",
            Citizen: "Nationality",
            Position: "Occupation"
          }
        ];

        if (this.customerData.length > 0) {
          for (let i = 0; i < this.customerData.length; i++) {
            data.push({
              CustomerCode: this.customerData[i].CustomerCode,
              Customer: this.customerData[i].LastName + ", " + this.customerData[i].FirstName,
              Gender: this.customerData[i].Gender,
              Address: this.customerData[i].Address,
              EmailAddress: this.customerData[i].EmailAddress,
              TelephoneNumber: this.customerData[i].TelephoneNumber,
              Citizen: this.customerData[i].Citizen,
              Position: this.customerData[i].Position
            });
          }
        }

        let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
        let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

        new Angular5Csv(data, 'Customer Data from ' + startDateFilterValue + ' to ' + endDateFilterValue);

        break;
      }
      case 5: {
        let data: any[] = [
          {
            BrokerCode: "Broker Code",
            Broker: "Broker",
            Gender: "Gender",
            Address: "Address",
            EmailAddress: "Email Address",
            TelephoneNumber: "Telephone Number"
          }
        ];

        if (this.brokerData.length > 0) {
          for (let i = 0; i < this.brokerData.length; i++) {
            data.push({
              BrokerCode: this.brokerData[i].BrokerCode,
              Broker: this.brokerData[i].LastName + ", " + this.brokerData[i].FirstName,
              Gender: this.brokerData[i].Gender,
              Address: this.brokerData[i].Address,
              EmailAddress: this.brokerData[i].EmailAddress,
              TelephoneNumber: this.brokerData[i].TelephoneNumber
            });
          }
        }

        let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
        let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

        new Angular5Csv(data, 'Broker Data from ' + startDateFilterValue + ' to ' + endDateFilterValue);

        break;
      }
      case 6: {
        let data: any[] = [
          {
            SoldUnitNumber: "Sold Unit Number",
            SoldUnitDate: "Sold Unit Date",
            Customer: "Customer",
            Price: "Amount",
            PricePayment: "Payment",
            PriceBalance: "Balance",
            Status: "Status",
          }
        ];

        if (this.accountsReceivableData.length > 0) {
          for (let i = 0; i < this.accountsReceivableData.length; i++) {
            data.push({
              SoldUnitNumber: this.accountsReceivableData[i].SoldUnitNumber,
              SoldUnitDate: this.accountsReceivableData[i].SoldUnitDate,
              Customer: this.accountsReceivableData[i].Customer,
              Price: this.accountsReceivableData[i].Price,
              PricePayment: this.accountsReceivableData[i].PricePayment,
              PriceBalance: this.accountsReceivableData[i].PriceBalance,
              Status: this.accountsReceivableData[i].Status
            });
          }
        }

        let dateAsOfFilterValue: string = new Date(this.dateAsOfFilterFormControl.value).toLocaleDateString("fr-CA");

        new Angular5Csv(data, 'Accounts Receivable date as of ' + dateAsOfFilterValue);

        break;
      }
      case 7: {
        let data: any[] = [
          {
            ManualNumber: "Manual Number",
            ORDate: "OR Date",
            Customer: "Customer",
            PayType: "Pay Type",
            Amount: "Amount",
            PreparedBy: "Prepared By"
          }
        ];

        if (this.collectionReportData.length > 0) {
          for (let i = 0; i < this.collectionReportData.length; i++) {
            data.push({
              ManualNumber: this.collectionReportData[i].CollectionManualNumber,
              ORDate: this.collectionReportData[i].CollectionDate,
              Customer: this.collectionReportData[i].CollectionCustomer,
              PayType: this.collectionReportData[i].PayType,
              Amount: this.collectionReportData[i].Amount,
              PreparedBy: this.collectionReportData[i].CollectionPreparedBy
            });
          }
        }

        let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
        let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

        new Angular5Csv(data, 'Collection Report from ' + startDateFilterValue + ' to ' + endDateFilterValue);

        break;
      }
      case 8: {
        let data: any[] = [
          {
            SoldUnitNumber: "Sold Unit Number",
            SoldUnitDate: "Sold Unit Date",
            Customer: "Customer",
            Unit: "Unit",
            TSP: "TSP",
            PricePayment: "Payment",
            LastPaymentDate: "LastPaymentDate",
            Ratio: "Ratio",
          }
        ];

        if (this.capitalGainsData.length > 0) {
          for (let i = 0; i < this.capitalGainsData.length; i++) {
            data.push({
              SoldUnitNumber: this.capitalGainsData[i].SoldUnitNumber,
              SoldUnitDate: this.capitalGainsData[i].SoldUnitDate,
              Customer: this.capitalGainsData[i].Customer,
              Unit: this.capitalGainsData[i].Unit,
              TSP: this.capitalGainsData[i].Price,
              PricePayment: this.capitalGainsData[i].PricePayment,
              LastPaymentDate: this.capitalGainsData[i].LastPaymentDate,
              Ratio: this.capitalGainsData[i].Ratio
            });
          }
        }

        let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
        let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

        new Angular5Csv(data, 'Collection Report for Capital Gains from ' + startDateFilterValue + ' to ' + endDateFilterValue);

        break;
      }
      case 9: {
        let data: any[] = [
          {
            PaymentDate: "Payment Date",
            SoldUnitNumber: "Sold Unit Number",
            SoldUnitCustomer: "Customer",
            CheckNumber: "Check Number",
            CheckDate: "Check Date",
            CheckBank: "Check Bank",
            Remarks: "Remarks",
            Amortization: "Amortization",
            PaidAmount: "Paid Amount",
            BalanceAmount: "Balance Amount",
          }
        ];

        if (this.soldUnitEquityScheduleData.length > 0) {
          for (let i = 0; i < this.soldUnitEquityScheduleData.length; i++) {
            data.push({
              PaymentDate: this.soldUnitEquityScheduleData[i].PaymentDate,
              SoldUnitNumber: this.soldUnitEquityScheduleData[i].SoldUnitNumber,
              SoldUnitCustomer: this.soldUnitEquityScheduleData[i].SoldUnitCustomer,
              CheckNumber: this.soldUnitEquityScheduleData[i].CheckNumber,
              CheckDate: this.soldUnitEquityScheduleData[i].CheckDate,
              CheckBank: this.soldUnitEquityScheduleData[i].CheckBank,
              Remarks: this.soldUnitEquityScheduleData[i].Remarks,
              Amortization: this.soldUnitEquityScheduleData[i].Amortization,
              PaidAmount: this.soldUnitEquityScheduleData[i].PaidAmount,
              BalanceAmount: this.soldUnitEquityScheduleData[i].BalanceAmount,
            });
          }
        }

        let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
        let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

        new Angular5Csv(data, 'PDC Monitoring Report from ' + startDateFilterValue + ' to ' + endDateFilterValue);

        break;
      }
      default: {
        break;
      }
    }
  }

  public onTabChanged(event: any): void {
    if (this.selectedTabIndex == 6) {
      this.isAccountReceivable = true;
    } else {
      this.isAccountReceivable = false;
    }
  }

  public getRepSummaryAccountsReceivableListByDateAsOf(): void {
    this.accountsReceivableData = [];
    this.accountsReceivableDataSource = new MatTableDataSource(this.accountsReceivableData);
    this.accountsReceivableDataSource.paginator = this.accountsReceivablePaginator;
    this.accountsReceivableDataSource.sort = this.accountsReceivableSort;

    let dateAsOfFilterValue: string = new Date(this.dateAsOfFilterFormControl.value).toLocaleDateString("fr-CA");

    this.repSummaryService.getRepSummaryAccountsReceivableListByDateAsOf(dateAsOfFilterValue).subscribe(
      data => {
        if (data.length > 0) {
          this.accountsReceivableData = data;
          this.accountsReceivableDataSource = new MatTableDataSource(this.accountsReceivableData);
          this.accountsReceivableDataSource.paginator = this.accountsReceivablePaginator;
          this.accountsReceivableDataSource.sort = this.accountsReceivableSort;
        }

        this.isSpinnerShowRepSummaryAccountsReceivable = false;
        this.isContentShowRepSummaryAccountsReceivable = true;
      }
    );
  }

  public accountsReceivableFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.accountsReceivableDataSource.filter = filterValue.trim().toLowerCase();

    if (this.accountsReceivableDataSource.paginator) {
      this.accountsReceivableDataSource.paginator.firstPage();
    }
  }

  public getRepCollectionReportListByDateRange(): void {
    this.collectionReportData = [];
    this.collectionReportDataSource = new MatTableDataSource(this.collectionReportData);
    this.collectionReportDataSource.paginator = this.collectionReportPaginator;
    this.collectionReportDataSource.sort = this.collectionReportSort;

    let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.repSummaryService.getRepSummaryCollectionReport(startDateFilterValue, endDateFilterValue).subscribe(
      data => {
        if (data.length > 0) {
          this.collectionReportData = data;
          this.collectionReportDataSource = new MatTableDataSource(this.collectionReportData);
          this.collectionReportDataSource.paginator = this.collectionReportPaginator;
          this.collectionReportDataSource.sort = this.collectionReportSort;
        }

        this.isSpinnerShowRepCollectionReport = false;
        this.isContentShowRepCollectionReport = true;
      }
    );
  }

  public collectionReportFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.collectionReportDataSource.filter = filterValue.trim().toLowerCase();

    if (this.collectionReportDataSource.paginator) {
      this.collectionReportDataSource.paginator.firstPage();
    }
  }

  public dateAsOfFiltersDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.getRepSummaryAccountsReceivableListByDateAsOf();
  }

  public getRepSummaryCapitalGainsListByDateRange(): void {
    this.capitalGainsData = [];
    this.capitalGainsDataSource = new MatTableDataSource(this.capitalGainsData);
    this.capitalGainsDataSource.paginator = this.capitalGainsPaginator;
    this.capitalGainsDataSource.sort = this.capitalGainsSort;

    let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.repSummaryService.getTrnSoldUnitForCapitalGains(startDateFilterValue, endDateFilterValue).subscribe(
      data => {
        if (data.length > 0) {
          this.capitalGainsData = data;
          this.capitalGainsDataSource = new MatTableDataSource(this.capitalGainsData);
          this.capitalGainsDataSource.paginator = this.capitalGainsPaginator;
          this.capitalGainsDataSource.sort = this.capitalGainsSort;
        }

        this.isSpinnerShowRepSummaryCapitalGains = false;
        this.isContentShowRepSummaryCapitalGains = true;
      }
    );
  }

  public capitalGainsFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.capitalGainsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.capitalGainsDataSource.paginator) {
      this.capitalGainsDataSource.paginator.firstPage();
    }
  }

  public getSoldUnitEquityScheduleData(): void {
    this.soldUnitEquityScheduleData = [];
    this.soldUnitEquityScheduleDataSource = new MatTableDataSource(this.soldUnitEquityScheduleData);
    this.soldUnitEquityScheduleDataSource.paginator = this.soldUnitEquitySchedulePaginator;
    this.soldUnitEquityScheduleDataSource.sort = this.soldUnitEquityScheduleSort;

    let startDateFilterValue: string = new Date(this.startDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let endDateFilterValue: string = new Date(this.endDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.repSummaryService.getTrnSoldUnitPDCMonitoring(startDateFilterValue, endDateFilterValue).subscribe(
      data => {
        if (data.length > 0) {
          this.soldUnitEquityScheduleData = data;
          this.soldUnitEquityScheduleDataSource = new MatTableDataSource(this.soldUnitEquityScheduleData);
          this.soldUnitEquityScheduleDataSource.paginator = this.soldUnitEquitySchedulePaginator;
          this.soldUnitEquityScheduleDataSource.sort = this.soldUnitEquityScheduleSort;
        }

        this.isSpinnerShowRepSummaryPDCMonitoring = false;
        this.isContentShowRepSummaryPDCMonitoring = true;
      }
    );
  }

  public soldUnitEquityScheduleFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.soldUnitEquityScheduleDataSource.filter = filterValue.trim().toLowerCase();

    if (this.soldUnitEquityScheduleDataSource.paginator) {
      this.soldUnitEquityScheduleDataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getRepSummarySoldUnitListByDateRange();
    this.getRepSummarySoldUnitRequirementListByDateRange();
    this.getRepSummarySoldUnitRequirementActivityListByDateRange();
    this.getRepSummaryCommissionRequestListByDateRange();
    this.getRepSummaryCustomerListByDateRange();
    this.getRepSummaryBrokerListByDateRange();
    this.getRepSummaryAccountsReceivableListByDateAsOf();
    this.getRepCollectionReportListByDateRange();
    this.getRepSummaryCapitalGainsListByDateRange();
    this.getSoldUnitEquityScheduleData();
  }
}
