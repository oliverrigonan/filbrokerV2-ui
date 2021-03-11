import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MstChecklistRequirementModel } from './../../model/mst-checklist-requirement.model';
import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { MstChecklistModel } from './../../model/mst-checklist.model';

import { MstChecklistRequirementsService } from './../../service/mst-checklist-requirements/mst-checklist-requirements.service';
import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { MstChecklistService } from './../../service/mst-checklist/mst-checklist.service';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationDeleteComponent } from './../confirmation-delete/confirmation-delete.component';
import { SetupChecklistRequirementDetailComponent } from './../../component/setup-checklist-requirement-detail/setup-checklist-requirement-detail.component';

import { PrintPdfChecklistComponent } from './../../component/print-pdf-checklist/print-pdf-checklist.component';


import { MstUserRights } from './../../model/mst-user-rights.model';
import { MstUserRightsService } from './../../service/mst-user-rights/mst-user-rights.service';
@Component({
  selector: 'app-setup-checklist-detail',
  templateUrl: './setup-checklist-detail.component.html',
  styleUrls: ['./setup-checklist-detail.component.css']
})
export class SetupChecklistDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mstChecklistRequirementService: MstChecklistRequirementsService,
    private sysDropdownService: SysDropdownService,
    private mstChecklistService: MstChecklistService,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog,
    private setupChecklistRequirementDetailDialog: MatDialog,
    private printPdfChecklistDialog: MatDialog,
    private mstUserRightsService: MstUserRightsService,
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;
  public isPageForbidden: boolean = false;

  public mstChecklistModel: MstChecklistModel = new MstChecklistModel();
  public mstChecklistRequirementModel: MstChecklistRequirementModel[] = [];
  public sysDropdownModel: SysDropdownModel[] = [];
  public mstUserRights: MstUserRights = new MstUserRights();

  public isChecklistSaveButtonDisabled: boolean = false;
  public isChecklistLockButtonDisabled: boolean = false;
  public isChecklistUnlockButtonDisabled: boolean = false;
  public isChecklistPrintButtonDisabled: boolean = false;

  public checklistDate: Date = new Date();

  public checklistRequirementDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'RequirementNo',
    'Requirement',
    'Category',
    'Type',
    'WithAttachments',
    'Space'
  ];

  public checklistRequirementDataSource: MatTableDataSource<MstChecklistRequirementModel>;
  public checklistRequirementData: MstChecklistRequirementModel[] = []

  @ViewChild('checklistRequirementPaginator') public checklistRequirementPaginator: MatPaginator;
  @ViewChild('checklistRequirementSort') public checklistRequirementSort: MatSort;

  public isButtonAddChecklistRequirementDisabled: boolean = false;

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

            this.getChecklistRequirementData();

            this.isLockedButtons(this.mstChecklistModel.IsLocked);
          }
        }, 500);

      }
    );
  }

  public checklstDateDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.mstChecklistModel.ChecklistDate = this.checklistDate.toString();
  }

  public disabledButtons(): void {
    this.isChecklistSaveButtonDisabled = true;
    this.isChecklistLockButtonDisabled = true;
    this.isChecklistUnlockButtonDisabled = true;
    this.isChecklistPrintButtonDisabled = true;
  }

  public isLockedButtons(isLocked: boolean): void {
    this.isChecklistSaveButtonDisabled = isLocked;
    this.isChecklistLockButtonDisabled = isLocked;
    this.isChecklistUnlockButtonDisabled = !isLocked;
    this.isChecklistPrintButtonDisabled = !isLocked;
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

  public buttonPrintChecklist(): void {
    if (this.mstChecklistModel.IsLocked == false) {
      this.toastr.error("Cannot print an unlocked record.", 'Print Failed');
    } else {
      const openDialog = this.printPdfChecklistDialog.open(PrintPdfChecklistComponent, {
        width: '1200px',
        data: {
          dialogTitle: "Print Checklist",
          dialogData: this.mstChecklistModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

      });
    }
  }

  public getChecklistRequirementData(): void {
    this.checklistRequirementData = [];
    this.checklistRequirementDataSource = new MatTableDataSource(this.checklistRequirementData);
    this.checklistRequirementDataSource.paginator = this.checklistRequirementPaginator;
    this.checklistRequirementDataSource.sort = this.checklistRequirementSort;

    this.mstChecklistRequirementService.getChecklistRequirementListPerProject(this.mstChecklistModel.Id).subscribe(
      data => {
        if (data.length > 0) {
          this.checklistRequirementData = data;
          this.checklistRequirementDataSource = new MatTableDataSource(this.checklistRequirementData);
          this.checklistRequirementDataSource.paginator = this.checklistRequirementPaginator;
          this.checklistRequirementDataSource.sort = this.checklistRequirementSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public checklistRequirementFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.checklistRequirementDataSource.filter = filterValue.trim().toLowerCase();

    if (this.checklistRequirementDataSource.paginator) {
      this.checklistRequirementDataSource.paginator.firstPage();
    }
  }

  public buttonAddChecklistRequirement(): void {
    if (this.mstChecklistModel.IsLocked == true) {
      this.toastr.error("Cannot edit a locked record.", 'Edit Failed');
    } else {
      let mstChecklistRequirementModel: MstChecklistRequirementModel = {
        Id: 0,
        ChecklistId: this.mstChecklistModel.Id,
        Checklist: this.mstChecklistModel.Checklist,
        RequirementNo: "",
        Requirement: "",
        Category: "",
        Type: "",
        WithAttachments: false
      };

      const openDialog = this.setupChecklistRequirementDetailDialog.open(SetupChecklistRequirementDetailComponent, {
        width: '550px',
        data: {
          dialogTitle: "Add Checklist Requirement",
          dialogData: mstChecklistRequirementModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {
        if (result != null) {
          this.getChecklistRequirementData();
        }
      });
    }
  }

  public buttonEditChecklistRequirement(currentData: any): void {
    if (this.mstChecklistModel.IsLocked == true) {
      this.toastr.error("Cannot edit a locked record.", 'Edit Failed');
    } else {
      let id = currentData.Id;

      let mstChecklistRequirementModel: MstChecklistRequirementModel = {
        Id: id,
        ChecklistId: this.mstChecklistModel.Id,
        Checklist: this.mstChecklistModel.Checklist,
        RequirementNo: "",
        Requirement: "",
        Category: "",
        Type: "",
        WithAttachments: false
      };

      const openDialog = this.setupChecklistRequirementDetailDialog.open(SetupChecklistRequirementDetailComponent, {
        width: '550px',
        data: {
          dialogTitle: "Edit Checklist Requirement",
          dialogData: mstChecklistRequirementModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {
        if (result != null) {
          this.getChecklistRequirementData();
        }
      });
    }
  }

  public buttonDeleteChecklistRequirement(currentData: any): void {
    if (this.mstChecklistModel.IsLocked == true) {
      this.toastr.error("Cannot delete a locked record.", 'Delete Failed');
    } else {
      let id = currentData.Id;

      const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
        width: '450px',
        data: {
          dialogDeleteTitle: "Delete Checklist Requirement",
          dialogDeleteMessage: "Are you sure you want to delete this check list requirement " + currentData.Requirement + "?",
          dialogDeleteId: id
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

        if (result != null) {
          this.mstChecklistRequirementService.deleteChecklistRequirement(result).subscribe(
            data => {

              if (data[0] == true) {
                this.toastr.success('Checklist requirement was successfully deleted!', 'Delete Successful');
                this.getChecklistRequirementData();
              } else {
                this.toastr.error(data[1], 'Delete Failed');
              }

            }
          );
        }
      });
    }
  }

  ngOnInit(): void {
    this.mstUserRights = {
      Id: 0,
      UserId: 0,
      PageId: 0,
      Page: "",
      PageURL: "",
      CanEdit: true,
      CanSave: true,
      CanLock: true,
      CanUnLock: true,
      CanPrint: true,
      CanDelete: true
    }

    this.mstUserRightsService.getUserRightPerCurrentUser("CHECKLIST DETAIL").subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstUserRights.Id = data.Id;
            this.mstUserRights.UserId = data.UserId;
            this.mstUserRights.PageId = data.PageId;
            this.mstUserRights.Page = data.Page;
            this.mstUserRights.PageURL = data.PageURL;
            this.mstUserRights.CanEdit = data.CanEdit;
            this.mstUserRights.CanSave = data.CanSave;
            this.mstUserRights.CanLock = data.CanLock;
            this.mstUserRights.CanUnLock = data.CanUnLock;
            this.mstUserRights.CanPrint = data.CanPrint;
            this.mstUserRights.CanDelete = data.CanDelete;

            if (data.CanEdit == false && data.CanDelete == false) {
              this.checklistRequirementDisplayedColumns = [
                'RequirementNo',
                'Requirement',
                'Category',
                'Type',
                'WithAttachments',
                'Space'
              ];
            } else {
              if (data.CanEdit == false) {
                this.checklistRequirementDisplayedColumns = [
                  'ButtonDelete',
                  'RequirementNo',
                  'Requirement',
                  'Category',
                  'Type',
                  'WithAttachments',
                  'Space'
                ];
              } else if (data.CanDelete == false) {
                this.checklistRequirementDisplayedColumns = [
                  'ButtonEdit',
                  'RequirementNo',
                  'Requirement',
                  'Category',
                  'Type',
                  'WithAttachments',
                  'Space'
                ];
              } else {
                this.checklistRequirementDisplayedColumns = [
                  'ButtonEdit',
                  'ButtonDelete',
                  'RequirementNo',
                  'Requirement',
                  'Category',
                  'Type',
                  'WithAttachments',
                  'Space'
                ];
              }
            }

            this.getDropdownList();
          } else {
            this.isSpinnerShow = false;
            this.isPageForbidden = true;
          }
        }, 500);
      }
    );
  }

}
