import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TrnSoldUnitModel } from './../../model/trn-sold-unit.model';
import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { TrnCollectionPaymentModel } from './../../model/trn-collection-payment.model';

import { TrnSoldUnitService } from './../../service/trn-sold-unit/trn-sold-unit.service';
import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { TrnCollectionPaymentService } from './../../service/trn-collection-payment/trn-collection-payment.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity-collection-payment-detail',
  templateUrl: './activity-collection-payment-detail.component.html',
  styleUrls: ['./activity-collection-payment-detail.component.css']
})
export class ActivityCollectionPaymentDetailComponent implements OnInit {

  constructor(
    private activityCollectionPaymentDetailDialog: MatDialogRef<ActivityCollectionPaymentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private activityCollectionPaymentDetailDialogData: any,
    private toastr: ToastrService,
    private trnSoldUnitService: TrnSoldUnitService,
    private sysDropdownService: SysDropdownService,
    private trnCollectionPaymentService: TrnCollectionPaymentService
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public dialogTitle: any = this.activityCollectionPaymentDetailDialogData.dialogTitle;
  public dialogData: any = this.activityCollectionPaymentDetailDialogData.dialogData;

  public isButtonSaveConfirmationDisabled: boolean = false;

  public trnSoldUnitModel: TrnSoldUnitModel[] = [];
  public sysDropdownModel: SysDropdownModel[] = [];
  public trnCollectionPaymentModel: TrnCollectionPaymentModel = new TrnCollectionPaymentModel();

  public checkDate: Date = new Date();

  public getSoldUnitList(): void {
    this.trnSoldUnitService.getSoldUnitList().subscribe(
      data => {
        this.trnSoldUnitModel = data;

        this.getDropdownList();
      }
    );
  }

  public getDropdownList(): void {
    this.sysDropdownService.getDropdownList("PAY TYPE").subscribe(
      data => {
        this.sysDropdownModel = data;

        this.getCollectionPaymentDetail();
      }
    );
  }

  public getCollectionPaymentDetail() {
    this.trnCollectionPaymentService.getCollectionPaymentDetail(this.dialogData.Id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.trnCollectionPaymentModel.Id = data.Id;
            this.trnCollectionPaymentModel.CollectionId = data.CollectionId;
            this.trnCollectionPaymentModel.SoldUnitId = data.SoldUnitId;
            this.trnCollectionPaymentModel.SoldUnit = data.SoldUnit;
            this.trnCollectionPaymentModel.Project = data.Project;
            this.trnCollectionPaymentModel.PayType = data.PayType;
            this.trnCollectionPaymentModel.Amount = data.Amount;
            this.trnCollectionPaymentModel.CheckNumber = data.CheckNumber;
            this.trnCollectionPaymentModel.CheckDate = data.CheckDate;
            this.checkDate = new Date(data.CheckDate);
            this.trnCollectionPaymentModel.CheckBank = data.CheckBank;
            this.trnCollectionPaymentModel.OtherInformation = data.OtherInformation;
          } else {
            this.trnCollectionPaymentModel.CollectionId = this.dialogData.CollectionId;
            this.trnCollectionPaymentModel.CheckDate = new Date().toLocaleDateString();
          }

          this.isSpinnerShow = false;
          this.isContentShow = true;
        }, 500);

      }
    );
  }

  public checkDateDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.trnCollectionPaymentModel.CheckDate = this.checkDate.toLocaleDateString();
  }

  public buttonSaveClick() {
    this.isButtonSaveConfirmationDisabled = true;

    if (this.dialogData.Id == 0) {
      this.trnCollectionPaymentService.addCollectionPayment(this.trnCollectionPaymentModel).subscribe(
        data => {

          if (data[0] == true) {
            if (data[1] == 0) {
              this.toastr.error(data[1], 'Add Failed');
              this.isButtonSaveConfirmationDisabled = false;
            } else {
              this.toastr.success('Collection payment was successfully added!', 'Add Successful');
              this.activityCollectionPaymentDetailDialog.close(200);
            }
          } else {
            this.toastr.error(data[1], 'Add Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    } else {
      this.trnCollectionPaymentService.saveCollectionPayment(this.trnCollectionPaymentModel).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('Collection payment was successfully updated!', 'Save Successful');
            this.activityCollectionPaymentDetailDialog.close(200);
          } else {
            this.toastr.error(data[1], 'Save Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    }
  }

  public buttonCloseClick() {
    this.activityCollectionPaymentDetailDialog.close(null);
  }

  ngOnInit(): void {
    this.getSoldUnitList();
  }

}
