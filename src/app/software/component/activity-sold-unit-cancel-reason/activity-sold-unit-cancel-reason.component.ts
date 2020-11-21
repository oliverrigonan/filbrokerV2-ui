import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TrnSoldUnitModel } from './../../model/trn-sold-unit.model';
import { TrnSoldUnitService } from './../../service/trn-sold-unit/trn-sold-unit.service';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationCancelComponent } from './../../component/confirmation-cancel/confirmation-cancel.component';

@Component({
  selector: 'app-activity-sold-unit-cancel-reason',
  templateUrl: './activity-sold-unit-cancel-reason.component.html',
  styleUrls: ['./activity-sold-unit-cancel-reason.component.css']
})
export class ActivitySoldUnitCancelReasonComponent implements OnInit {

  constructor(
    private activitySoldUnitCancelReasonDialog: MatDialogRef<ActivitySoldUnitCancelReasonComponent>,
    @Inject(MAT_DIALOG_DATA) private activitySoldUnitCancelReasonDialogData: any,
    private toastr: ToastrService,
    private trnSoldUnitService: TrnSoldUnitService,
    private confirmationCancelDialog: MatDialog
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public dialogTitle: any = this.activitySoldUnitCancelReasonDialogData.dialogTitle;
  public dialogData: any = this.activitySoldUnitCancelReasonDialogData.dialogData;

  public isButtonOKConfirmationDisabled: boolean = false;

  public trnSoldUnitModel: TrnSoldUnitModel = new TrnSoldUnitModel();

  public buttonOKClick() {
    this.isButtonOKConfirmationDisabled = true;

    if (this.dialogData.Id != 0) {
      const openDialog = this.confirmationCancelDialog.open(ConfirmationCancelComponent, {
        width: '450px',
        data: {
          dialogCancelTitle: "Cancel Sold Unit",
          dialogCancelMessage: "Are you sure you want to cancel this sold unit number " + this.dialogData.SoldUnitNumber + "?",
          dialogCancelId: this.dialogData.Id
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

        if (result != null) {
          this.isSpinnerShow = true;
          this.isContentShow = false;

          this.trnSoldUnitService.cancelSoldUnit(this.trnSoldUnitModel).subscribe(
            data => {

              if (data[0] == true) {
                this.toastr.success('Sold unit was successfully cancelled!', 'Cancel Successful');
                this.activitySoldUnitCancelReasonDialog.close(200);
              } else {
                this.toastr.error(data[1], 'Cancel Failed');
                this.isButtonOKConfirmationDisabled = false;
              }
            }
          );
        }
      });
    }
  }

  public buttonCloseClick() {
    this.activitySoldUnitCancelReasonDialog.close(null);
  }

  ngOnInit(): void {
    this.trnSoldUnitModel.Id = this.dialogData.Id;
    this.trnSoldUnitModel.Remarks = "";
  }

}
