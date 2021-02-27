import { Component, OnInit, Inject } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TrnSoldUnitEquityScheduleModel } from './../../model/trn-sold-unit-equity-schedule.model';

import { MstCustomerService } from './../../service/mst-customer/mst-customer.service';
import { TrnSoldUnitEquityScheduleService } from './../../service/trn-sold-unit-equity-schedule/trn-sold-unit-equity-schedule.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity-sold-unit-equity-schedule-detail',
  templateUrl: './activity-sold-unit-equity-schedule-detail.component.html',
  styleUrls: ['./activity-sold-unit-equity-schedule-detail.component.css']
})
export class ActivitySoldUnitEquityScheduleDetailComponent implements OnInit {

  constructor(
    private activitySoldUniEquityScheduleDetailDialog: MatDialogRef<ActivitySoldUnitEquityScheduleDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private activitySoldUnitCoOwnerDetailDialogData: any,
    private toastr: ToastrService,
    private trnSoldUnitEquityScheduleService: TrnSoldUnitEquityScheduleService
  ) { }
  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public dialogTitle: any = this.activitySoldUnitCoOwnerDetailDialogData.dialogTitle;
  public dialogData: any = this.activitySoldUnitCoOwnerDetailDialogData.dialogData;

  public isButtonSaveConfirmationDisabled: boolean = false;

  public trnSoldUnitEquityScheduleModel: TrnSoldUnitEquityScheduleModel = new TrnSoldUnitEquityScheduleModel();

  public getSoldUnitEquityScheduleDetail() {
    this.trnSoldUnitEquityScheduleService.getSoldUnitEquityScheduleDetail(this.dialogData.Id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.trnSoldUnitEquityScheduleModel.Id = data.Id;
            this.trnSoldUnitEquityScheduleModel.SoldUnitId = data.SoldUnitId;
            this.trnSoldUnitEquityScheduleModel.PaymentDate = data.PaymentDate;
            this.trnSoldUnitEquityScheduleModel.Amortization = data.Amortization;
            this.trnSoldUnitEquityScheduleModel.CheckNumber = data.CheckNumber;
            this.trnSoldUnitEquityScheduleModel.CheckDate = data.CheckDate;
            this.trnSoldUnitEquityScheduleModel.CheckBank = data.CheckBank;
            this.trnSoldUnitEquityScheduleModel.Remarks = data.Remarks;
          } else {
            this.trnSoldUnitEquityScheduleModel.SoldUnitId = this.dialogData.SoldUnitId;
          }

          this.isSpinnerShow = false;
          this.isContentShow = true;
        }, 500);

      }
    );
  }

  public buttonSaveClick() {
    this.isButtonSaveConfirmationDisabled = true;

    if (this.dialogData.Id == 0) {
      this.trnSoldUnitEquityScheduleService.saveSoldUnitEquitySchedule(this.trnSoldUnitEquityScheduleModel).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('Equity schedule was successfully added!', 'Add Successful');
            this.activitySoldUniEquityScheduleDetailDialog.close(200);
          } else {
            this.toastr.error(data[1], 'Add Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    } else {
      this.trnSoldUnitEquityScheduleService.saveSoldUnitEquitySchedule(this.trnSoldUnitEquityScheduleModel).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('Equity schedule was successfully updated!', 'Save Successful');
            this.activitySoldUniEquityScheduleDetailDialog.close(200);
          } else {
            this.toastr.error(data[1], 'Save Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    }
  }

  public buttonCloseClick() {
    this.activitySoldUniEquityScheduleDetailDialog.close(null);
  }
  ngOnInit(): void {
    this.getSoldUnitEquityScheduleDetail();
  }

}
