import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DecimalPipe } from '@angular/common';

import { MstUserRights } from './../../model/mst-user-rights.model';

import { MstUserRightsService } from './../../service/mst-user-rights/mst-user-rights.service';

import { ToastrService } from 'ngx-toastr';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-system-user-rights-detail',
  templateUrl: './system-user-rights-detail.component.html',
  styleUrls: ['./system-user-rights-detail.component.css']
})
export class SystemUserRightsDetailComponent implements OnInit {

  constructor(
    private systemUserRightsDetailComponent: MatDialogRef<SystemUserRightsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private systemUserRightsDetailDialogData: any,
    private toastr: ToastrService,
    public decimalPipe: DecimalPipe,
    private mstUserRightsService: MstUserRightsService
  ) { }
  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public dialogTitle: any = this.systemUserRightsDetailDialogData.dialogTitle;
  public dialogData: any = this.systemUserRightsDetailDialogData.dialogData;

  public isButtonSaveConfirmationDisabled: boolean = false;
  
  public mstUserRights: MstUserRights = new MstUserRights();

  public getUserRightsDetail() {
    this.mstUserRightsService.getUserRightsDetail(this.dialogData.Id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstUserRights.Id = data.Id;
            this.mstUserRights.UserId = data.UserId;
            this.mstUserRights.PageId = data.PageId;
            this.mstUserRights.PageURL = data.PageURL;
            this.mstUserRights.CanEdit = data.CanEdit;
            this.mstUserRights.CanSave = data.CanSave;
            this.mstUserRights.CanLock = data.CanLock;
            this.mstUserRights.CanUnLock = data.CanUnLock;
            this.mstUserRights.CanPrint = data.CanPrint;
            this.mstUserRights.CanDelete = data.CanDelete;

          } else {
            this.mstUserRights.UserId = this.dialogData.UserId;
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
      this.mstUserRightsService.saveUserRights(this.mstUserRights).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('User Rights was successfully added!', 'Add Successful');
            this.systemUserRightsDetailComponent.close(200);
          } else {
            this.toastr.error(data[1], 'Add Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    } else {
      this.mstUserRightsService.saveUserRights(this.mstUserRights).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('User Rights was successfully updated!', 'Save Successful');
            this.systemUserRightsDetailComponent.close(200);
          } else {
            this.toastr.error(data[1], 'Save Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    }
  }

  public buttonCloseClick() {
    this.systemUserRightsDetailComponent.close(null);
  }
  ngOnInit(): void {
    this.getUserRightsDetail();
  }

}
