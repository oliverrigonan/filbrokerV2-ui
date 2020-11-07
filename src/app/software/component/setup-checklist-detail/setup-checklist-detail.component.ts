import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { MstHouseModelModel } from './../../model/mst-house-model.model';
import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { MstChecklistModel } from './../../model/mst-checklist.model';

import { MstHouseModelService } from './../../service/mst-house-model/mst-house-model.service';
import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { MstChecklistService } from './../../service/mst-checklist/mst-checklist.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setup-checklist-detail',
  templateUrl: './setup-checklist-detail.component.html',
  styleUrls: ['./setup-checklist-detail.component.css']
})
export class SetupChecklistDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mstHouseModelService: MstHouseModelService,
    private sysDropdownService: SysDropdownService,
    private mstChecklistService: MstChecklistService,
    private toastr: ToastrService,
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public mstChecklistModel: MstChecklistModel = new MstChecklistModel();
  public mstHouseModelModel: MstHouseModelModel[] = [];
  public sysDropdownModel: SysDropdownModel[] = [];

  public isChecklistSaveButtonDisabled: boolean = false;
  public isChecklistLockButtonDisabled: boolean = false;
  public isChecklistUnlockButtonDisabled: boolean = false;

  public checklistDate: Date = new Date();

  public getDropdownList(): void {
    this.sysDropdownService.getDropdownList("CHECKLIST STATUS").subscribe(
      data => {
        this.sysDropdownModel = data;

        let id = this.route.snapshot.params['id'];
        this.getChecklistDetail(id);
      }
    );
  }

  public getChecklistDetail(id: number): void {
    this.mstChecklistService.getChecklistDetail(id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstChecklistModel.Id = data.Id;
            this.mstChecklistModel.ChecklistCode = data.ChecklistCode;
            this.mstChecklistModel.Checklist = data.Checklist;
            this.mstChecklistModel.ChecklistDate = data.ChecklistDate;
            this.checklistDate = new Date(data.ChecklistDate);
            this.mstChecklistModel.ProjectId = data.ProjectId;
            this.mstChecklistModel.Project = data.Project;
            this.mstChecklistModel.Remarks = data.Remarks;
            this.mstChecklistModel.Status = data.Status;
            this.mstChecklistModel.IsLocked = data.IsLocked;

            this.getHouseModelList(this.mstChecklistModel.ProjectId);

            this.isLockedButtons(this.mstChecklistModel.IsLocked);
          }
        }, 500);

      }
    );
  }

  public checklstDateDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.mstChecklistModel.ChecklistDate = this.checklistDate.toString();
  }

  public getHouseModelList(projectId: number): void {
    this.mstHouseModelService.getHouseModelListPerProject(projectId).subscribe(
      data => {
        this.mstHouseModelModel = data;

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public disabledButtons(): void {
    this.isChecklistSaveButtonDisabled = true;
    this.isChecklistLockButtonDisabled = true;
    this.isChecklistUnlockButtonDisabled = true;
  }

  public isLockedButtons(isLocked: boolean): void {
    this.isChecklistSaveButtonDisabled = isLocked;
    this.isChecklistLockButtonDisabled = isLocked;
    this.isChecklistUnlockButtonDisabled = !isLocked;
  }

  public buttonSaveChecklist(): void {
    this.disabledButtons();

    this.mstChecklistService.saveChecklist(this.mstChecklistModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Checklist was successfully saved!', 'Save Successful');
        } else {
          this.toastr.error(data[1], 'Save Failed');
        }

        this.isLockedButtons(this.mstChecklistModel.IsLocked);
      }
    );
  }

  public buttonLockChecklist(): void {
    this.mstChecklistModel.IsLocked = true;
    this.disabledButtons();

    this.mstChecklistService.lockChecklist(this.mstChecklistModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Checklist was successfully locked!', 'Lock Successful');
        } else {
          this.toastr.error(data[1], 'Lock Failed');
          this.mstChecklistModel.IsLocked = false;
        }

        this.isLockedButtons(this.mstChecklistModel.IsLocked);
      }
    );
  }

  public buttonUnlockChecklist(): void {
    this.disabledButtons();

    this.mstChecklistService.unlockChecklist(this.mstChecklistModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Checklist was successfully unlocked!', 'Unlock Successful');
          this.mstChecklistModel.IsLocked = false;
        } else {
          this.toastr.error(data[1], 'Unlock Failed');
          this.mstChecklistModel.IsLocked = true;
        }

        this.isLockedButtons(this.mstChecklistModel.IsLocked);
      }
    );
  }

  ngOnInit(): void {
    this.getDropdownList();
  }

}
