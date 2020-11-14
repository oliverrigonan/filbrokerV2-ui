import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TrnSoldUnitRequirementActivityModel } from './../../model/trn-sold-unit-requirement-activity.model';

import { TrnSoldUnitRequirementActivityService } from './../../service/trn-sold-unit-requirement-activity/trn-sold-unit-requirement-activity.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity-sold-unit-requirement-activity-detail',
  templateUrl: './activity-sold-unit-requirement-activity-detail.component.html',
  styleUrls: ['./activity-sold-unit-requirement-activity-detail.component.css']
})
export class ActivitySoldUnitRequirementActivityDetailComponent implements OnInit {

  constructor(
    private activitySoldUnitRequirementActivityDetailDialog: MatDialogRef<ActivitySoldUnitRequirementActivityDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private activitySoldUnitRequirementActivityDetailDialogData: any,
    private toastr: ToastrService,
    private trnSoldUnitRequirementActivityService: TrnSoldUnitRequirementActivityService
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public dialogTitle: any = this.activitySoldUnitRequirementActivityDetailDialogData.dialogTitle;
  public dialogData: any = this.activitySoldUnitRequirementActivityDetailDialogData.dialogData;

  public isButtonSaveConfirmationDisabled: boolean = false;

  public trnSoldUnitRequirementActivityModel: TrnSoldUnitRequirementActivityModel = new TrnSoldUnitRequirementActivityModel();

  public activityDate: Date = new Date();

  public getSoldUnitRequirementActivityDetail() {
    this.trnSoldUnitRequirementActivityService.getSoldUnitRequirementActivityDetail(this.dialogData.Id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.trnSoldUnitRequirementActivityModel.Id = data.Id;
            this.trnSoldUnitRequirementActivityModel.SoldUnitRequirementId = data.SoldUnitRequirementId;
            this.trnSoldUnitRequirementActivityModel.ActivityDate = data.ActivityDate;
            this.trnSoldUnitRequirementActivityModel.Activity = data.Activity;
            this.trnSoldUnitRequirementActivityModel.Remarks = data.Remarks;
            this.trnSoldUnitRequirementActivityModel.UserId = data.UserId;
            this.trnSoldUnitRequirementActivityModel.User = data.User;
            this.trnSoldUnitRequirementActivityModel.ChecklistRequirement = data.ChecklistRequirement;
            this.trnSoldUnitRequirementActivityModel.SoldUnitNumber = data.SoldUnitNumber;
            this.trnSoldUnitRequirementActivityModel.Project = data.Project;
            this.trnSoldUnitRequirementActivityModel.UnitCode = data.UnitCode;
            this.trnSoldUnitRequirementActivityModel.Customer = data.Customer;
          } else {
            this.trnSoldUnitRequirementActivityModel.SoldUnitRequirementId = this.dialogData.SoldUnitRequirementId;
          }

          this.isSpinnerShow = false;
          this.isContentShow = true;
        }, 500);

      }
    );
  }

  public activityDateDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.trnSoldUnitRequirementActivityModel.ActivityDate = this.activityDate.toString();
  }

  public buttonSaveClick() {
    this.isButtonSaveConfirmationDisabled = true;

    if (this.dialogData.Id == 0) {
      this.trnSoldUnitRequirementActivityService.addSoldUnitRequirementActivity(this.trnSoldUnitRequirementActivityModel).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('Activity was successfully added!', 'Add Successful');
            this.activitySoldUnitRequirementActivityDetailDialog.close(200);
          } else {
            this.toastr.error(data[1], 'Add Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    } else {
      this.trnSoldUnitRequirementActivityService.saveSoldUnitRequirementActivity(this.trnSoldUnitRequirementActivityModel).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('Activity was successfully updated!', 'Save Successful');
            this.activitySoldUnitRequirementActivityDetailDialog.close(200);
          } else {
            this.toastr.error(data[1], 'Save Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    }
  }

  public buttonCloseClick() {
    this.activitySoldUnitRequirementActivityDetailDialog.close(null);
  }

  ngOnInit(): void {
    this.getSoldUnitRequirementActivityDetail();
  }

}
