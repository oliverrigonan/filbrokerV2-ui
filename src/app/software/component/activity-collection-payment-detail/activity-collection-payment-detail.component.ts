import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TrnSoldUnitModel } from './../../model/trn-sold-unit.model';
import { TrnSoldUnitEquityScheduleModel } from './../../model/trn-sold-unit-equity-schedule.model';
import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { TrnCollectionPaymentModel } from './../../model/trn-collection-payment.model';

import { TrnSoldUnitService } from './../../service/trn-sold-unit/trn-sold-unit.service';
import { TrnSoldUnitEquityScheduleService } from './../../service/trn-sold-unit-equity-schedule/trn-sold-unit-equity-schedule.service';
import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { TrnCollectionPaymentService } from './../../service/trn-collection-payment/trn-collection-payment.service';

import { ToastrService } from 'ngx-toastr';

import { DecimalPipe } from '@angular/common';

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
    private trnSoldUnitEquityScheduleService: TrnSoldUnitEquityScheduleService,
    private sysDropdownService: SysDropdownService,
    public decimalPipe: DecimalPipe,
    private trnCollectionPaymentService: TrnCollectionPaymentService
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public dialogTitle: any = this.activityCollectionPaymentDetailDialogData.dialogTitle;
  public dialogData: any = this.activityCollectionPaymentDetailDialogData.dialogData;
  public customerId: any = this.activityCollectionPaymentDetailDialogData.customerId;

  public isButtonSaveConfirmationDisabled: boolean = false;

  public trnSoldUnitEquityScheduleModel: TrnSoldUnitEquityScheduleModel[] = [];
  public trnSoldUnitModel: TrnSoldUnitModel[] = [];
  public unitCode: string = "";
  public sysDropdownModel: SysDropdownModel[] = [];
  public trnCollectionPaymentModel: TrnCollectionPaymentModel = new TrnCollectionPaymentModel();

  public checkDate: Date = new Date();
  public collectionPaymentAmount: string = "0.00";

  public getSoldUnitList(): void {
    this.trnSoldUnitService.getSoldUnitListByCustomer(this.customerId).subscribe(
      data => {
        this.trnSoldUnitModel = data;
        this.getDropdownList();
      }
    );
  }

  public soldUnitChange(): void {
    this.getSoldUnitEquityList();
    this.unitCode = this.trnSoldUnitModel.filter(d => d.Id == this.trnCollectionPaymentModel.SoldUnitId)[0].Unit;
  }

  public getSoldUnitEquityList(): void {
    this.trnSoldUnitEquityScheduleService.getTrnSoldUnitEquitySchedule(this.trnCollectionPaymentModel.SoldUnitId).subscribe(
      data => {
        this.trnSoldUnitEquityScheduleModel = data;

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
            this.getSoldUnitEquityList();
            this.unitCode = this.trnSoldUnitModel.filter(d => d.Id == this.trnCollectionPaymentModel.SoldUnitId)[0].Unit;
            this.trnCollectionPaymentModel.SoldUnitEquityScheduleId = data.SoldUnitEquityScheduleId;
            this.trnCollectionPaymentModel.SoldUnitEquitySchedule = data.SoldUnitEquitySchedule;
            this.trnCollectionPaymentModel.Project = data.Project;
            this.trnCollectionPaymentModel.PayType = data.PayType;
            this.trnCollectionPaymentModel.Amount = data.Amount;
            this.collectionPaymentAmount = this.decimalPipe.transform(data.Amount, "1.2-2");
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

  public soldUnitEquityScheduleSelectionChange(event: any): void {
    let amount = this.trnSoldUnitEquityScheduleModel.filter(x => x.Id == this.trnCollectionPaymentModel.SoldUnitEquityScheduleId)[0].Amortization;

    this.trnCollectionPaymentModel.Amount = amount;
    this.collectionPaymentAmount = this.decimalPipe.transform(amount, "1.2-2");
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

  public onKeyPressNumberOnly(event: any): boolean {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      if (charCode === 46 && event.target.value.split('.').length === 2) {
        return false;
      } else {
        return true;
      }
    }
  }

  public onFocusNumberRemoveCommas(field: string) {
    if (field === "collectionPaymentAmount") {
      this.collectionPaymentAmount = this.collectionPaymentAmount.split(',').join("");
    }
  }

  public onaBlurNumberAddCommas(numberValue: string, field: string) {
    if (field === "collectionPaymentAmount") {
      this.collectionPaymentAmount = this.decimalPipe.transform(numberValue, "1.2-2");
      this.trnCollectionPaymentModel.Amount = parseFloat(this.collectionPaymentAmount.split(',').join(""));
    }
  }

  public buttonCloseClick() {
    this.activityCollectionPaymentDetailDialog.close(null);
  }

  ngOnInit(): void {
    this.getSoldUnitList();
  }

}
