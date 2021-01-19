import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MstCustomerModel } from './../../model/mst-customer.model';
import { TrnSoldUnitCoOwnerModel } from './../../model/trn-sold-unit-co-owner.model';

import { MstCustomerService } from './../../service/mst-customer/mst-customer.service';
import { TrnSoldUnitCoOwnerService } from './../../service/trn-sold-unit-co-owner/trn-sold-unit-co-owner.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity-sold-unit-co-owner-detail',
  templateUrl: './activity-sold-unit-co-owner-detail.component.html',
  styleUrls: ['./activity-sold-unit-co-owner-detail.component.css']
})
export class ActivitySoldUnitCoOwnerDetailComponent implements OnInit {

  constructor(
    private activitySoldUnitCoOwnerDetailDialog: MatDialogRef<ActivitySoldUnitCoOwnerDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private activitySoldUnitCoOwnerDetailDialogData: any,
    private toastr: ToastrService,
    private mstCustomerService: MstCustomerService,
    private trnSoldUnitCoOwnerService: TrnSoldUnitCoOwnerService
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public dialogTitle: any = this.activitySoldUnitCoOwnerDetailDialogData.dialogTitle;
  public dialogData: any = this.activitySoldUnitCoOwnerDetailDialogData.dialogData;

  public isButtonSaveConfirmationDisabled: boolean = false;

  public mstCustomerModel: MstCustomerModel[] = [];
  public trnSoldUnitCoOwnerModel: TrnSoldUnitCoOwnerModel = new TrnSoldUnitCoOwnerModel();

  public getCustomerList(): void {
    this.mstCustomerService.getCustomerList().subscribe(
      data => {
        this.mstCustomerModel = data;
        this.getSoldUnitCoOwnerDetail();
      }
    );
  }

  public getSoldUnitCoOwnerDetail() {
    this.trnSoldUnitCoOwnerService.getSoldUnitCoOwnerDetail(this.dialogData.Id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.trnSoldUnitCoOwnerModel.Id = data.Id;
            this.trnSoldUnitCoOwnerModel.SoldUnitId = data.SoldUnitId;
            this.trnSoldUnitCoOwnerModel.CustomerId = data.CustomerId;
          } else {
            this.trnSoldUnitCoOwnerModel.SoldUnitId = this.dialogData.SoldUnitId;
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
      this.trnSoldUnitCoOwnerService.addSoldUnitCoOwner(this.trnSoldUnitCoOwnerModel).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('Co-Owner was successfully added!', 'Add Successful');
            this.activitySoldUnitCoOwnerDetailDialog.close(200);
          } else {
            this.toastr.error(data[1], 'Add Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    } else {
      this.trnSoldUnitCoOwnerService.saveSoldUnitCoOwner(this.trnSoldUnitCoOwnerModel).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('Co-Owner was successfully updated!', 'Save Successful');
            this.activitySoldUnitCoOwnerDetailDialog.close(200);
          } else {
            this.toastr.error(data[1], 'Save Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    }
  }

  public buttonCloseClick() {
    this.activitySoldUnitCoOwnerDetailDialog.close(null);
  }

  ngOnInit(): void {
    this.getCustomerList();
  }
}
