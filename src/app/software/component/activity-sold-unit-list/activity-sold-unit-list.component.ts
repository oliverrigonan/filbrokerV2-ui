import { Component, OnInit, ViewChild, Inject, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MstCustomerModel } from './../../model/mst-customer.model';
import { TrnSoldUnitModel } from './../../model/trn-sold-unit.model';

import { TrnSoldUnitService } from './../../service/trn-sold-unit/trn-sold-unit.service';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationDeleteComponent } from './../confirmation-delete/confirmation-delete.component';

import { PrintPdfBuyersUndertakingComponent } from './../../component/print-pdf-buyers-undertaking/print-pdf-buyers-undertaking.component';
import { PrintPdfReservationAgreementComponent } from './../../component/print-pdf-reservation-agreement/print-pdf-reservation-agreement.component';
import { PrintPdfComputationSheetComponent } from './../../component/print-pdf-computation-sheet/print-pdf-computation-sheet.component';

import { MstUserRights } from './../../model/mst-user-rights.model';
import { MstUserRightsService } from './../../service/mst-user-rights/mst-user-rights.service';

@Component({
  selector: 'app-activity-sold-unit-list',
  templateUrl: './activity-sold-unit-list.component.html',
  styleUrls: ['./activity-sold-unit-list.component.css']
})
export class ActivitySoldUnitListComponent implements OnInit {
  @Input() public customerData: MstCustomerModel = null;
  @Input() public customerReport: string = "";
  @Input() public isFromCustomer: boolean = false;

  public soldUnitDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
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

  public isButtonAddSoldUnitDisabled: boolean = false;

  constructor(
    private trnSoldUnitService: TrnSoldUnitService,
    private router: Router,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog,
    private printPdfBuyersUndertakingDialog: MatDialog,
    private printPdfReservationAgreementDialog: MatDialog,
    private printPdfComputationSheetDialog: MatDialog,
    private mstUserRightsService: MstUserRightsService,
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;
  public isPageForbidden: boolean = false;

  public date = new Date();
  public firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  public lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  public mstUserRights: MstUserRights = new MstUserRights();

  public soldUnitListStartDateFilterFormControl = new FormControl(this.firstDay);
  public soldUnitEndDateFilterFormControl = new FormControl(this.lastDay);

  public soldUnitDateRangeFiltersDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.getSoldUnitData();
  }

  public getSoldUnitData(): void {
    this.soldUnitData = [];
    this.soldUnitDataSource = new MatTableDataSource(this.soldUnitData);
    this.soldUnitDataSource.paginator = this.soldUnitPaginator;
    this.soldUnitDataSource.sort = this.soldUnitSort;

    if (this.isFromCustomer == true) {
      this.trnSoldUnitService.getSoldUnitListByCustomer(this.customerData.Id).subscribe(
        data => {
          if (data.length > 0) {
            this.soldUnitData = data;
            this.soldUnitDataSource = new MatTableDataSource(this.soldUnitData);
            this.soldUnitDataSource.paginator = this.soldUnitPaginator;
            this.soldUnitDataSource.sort = this.soldUnitSort;
          }

          this.isSpinnerShow = false;
          this.isContentShow = true;
        }
      );
    } else {
      let soldUnitListStartDateFilterValue: string = new Date(this.soldUnitListStartDateFilterFormControl.value).toLocaleDateString("fr-CA");
      let soldUnitEndDateFilterValue: string = new Date(this.soldUnitEndDateFilterFormControl.value).toLocaleDateString("fr-CA");

      this.trnSoldUnitService.getSoldUnitListByDateRange(soldUnitListStartDateFilterValue, soldUnitEndDateFilterValue).subscribe(
        data => {
          if (data.length > 0) {
            this.soldUnitData = data;
            this.soldUnitDataSource = new MatTableDataSource(this.soldUnitData);
            this.soldUnitDataSource.paginator = this.soldUnitPaginator;
            this.soldUnitDataSource.sort = this.soldUnitSort;
          }

          this.isSpinnerShow = false;
          this.isContentShow = true;
        }
      );
    }
  }

