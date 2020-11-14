import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MstCustomerModel } from './../../model/mst-customer.model';
import { MstUserModel } from './../../model/mst-user.model';
import { TrnCollectionModel } from './../../model/trn-collection.model';
import { TrnCollectionPaymentModel } from './../../model/trn-collection-payment.model';

import { MstCustomerService } from './../../service/mst-customer/mst-customer.service';
import { MstUserService } from './../../service/mst-user/mst-user.service';
import { TrnCollectionService } from './../../service/trn-collection/trn-collection.service';
import { TrnCollectionPaymentService } from './../../service/trn-collection-payment/trn-collection-payment.service';

import { ConfirmationDeleteComponent } from './../confirmation-delete/confirmation-delete.component';
import { ActivityCollectionPaymentDetailComponent } from './../activity-collection-payment-detail/activity-collection-payment-detail.component';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity-collection-detail',
  templateUrl: './activity-collection-detail.component.html',
  styleUrls: ['./activity-collection-detail.component.css']
})
export class ActivityCollectionDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mstCustomerService: MstCustomerService,
    private mstUserService: MstUserService,
    private trnCollectionService: TrnCollectionService,
    private trnCollectionPaymentService: TrnCollectionPaymentService,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog,
    private activityCollectionPaymentDetailDialog: MatDialog
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public mstCustomerModel: MstCustomerModel[] = [];
  public mstUserModel: MstUserModel[] = [];
  public trnCollectionModel: TrnCollectionModel = new TrnCollectionModel();

  public isCollectionSaveButtonDisabled: boolean = false;
  public isCollectionLockButtonDisabled: boolean = false;
  public isCollectionUnlockButtonDisabled: boolean = false;

  public collectionDate: Date = new Date();

  public collectionPaymentDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'SoldUnit',
    'Project',
    'PayType',
    'Amount',
    'Space'
  ];

  public collectionPaymentDataSource: MatTableDataSource<TrnCollectionPaymentModel>;
  public collectionPaymentData: TrnCollectionPaymentModel[] = []

  @ViewChild('collectionPaymentPaginator') public collectionPaymentPaginator: MatPaginator;
  @ViewChild('collectionPaymentSort') public collectionPaymentSort: MatSort;

  public isButtonAddCollectionPaymentDisabled: boolean = false;

  public getCustomerList(): void {
    this.mstCustomerService.getCustomerList().subscribe(
      data => {
        this.mstCustomerModel = data;
        this.getUserList();
      }
    );
  }

  public getUserList(): void {
    this.mstUserService.getUserList().subscribe(
      data => {
        this.mstUserModel = data;

        let id = this.route.snapshot.params['id'];
        this.getCollectionDetail(id);
      }
    );
  }

  public getCollectionDetail(id: number): void {
    this.trnCollectionService.getCollectionDetail(id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.trnCollectionModel.Id = data.Id;
            this.trnCollectionModel.CollectionNumber = data.CollectionNumber;
            this.trnCollectionModel.CollectionDate = data.CollectionDate;
            this.trnCollectionModel.CustomerId = data.CustomerId;
            this.trnCollectionModel.Customer = data.Customer;
            this.trnCollectionModel.Particulars = data.Particulars;
            this.trnCollectionModel.PreparedBy = data.PreparedBy;
            this.trnCollectionModel.CheckedBy = data.CheckedBy;
            this.trnCollectionModel.ApprovedBy = data.ApprovedBy;
            this.trnCollectionModel.UpdatedBy = data.UpdatedBy;
            this.trnCollectionModel.IsLocked = data.IsLocked;

            this.isSpinnerShow = false;
            this.isContentShow = true;

            this.getCollectionPaymentData();

            this.isLockedButtons(this.trnCollectionModel.IsLocked);
          }
        }, 500);

      }
    );
  }

  public collectionDateDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.trnCollectionModel.CollectionDate = this.collectionDate.toString();
  }

  public disabledButtons(): void {
    this.isCollectionSaveButtonDisabled = true;
    this.isCollectionLockButtonDisabled = true;
    this.isCollectionUnlockButtonDisabled = true;
  }

  public isLockedButtons(isLocked: boolean): void {
    this.isCollectionSaveButtonDisabled = isLocked;
    this.isCollectionLockButtonDisabled = isLocked;
    this.isCollectionUnlockButtonDisabled = !isLocked;
  }

  public buttonSaveCollection(): void {
    this.disabledButtons();

    this.trnCollectionService.saveCollection(this.trnCollectionModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Collection was successfully saved!', 'Save Successful');
        } else {
          this.toastr.error(data[1], 'Save Failed');
        }

        this.isLockedButtons(this.trnCollectionModel.IsLocked);
      }
    );
  }

  public buttonLockCollection(): void {
    this.trnCollectionModel.IsLocked = true;
    this.disabledButtons();

    this.trnCollectionService.lockCollection(this.trnCollectionModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Collection was successfully locked!', 'Lock Successful');
        } else {
          this.toastr.error(data[1], 'Lock Failed');
          this.trnCollectionModel.IsLocked = false;
        }

        this.isLockedButtons(this.trnCollectionModel.IsLocked);
      }
    );
  }

  public buttonUnlockCollection(): void {
    this.disabledButtons();

    this.trnCollectionService.unlockCollection(this.trnCollectionModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Collection was successfully unlocked!', 'Unlock Successful');
          this.trnCollectionModel.IsLocked = false;
        } else {
          this.toastr.error(data[1], 'Unlock Failed');
          this.trnCollectionModel.IsLocked = true;
        }

        this.isLockedButtons(this.trnCollectionModel.IsLocked);
      }
    );
  }

  public getCollectionPaymentData(): void {
    this.collectionPaymentData = [];
    this.collectionPaymentDataSource = new MatTableDataSource(this.collectionPaymentData);
    this.collectionPaymentDataSource.paginator = this.collectionPaymentPaginator;
    this.collectionPaymentDataSource.sort = this.collectionPaymentSort;

    this.trnCollectionPaymentService.getCollectionPaymentListPerCollection(this.trnCollectionModel.Id).subscribe(
      data => {
        if (data.length > 0) {
          this.collectionPaymentData = data;
          this.collectionPaymentDataSource = new MatTableDataSource(this.collectionPaymentData);
          this.collectionPaymentDataSource.paginator = this.collectionPaymentPaginator;
          this.collectionPaymentDataSource.sort = this.collectionPaymentSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public collectionPaymentFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.collectionPaymentDataSource.filter = filterValue.trim().toLowerCase();

    if (this.collectionPaymentDataSource.paginator) {
      this.collectionPaymentDataSource.paginator.firstPage();
    }
  }

  public buttonAddCollectionPayment(): void {
    if (this.trnCollectionModel.IsLocked == true) {
      this.toastr.error("Cannot edit a locked record.", 'Edit Failed');
    } else {
      let trnCollectionPaymentModel: TrnCollectionPaymentModel = {
        Id: 0,
        CollectionId: this.trnCollectionModel.Id,
        SoldUnitId: 0,
        SoldUnit: "",
        Project: "",
        PayType: "",
        Amount: 0,
        CheckNumber: "",
        CheckDate: "",
        CheckBank: "",
        OtherInformation: ""
      };

      const openDialog = this.activityCollectionPaymentDetailDialog.open(ActivityCollectionPaymentDetailComponent, {
        width: '550px',
        data: {
          dialogTitle: "Add Payment",
          dialogData: trnCollectionPaymentModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {
        if (result != null) {
          this.getCollectionPaymentData();
        }
      });
    }
  }

  public buttonEditCollectionPayment(currentData: any): void {
    if (this.trnCollectionModel.IsLocked == true) {
      this.toastr.error("Cannot edit a locked record.", 'Edit Failed');
    } else {
      let id = currentData.Id;

      let trnCollectionPaymentModel: TrnCollectionPaymentModel = {
        Id: id,
        CollectionId: this.trnCollectionModel.Id,
        SoldUnitId: 0,
        SoldUnit: "",
        Project: "",
        PayType: "",
        Amount: 0,
        CheckNumber: "",
        CheckDate: "",
        CheckBank: "",
        OtherInformation: ""
      };

      const openDialog = this.activityCollectionPaymentDetailDialog.open(ActivityCollectionPaymentDetailComponent, {
        width: '550px',
        data: {
          dialogTitle: "Edit Payment",
          dialogData: trnCollectionPaymentModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {
        if (result != null) {
          this.getCollectionPaymentData();
        }
      });
    }
  }

  public buttonDeleteCollectionPayment(currentData: any): void {
    if (this.trnCollectionModel.IsLocked == true) {
      this.toastr.error("Cannot delete a locked record.", 'Delete Failed');
    } else {
      let id = currentData.Id;

      const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
        width: '450px',
        data: {
          dialogDeleteTitle: "Delete Payment",
          dialogDeleteMessage: "Are you sure you want to delete this pay type " + currentData.PayType + "?",
          dialogDeleteId: id
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

        if (result != null) {
          this.trnCollectionPaymentService.deleteCollectionPayment(result).subscribe(
            data => {

              if (data[0] == true) {
                this.toastr.success('Payment was successfully deleted!', 'Delete Successful');
                this.getCollectionPaymentData();
              } else {
                this.toastr.error(data[1], 'Delete Failed');
              }

            }
          );
        }
      });
    }
  }

  ngOnInit(): void {
    this.getCustomerList();
  }
}
