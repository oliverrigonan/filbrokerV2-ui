import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

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

import { MstUserRights } from './../../model/mst-user-rights.model';
import { MstUserRightsService } from './../../service/mst-user-rights/mst-user-rights.service';

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
    public decimalPipe: DecimalPipe,
    private confirmationDeleteDialog: MatDialog,
    private activityCollectionPaymentDetailDialog: MatDialog,
    private mstUserRightsService: MstUserRightsService,
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;
  public isPageForbidden: boolean = false;

  public mstCustomerModel: MstCustomerModel[] = [];
  public mstUserModel: MstUserModel[] = [];
  public trnCollectionModel: TrnCollectionModel = new TrnCollectionModel();
  
  public mstUserRights: MstUserRights = new MstUserRights();

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
    'Agent',
    'Broker',
    'Space'
  ];

  public collectionPaymentDataSource: MatTableDataSource<TrnCollectionPaymentModel>;
  public collectionPaymentData: TrnCollectionPaymentModel[] = []

  @ViewChild('collectionPaymentPaginator') public collectionPaymentPaginator: MatPaginator;
  @ViewChild('collectionPaymentSort') public collectionPaymentSort: MatSort;

  public isButtonAddCollectionPaymentDisabled: boolean = false;

  public getCustomerList(): void {
    this.mstCustomerService.getCustomerListSorted().subscribe(
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
            this.trnCollectionModel.ManualNumber = data.ManualNumber;
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
        CollectionDate: "",
        CollectionManualNumber: "",
        CollectionCustomer: "",
        CollectionPreparedBy: "",
        SoldUnitId: 0,
        SoldUnit: "",
        SoldUnitEquityScheduleId: 0,
        SoldUnitEquitySchedule: "",
        Project: "",
        PayType: "",
        Amount: 0,
        Agent: "",
        Broker: "",
        CheckNumber: "",
        CheckDate: "",
        CheckBank: "",
        OtherInformation: "",
      };

      const openDialog = this.activityCollectionPaymentDetailDialog.open(ActivityCollectionPaymentDetailComponent, {
        width: '650px',
        data: {
          dialogTitle: "Add Payment",
          dialogData: trnCollectionPaymentModel,
          customerId: this.trnCollectionModel.CustomerId
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
        CollectionDate: "",
        CollectionManualNumber: "",
        CollectionCustomer: "",
        CollectionPreparedBy: "",
        SoldUnitId: 0,
        SoldUnit: "",
        SoldUnitEquityScheduleId: 0,
        SoldUnitEquitySchedule: "",
        Project: "",
        PayType: "",
        Amount: 0,
        Agent: "",
        Broker: "",
        CheckNumber: "",
        CheckDate: "",
        CheckBank: "",
        OtherInformation: ""
      };

      const openDialog = this.activityCollectionPaymentDetailDialog.open(ActivityCollectionPaymentDetailComponent, {
        width: '650px',
        data: {
          dialogTitle: "Edit Payment",
          dialogData: trnCollectionPaymentModel,
          customerId: this.trnCollectionModel.CustomerId
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

    this.mstUserRightsService.getUserRightPerCurrentUser("BROKER DETAIL").subscribe(
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
              this.collectionPaymentDisplayedColumns = [
                'SoldUnit',
                'Project',
                'PayType',
                'Amount',
                'Agent',
                'Broker',
                'Space'
              ];
            } else {
              if (data.CanEdit == false) {
                this.collectionPaymentDisplayedColumns = [
                  'ButtonDelete',
                  'SoldUnit',
                  'Project',
                  'PayType',
                  'Amount',
                  'Agent',
                  'Broker',
                  'Space'
                ];
              } else if (data.CanDelete == false) {
                this.collectionPaymentDisplayedColumns = [
                  'ButtonEdit',
                  'SoldUnit',
                  'Project',
                  'PayType',
                  'Amount',
                  'Agent',
                  'Broker',
                  'Space'
                ];
              } else {
                this.collectionPaymentDisplayedColumns = [
                  'ButtonEdit',
                  'ButtonDelete',
                  'SoldUnit',
                  'Project',
                  'PayType',
                  'Amount',
                  'Agent',
                  'Broker',
                  'Space'
                ];
              }
            }
            this.getCustomerList();

          } else {
            this.isSpinnerShow = false;
            this.isPageForbidden = true;
          }
        }, 500);
      }
    );
  }
}