  public soldUnitFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.soldUnitDataSource.filter = filterValue.trim().toLowerCase();

    if (this.soldUnitDataSource.paginator) {
      this.soldUnitDataSource.paginator.firstPage();
    }
  }

  public buttonAddSoldUnit(): void {
    this.isButtonAddSoldUnitDisabled = true;

    let currentDate = new Date();

    let trnSoldUnitModel: TrnSoldUnitModel = {
      Id: 0,
      SoldUnitNumber: "",
      SoldUnitDate: currentDate.toLocaleDateString(),
      ProjectId: 0,
      Project: "",
      UnitId: 0,
      Unit: "",
      CustomerId: 0,
      Customer: "",
      BrokerId: 0,
      Broker: "",
      Agent: "",
      BrokerCoordinator: "",
      ChecklistId: 0,
      Checklist: "",
      PriceDiscount: 0,
      Price: 0,
      TCP: 0,
      TSP: 0,
      EquityValue: 0,
      EquityPercent: 0,
      EquitySpotPayment1: 0,
      EquitySpotPayment2: 0,
      EquitySpotPayment3: 0,
      EquitySpotPayment1Pos: 0,
      EquitySpotPayment2Pos: 0,
      EquitySpotPayment3Pos: 0,
      Discount: 0,
      DiscountedEquity: 0,
      Reservation: 0,
      NetEquity: 0,
      NetEquityBalance: 0,
      NetEquityInterest: 0,
      NetEquityNoOfPayments: 0,
      NetEquityAmortization: 0,
      Balance: 0,
      BalanceInterest: 0,
      BalanceNoOfPayments: 0,
      BalanceAmortization: 0,
      TotalInvestment: "",
      PaymentOptions: "",
      Financing: "",
      Remarks: "",
      FinancingType: "",
      PreparedBy: 0,
      PreparedByUser: "",
      CheckedBy: 0,
      CheckedByUser: "",
      ApprovedBy: 0,
      ApprovedByUser: "",
      Status: "",
      IsLocked: false,
      CreatedBy: 0,
      CreatedDateTime: "",
      UpdatedBy: 0,
      UpdatedDateTime: "",
      PriceBalance: 0,
      PricePayment: 0
    };

    this.trnSoldUnitService.addSoldUnit(trnSoldUnitModel).subscribe(
      data => {

        if (data[0] == true) {
          if (data[1] > 0) {
            this.toastr.success('Sold unit was successfully added!', 'Add Successful');

            setTimeout(() => {
              this.router.navigate(['/software/activity-sold-unit-detail/' + data[1]]);
            }, 500);
          } else {
            this.toastr.error('Somethings went wrong!', 'Add Failed');
            this.isButtonAddSoldUnitDisabled = false;
          }
        } else {
          this.toastr.error(data[1], 'Add Failed');
          this.isButtonAddSoldUnitDisabled = false;
        }

      }
    );
  }

  public buttonEditSoldUnit(currentData: any): void {
    let id = currentData.Id;
    this.router.navigate(['/software/activity-sold-unit-detail/' + id]);
  }

  public buttonDeleteSoldUnit(currentData: any): void {
    if (currentData.IsLocked == true) {
      this.toastr.error("Cannot delete a locked record.", 'Delete Failed');
    } else {
      let id = currentData.Id;

      const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
        width: '450px',
        data: {
          dialogDeleteTitle: "Delete Sold Unit",
          dialogDeleteMessage: "Are you sure you want to delete this sold unit number " + currentData.SoldUnitNumber + "?",
          dialogDeleteId: id
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

        if (result != null) {
          this.isSpinnerShow = true;
          this.isContentShow = false;

          this.trnSoldUnitService.deleteSoldUnit(result).subscribe(
            data => {

              if (data[0] == true) {
                this.toastr.success('Sold unit was successfully deleted!', 'Delete Successful');
                this.getSoldUnitData();
              } else {
                this.toastr.error(data[1], 'Delete Failed');

                this.isSpinnerShow = false;
                this.isContentShow = true;
              }

            }
          );
        }
      });
    }
  }

  public buttonPickSoldUnit(currentData: any): void {
    if (this.isFromCustomer == true) {
      switch (this.customerReport) {
        case "Buyers Undertaking": {
          const openDialog = this.printPdfBuyersUndertakingDialog.open(PrintPdfBuyersUndertakingComponent, {
            width: '1200px',
            data: {
              dialogTitle: "Print Buyer's Undertaking",
              dialogData: currentData
            },
            disableClose: true
          });

          openDialog.afterClosed().subscribe(result => {

          });

          break;
        }
        case "Reservation Agreement": {
          const openDialog = this.printPdfReservationAgreementDialog.open(PrintPdfReservationAgreementComponent, {
            width: '1200px',
            data: {
              dialogTitle: "Print Reservation Agreement",
              dialogData: currentData
            },
            disableClose: true
          });

          openDialog.afterClosed().subscribe(result => {

          });

          break;
        }
        case "Computation Sheet": {
          const openDialog = this.printPdfComputationSheetDialog.open(PrintPdfComputationSheetComponent, {
            width: '1200px',
            data: {
              dialogTitle: "Print Computation Sheet",
              dialogData: currentData
            },
            disableClose: true
          });

          openDialog.afterClosed().subscribe(result => {

          });

          break;
        }
        default: {
          break;
        }
      }
    }
  }

  ngOnInit(): void {
    this.mstUserRights = {
      Id: 0,
      UserId: 0,
      PageId: 0,
      Page: "",
      PageURL: "",
      CanEdit: true,
      CanSave: true,
      CanLock: true,
      CanUnLock: true,
      CanPrint: true,
      CanDelete: true
    }

    this.mstUserRightsService.getUserRightPerCurrentUser("SOLD UNIT LIST").subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstUserRights.Id = data.Id;
            this.mstUserRights.UserId = data.UserId;
            this.mstUserRights.PageId = data.PageId;
            this.mstUserRights.Page = data.Page;
            this.mstUserRights.PageURL = data.PageURL;
            this.mstUserRights.CanEdit = data.CanEdit;
            this.mstUserRights.CanSave = data.CanSave;
            this.mstUserRights.CanLock = data.CanLock;
            this.mstUserRights.CanUnLock = data.CanUnLock;
            this.mstUserRights.CanPrint = data.CanPrint;
            this.mstUserRights.CanDelete = data.CanDelete;

            if (data.CanEdit == false && data.CanDelete == false) {
              this.soldUnitDisplayedColumns = [
                'SoldUnitNumber',
                'SoldUnitDate',
                'Project',
                'Unit',
                'Customer',
                'Status',
                'IsLocked',
                'Space'
              ];
            } else {
              if (data.CanEdit == false) {
                this.soldUnitDisplayedColumns = [
                  'ButtonDelete',
                  'SoldUnitNumber',
                  'SoldUnitDate',
                  'Project',
                  'Unit',
                  'Customer',
                  'Status',
                  'IsLocked',
                  'Space'
                ];
              } else if (data.CanDelete == false) {
                this.soldUnitDisplayedColumns = [
                  'ButtonEdit',
                  'SoldUnitNumber',
                  'SoldUnitDate',
                  'Project',
                  'Unit',
                  'Customer',
                  'Status',
                  'IsLocked',
                  'Space'
                ];
              } else {
                this.soldUnitDisplayedColumns = [
                  'ButtonEdit',
                  'ButtonDelete',
                  'SoldUnitNumber',
                  'SoldUnitDate',
                  'Project',
                  'Unit',
                  'Customer',
                  'Status',
                  'IsLocked',
                  'Space'
                ];
              }
            }
            this.getSoldUnitData();
          } else {
            this.isSpinnerShow = false;
            this.isPageForbidden = true;
          }
        }, 500);
      }
    );

    if (this.isFromCustomer == true) {
      this.soldUnitDisplayedColumns = [
        'ButtonPick',
        'SoldUnitNumber',
        'SoldUnitDate',
        'Project',
        'Unit',
        'Status',
        'IsLocked',
        'Space'
      ];
    }
  }
}
