import { Component, OnInit, ViewChild, Inject, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TrnCommissionRequestModel } from './../../model/trn-commission-request.model';

import { TrnCommissionRequestService } from './../../service/trn-commission-request/trn-commission-request.service';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationDeleteComponent } from './../confirmation-delete/confirmation-delete.component';

@Component({
  selector: 'app-activity-commission-request-list',
  templateUrl: './activity-commission-request-list.component.html',
  styleUrls: ['./activity-commission-request-list.component.css']
})
export class ActivityCommissionRequestListComponent implements OnInit {

  public commissionRequestDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'CommissionRequestNumber',
    'CommissionRequestDate',
    'Broker',
    'SoldUnit',
    'Status',
    'IsLocked',
  ];

  public commissionRequestDataSource: MatTableDataSource<TrnCommissionRequestModel>;
  public commissionRequestData: TrnCommissionRequestModel[] = []

  @ViewChild('commissionRequestPaginator') public commissionRequestPaginator: MatPaginator;
  @ViewChild('commissionRequestSort') public commissionRequestSort: MatSort;

  public isButtonAddCommissionRequestDisabled: boolean = false;

  constructor(
    private trnCommissionRequestService: TrnCommissionRequestService,
    private router: Router,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public date = new Date();
  public firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  public lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  public commissionRequestListStartDateFilterFormControl = new FormControl(this.firstDay);
  public commissionRequestEndDateFilterFormControl = new FormControl(this.lastDay);

  public commissionRequestDateRangeFiltersDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.getCommissionRequestData();
  }

  public getCommissionRequestData(): void {
    this.commissionRequestData = [];
    this.commissionRequestDataSource = new MatTableDataSource(this.commissionRequestData);
    this.commissionRequestDataSource.paginator = this.commissionRequestPaginator;
    this.commissionRequestDataSource.sort = this.commissionRequestSort;

    let commissionRequestListStartDateFilterValue: string = new Date(this.commissionRequestListStartDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let commissionRequestEndDateFilterValue: string = new Date(this.commissionRequestEndDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.trnCommissionRequestService.getCommissionRequestListByDateRange(commissionRequestListStartDateFilterValue, commissionRequestEndDateFilterValue).subscribe(
      data => {
        if (data.length > 0) {
          this.commissionRequestData = data;
          this.commissionRequestDataSource = new MatTableDataSource(this.commissionRequestData);
          this.commissionRequestDataSource.paginator = this.commissionRequestPaginator;
          this.commissionRequestDataSource.sort = this.commissionRequestSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
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

  public buttonAddCommissionRequest(): void {
    this.isButtonAddCommissionRequestDisabled = true;

    let currentDate = new Date();

    let trnCommissionRequestModel: TrnCommissionRequestModel = {
      Id: 0,
      CommissionRequestNumber: "",
      CommissionRequestDate: currentDate.toLocaleDateString(),
      BrokerId: 0,
      Broker: "",
      SoldUnitId: 0,
      SoldUnit: "",
      CommissionNumber: "",
      Amount: 0,
      Remarks: "",
      PreparedBy: 0,
      PrepearedByUser: "",
      CheckedBy: 0,
      CheckedByUser: "",
      ApprovedBy: 0,
      ApprovedByUser: "",
      Status: "",
      IsLocked: false,
    };

    this.trnCommissionRequestService.addCommissionRequest(trnCommissionRequestModel).subscribe(
      data => {

        if (data[0] == true) {
          if (data[1] > 0) {
            this.toastr.success('Commission request was successfully added!', 'Add Successful');

            setTimeout(() => {
              this.router.navigate(['/software/activity-commission-request-detail/' + data[1]]);
            }, 500);
          } else {
            this.toastr.error('Somethings went wrong!', 'Add Failed');
            this.isButtonAddCommissionRequestDisabled = false;
          }
        } else {
          this.toastr.error(data[1], 'Add Failed');
          this.isButtonAddCommissionRequestDisabled = false;
        }

      }
    );
  }

  public buttonEditCommissionRequest(currentData: any): void {
    let id = currentData.Id;
    this.router.navigate(['/software/activity-commission-request-detail/' + id]);
  }

  public buttonDeleteCommissionRequest(currentData: any): void {
    if (currentData.IsLocked == true) {
      this.toastr.error("Cannot delete a locked record.", 'Delete Failed');
    } else {
      let id = currentData.Id;

      const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
        width: '450px',
        data: {
          dialogDeleteTitle: "Delete Sold Unit",
          dialogDeleteMessage: "Are you sure you want to delete this commission request number " + currentData.CommissionRequestNumber,
          dialogDeleteId: id
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

        if (result != null) {
          this.isSpinnerShow = true;
          this.isContentShow = false;

          this.trnCommissionRequestService.deleteCommissionRequest(result).subscribe(
            data => {

              if (data[0] == true) {
                this.toastr.success('Commission request was successfully deleted!', 'Delete Successful');
                this.getCommissionRequestData();
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

  ngOnInit(): void {
    this.getCommissionRequestData();
  }
}
