import { Component, OnInit, ViewChild, Inject, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MstProjectModel } from './../../model/mst-project.model';
import { MstChecklistModel } from './../../model/mst-checklist.model';

import { MstProjectService } from './../../service/mst-project/mst-project.service';
import { MstChecklistService } from './../../service/mst-checklist/mst-checklist.service';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationDeleteComponent } from './../confirmation-delete/confirmation-delete.component';

@Component({
  selector: 'app-setup-checklist-list',
  templateUrl: './setup-checklist-list.component.html',
  styleUrls: ['./setup-checklist-list.component.css']
})
export class SetupChecklistListComponent implements OnInit {

  public checklistDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'ChecklistCode',
    'Checklist',
    'ChecklistDate',
    'Remarks',
    'Status',
    'IsLocked',
    'Space'
  ];

  public checklistDataSource: MatTableDataSource<MstChecklistModel>;
  public checklistData: MstChecklistModel[] = []

  @ViewChild('checklistPaginator') public checklistPaginator: MatPaginator;
  @ViewChild('checklistSort') public checklistSort: MatSort;

  public isButtonAddChecklistDisabled: boolean = false;

  constructor(
    private mstProjectService: MstProjectService,
    private mstChecklistService: MstChecklistService,
    private router: Router,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public selectedProjectId: number = 0;
  public mstProjectModel: MstProjectModel[] = [];

  public getProjectList(): void {
    this.mstProjectService.getProjectList().subscribe(
      data => {
        this.selectedProjectId = data[0].Id;
        this.mstProjectModel = data;

        this.getChecklistData();
      }
    );
  }

  public projectSelectionChange(event: EventEmitter<MatSelectChange>): void {
    this.getChecklistData();
  }

  public getChecklistData(): void {
    this.checklistData = [];
    this.checklistDataSource = new MatTableDataSource(this.checklistData);
    this.checklistDataSource.paginator = this.checklistPaginator;
    this.checklistDataSource.sort = this.checklistSort;

    this.mstChecklistService.getChecklistListPerProject(this.selectedProjectId).subscribe(
      data => {
        if (data.length > 0) {
          this.checklistData = data;
          this.checklistDataSource = new MatTableDataSource(this.checklistData);
          this.checklistDataSource.paginator = this.checklistPaginator;
          this.checklistDataSource.sort = this.checklistSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public checklistFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.checklistDataSource.filter = filterValue.trim().toLowerCase();

    if (this.checklistDataSource.paginator) {
      this.checklistDataSource.paginator.firstPage();
    }
  }

  public buttonAddChecklist(): void {
    this.isButtonAddChecklistDisabled = true;

    let currentDate = new Date();

    let mstChecklistModel: MstChecklistModel = {
      Id: 0,
      ChecklistCode: "",
      Checklist: "",
      ChecklistDate: currentDate.toLocaleDateString(),
      ProjectId: this.selectedProjectId,
      Project: "NA",
      Remarks: "NA",
      Status: "ACTIVE",
      IsLocked: false
    };

    this.mstChecklistService.addChecklist(mstChecklistModel).subscribe(
      data => {

        if (data[0] == true) {
          if (data[1] > 0) {
            this.toastr.success('Checklist was successfully added!', 'Add Successful');

            setTimeout(() => {
              this.router.navigate(['/software/setup-checklist-detail/' + data[1]]);
            }, 500);
          } else {
            this.toastr.error('Somethings went wrong!', 'Add Failed');
            this.isButtonAddChecklistDisabled = false;
          }
        } else {
          this.toastr.error(data[1], 'Add Failed');
          this.isButtonAddChecklistDisabled = false;
        }

      }
    );
  }

  public buttonEditChecklist(currentData: any): void {
    let id = currentData.Id;
    this.router.navigate(['/software/setup-checklist-detail/' + id]);
  }

  public buttonDeleteChecklist(currentData: any): void {
    if (currentData.IsLocked == true) {
      this.toastr.error("Cannot delete a locked record.", 'Delete Failed');
    } else {
      let id = currentData.Id;

      const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
        width: '450px',
        data: {
          dialogDeleteTitle: "Delete Checklist",
          dialogDeleteMessage: "Are you sure you want to delete this checklist " + currentData.Checklist + "?",
          dialogDeleteId: id
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

        if (result != null) {
          this.isSpinnerShow = true;
          this.isContentShow = false;

          this.mstChecklistService.deleteChecklist(result).subscribe(
            data => {

              if (data[0] == true) {
                this.toastr.success('Checklist was successfully deleted!', 'Delete Successful');
                this.getChecklistData();
              } else {
                this.toastr.error(data[1], 'Delete Failed');

                this.isSpinnerShow = false;
                this.isContentShow = true;
              }

            }
          );
        }
      });
    }
  }

  ngOnInit(): void {
    this.getProjectList();
  }
}
