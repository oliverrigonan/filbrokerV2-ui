import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { TrnSoldUnitRequirementModel } from './../../model/trn-sold-unit-requirement.model';

import { TrnSoldUnitRequirementService } from './../../service/trn-sold-unit-requirement/trn-sold-unit-requirement.service';

import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activity-sold-unit-requirement-detail',
  templateUrl: './activity-sold-unit-requirement-detail.component.html',
  styleUrls: ['./activity-sold-unit-requirement-detail.component.css']
})
export class ActivitySoldUnitRequirementDetailComponent implements OnInit {

  constructor(
    private activitySoldUnitRequirementDetailDialog: MatDialogRef<ActivitySoldUnitRequirementDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private activitySoldUnitRequirementDetailData: any,
    private toastr: ToastrService,
    private sysDropdownService: SysDropdownService,
    private trnSoldUnitRequirementService: TrnSoldUnitRequirementService
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public dialogTitle: any = this.activitySoldUnitRequirementDetailData.dialogTitle;
  public dialogData: any = this.activitySoldUnitRequirementDetailData.dialogData;

  public isButtonSaveConfirmationDisabled: boolean = false;

  public sysDropdownModel: SysDropdownModel[] = [];
  public trnSoldUnitRequirementModel: TrnSoldUnitRequirementModel = new TrnSoldUnitRequirementModel();

  @ViewChild("inputFileAttachment1") public inputFileAttachment1: any;
  @ViewChild("inputFileAttachment2") public inputFileAttachment2: any;
  @ViewChild("inputFileAttachment3") public inputFileAttachment3: any;
  @ViewChild("inputFileAttachment4") public inputFileAttachment4: any;
  @ViewChild("inputFileAttachment5") public inputFileAttachment5: any;
  public isUploadDisabled: boolean = false;

  public getDropdownList(): void {
    this.sysDropdownService.getDropdownList("REQUIREMENT STATUS").subscribe(
      data => {
        this.sysDropdownModel = data;

        this.getSoldUnitRequirementDetail();
      }
    );
  }

  public getSoldUnitRequirementDetail() {
    this.trnSoldUnitRequirementService.getSoldUnitRequirementDetail(this.dialogData.Id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.trnSoldUnitRequirementModel.Id = data.Id;
            this.trnSoldUnitRequirementModel.SoldUnitId = data.SoldUnitId;
            this.trnSoldUnitRequirementModel.ChecklistRequirementId = data.ChecklistRequirementId;
            this.trnSoldUnitRequirementModel.ChecklistRequirement = data.ChecklistRequirement;
            this.trnSoldUnitRequirementModel.ChecklistRequirementNo = data.ChecklistRequirementNo;
            this.trnSoldUnitRequirementModel.ChecklistCategory = data.ChecklistCategory;
            this.trnSoldUnitRequirementModel.ChecklistType = data.ChecklistType;
            this.trnSoldUnitRequirementModel.ChecklistWithAttachments = data.ChecklistWithAttachments;
            this.trnSoldUnitRequirementModel.Attachment1 = data.Attachment1;
            this.trnSoldUnitRequirementModel.Attachment2 = data.Attachment2;
            this.trnSoldUnitRequirementModel.Attachment3 = data.Attachment3;
            this.trnSoldUnitRequirementModel.Attachment4 = data.Attachment4;
            this.trnSoldUnitRequirementModel.Attachment5 = data.Attachment5;
            this.trnSoldUnitRequirementModel.Remarks = data.Remarks;
            this.trnSoldUnitRequirementModel.Status = data.Status;
            this.trnSoldUnitRequirementModel.StatusDate = data.StatusDate;
          } else {
            this.trnSoldUnitRequirementModel.SoldUnitId = this.dialogData.SoldUnitId;
          }

          this.isSpinnerShow = false;
          this.isContentShow = true;
        }, 500);

      }
    );
  }


  public buttonUploadAttachment1(): void {
    this.isUploadDisabled = true;

    let fi = this.inputFileAttachment1.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      this.trnSoldUnitRequirementService.uploadSoldUnitRequirementAttachment(fileToUpload).subscribe(
        data => {

          setTimeout(() => {
            if (data[0] == true) {
              this.toastr.success('Attachment 1 was successfully uploaded!', 'Upload Successful');
              let URL = data[1];
              this.trnSoldUnitRequirementModel.Attachment1 = URL;
              this.inputFileAttachment1.nativeElement.value = "";
            } else {
              this.toastr.error(data[1], 'Upload Failed');
            }

            this.isUploadDisabled = false;
          }, 100);

        }
      );
    } else {
      this.toastr.error("No file chosen.", 'Upload Failed');
      this.isUploadDisabled = false;
    }
  }

  public buttonClearAttachment1(): void {
    this.trnSoldUnitRequirementModel.Attachment1 = "";
  }

  public buttonViewAttachment1(): void {
    let win = window.open(this.trnSoldUnitRequirementModel.Attachment1, '_blank');
    win.focus();
  }

  public buttonUploadAttachment2(): void {
    this.isUploadDisabled = true;

    let fi = this.inputFileAttachment2.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      this.trnSoldUnitRequirementService.uploadSoldUnitRequirementAttachment(fileToUpload).subscribe(
        data => {

          setTimeout(() => {
            if (data[0] == true) {
              this.toastr.success('Attachment 1 was successfully uploaded!', 'Upload Successful');
              let URL = data[1];
              this.trnSoldUnitRequirementModel.Attachment2 = URL;
              this.inputFileAttachment2.nativeElement.value = "";
            } else {
              this.toastr.error(data[1], 'Upload Failed');
            }

            this.isUploadDisabled = false;
          }, 100);

        }
      );
    } else {
      this.toastr.error("No file chosen.", 'Upload Failed');
      this.isUploadDisabled = false;
    }
  }

  public buttonClearAttachment2(): void {
    this.trnSoldUnitRequirementModel.Attachment2 = "";
  }

  public buttonViewAttachment2(): void {
    let win = window.open(this.trnSoldUnitRequirementModel.Attachment2, '_blank');
    win.focus();
  }

  public buttonUploadAttachment3(): void {
    this.isUploadDisabled = true;

    let fi = this.inputFileAttachment3.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      this.trnSoldUnitRequirementService.uploadSoldUnitRequirementAttachment(fileToUpload).subscribe(
        data => {

          setTimeout(() => {
            if (data[0] == true) {
              this.toastr.success('Attachment 1 was successfully uploaded!', 'Upload Successful');
              let URL = data[1];
              this.trnSoldUnitRequirementModel.Attachment3 = URL;
              this.inputFileAttachment3.nativeElement.value = "";
            } else {
              this.toastr.error(data[1], 'Upload Failed');
            }

            this.isUploadDisabled = false;
          }, 100);

        }
      );
    } else {
      this.toastr.error("No file chosen.", 'Upload Failed');
      this.isUploadDisabled = false;
    }
  }

  public buttonClearAttachment3(): void {
    this.trnSoldUnitRequirementModel.Attachment3 = "";
  }

  public buttonViewAttachment3(): void {
    let win = window.open(this.trnSoldUnitRequirementModel.Attachment3, '_blank');
    win.focus();
  }

  public buttonUploadAttachment4(): void {
    this.isUploadDisabled = true;

    let fi = this.inputFileAttachment4.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      this.trnSoldUnitRequirementService.uploadSoldUnitRequirementAttachment(fileToUpload).subscribe(
        data => {

          setTimeout(() => {
            if (data[0] == true) {
              this.toastr.success('Attachment 1 was successfully uploaded!', 'Upload Successful');
              let URL = data[1];
              this.trnSoldUnitRequirementModel.Attachment4 = URL;
              this.inputFileAttachment4.nativeElement.value = "";
            } else {
              this.toastr.error(data[1], 'Upload Failed');
            }

            this.isUploadDisabled = false;
          }, 100);

        }
      );
    } else {
      this.toastr.error("No file chosen.", 'Upload Failed');
      this.isUploadDisabled = false;
    }
  }

  public buttonClearAttachment4(): void {
    this.trnSoldUnitRequirementModel.Attachment4 = "";
  }

  public buttonViewAttachment4(): void {
    let win = window.open(this.trnSoldUnitRequirementModel.Attachment4, '_blank');
    win.focus();
  }

  public buttonUploadAttachment5(): void {
    this.isUploadDisabled = true;

    let fi = this.inputFileAttachment5.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      this.trnSoldUnitRequirementService.uploadSoldUnitRequirementAttachment(fileToUpload).subscribe(
        data => {

          setTimeout(() => {
            if (data[0] == true) {
              this.toastr.success('Attachment 1 was successfully uploaded!', 'Upload Successful');
              let URL = data[1];
              this.trnSoldUnitRequirementModel.Attachment5 = URL;
              this.inputFileAttachment5.nativeElement.value = "";
            } else {
              this.toastr.error(data[1], 'Upload Failed');
            }

            this.isUploadDisabled = false;
          }, 100);

        }
      );
    } else {
      this.toastr.error("No file chosen.", 'Upload Failed');
      this.isUploadDisabled = false;
    }
  }

  public buttonClearAttachment5(): void {
    this.trnSoldUnitRequirementModel.Attachment5 = "";
  }

  public buttonViewAttachment5(): void {
    let win = window.open(this.trnSoldUnitRequirementModel.Attachment5, '_blank');
    win.focus();
  }

  public buttonSaveClick() {
    this.isButtonSaveConfirmationDisabled = true;

    if (this.dialogData.Id != 0) {
      this.trnSoldUnitRequirementService.saveSoldUnitRequirement(this.trnSoldUnitRequirementModel).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('Sold unit requirement was successfully updated!', 'Save Successful');
            this.activitySoldUnitRequirementDetailDialog.close(200);
          } else {
            this.toastr.error(data[1], 'Save Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    }
  }

  public buttonCloseClick() {
    this.activitySoldUnitRequirementDetailDialog.close(null);
  }

  ngOnInit(): void {
    this.getDropdownList();
  }

}
