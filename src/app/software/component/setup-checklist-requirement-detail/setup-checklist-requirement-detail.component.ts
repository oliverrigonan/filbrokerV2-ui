import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MstChecklistRequirementModel } from './../../model/mst-checklist-requirement.model';
import { SysDropdownModel } from './../../model/sys-dropdown.model';

import { MstChecklistRequirementsService } from './../../service/mst-checklist-requirements/mst-checklist-requirements.service';
import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setup-checklist-requirement-detail',
  templateUrl: './setup-checklist-requirement-detail.component.html',
  styleUrls: ['./setup-checklist-requirement-detail.component.css']
})
export class SetupChecklistRequirementDetailComponent implements OnInit {

  constructor(
    private setupChecklistRequirementDetailDialog: MatDialogRef<SetupChecklistRequirementDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private setupChecklistRequirementDetailDialogData: any,
    private toastr: ToastrService,
    private sysDropdownService: SysDropdownService,
    private mstChecklistRequirementService: MstChecklistRequirementsService
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public dialogTitle: any = this.setupChecklistRequirementDetailDialogData.dialogTitle;
  public dialogData: any = this.setupChecklistRequirementDetailDialogData.dialogData;

  public isButtonSaveConfirmationDisabled: boolean = false;

  public mstChecklistRequirementModel: MstChecklistRequirementModel = new MstChecklistRequirementModel();

  public sysDropdownModel: SysDropdownModel[] = [];

  public getDropdownList(): void {
    this.sysDropdownService.getDropdownList("REQUIREMENT TYPE").subscribe(
      data => {
        this.sysDropdownModel = data;
        this.getChecklistRequirementDetail();
      }
    );
  }

  public getChecklistRequirementDetail() {
    this.mstChecklistRequirementService.getChecklistRequirementDetail(this.dialogData.Id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstChecklistRequirementModel.Id = data.Id;
            this.mstChecklistRequirementModel.ChecklistId = data.ChecklistId;
            this.mstChecklistRequirementModel.Checklist = data.Checklist;
            this.mstChecklistRequirementModel.RequirementNo = data.RequirementNo;
            this.mstChecklistRequirementModel.Requirement = data.Requirement;
            this.mstChecklistRequirementModel.Category = data.Category;
            this.mstChecklistRequirementModel.Type = data.Type;
            this.mstChecklistRequirementModel.WithAttachments = data.WithAttachments;
          } else {
            this.mstChecklistRequirementModel.ChecklistId = this.dialogData.ChecklistId;
            this.mstChecklistRequirementModel.Checklist = this.dialogData.Checklist;
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
      this.mstChecklistRequirementService.addChecklistRequirement(this.mstChecklistRequirementModel).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('Checklist requirement was successfully added!', 'Add Successful');
            this.setupChecklistRequirementDetailDialog.close(200);
          } else {
            this.toastr.error(data[1], 'Add Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    } else {
      this.mstChecklistRequirementService.saveChecklistRequirement(this.mstChecklistRequirementModel).subscribe(
        data => {

          if (data[0] == true) {
            this.toastr.success('Checklist requirement was successfully updated!', 'Save Successful');
            this.setupChecklistRequirementDetailDialog.close(200);
          } else {
            this.toastr.error(data[1], 'Save Failed');
            this.isButtonSaveConfirmationDisabled = false;
          }
        }
      );
    }
  }

  public buttonCloseClick() {
    this.setupChecklistRequirementDetailDialog.close(null);
  }

  ngOnInit(): void {
    this.getDropdownList();
  }

}
