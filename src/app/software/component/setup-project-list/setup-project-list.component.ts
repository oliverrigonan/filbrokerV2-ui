import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MstProjectModel } from './../../model/mst-project.model';
import { MstProjectService } from './../../service/mst-project/mst-project.service';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationDeleteComponent } from './../confirmation-delete/confirmation-delete.component';

@Component({
  selector: 'app-setup-project-list',
  templateUrl: './setup-project-list.component.html',
  styleUrls: ['./setup-project-list.component.css']
})
export class SetupProjectListComponent implements OnInit {

  public projectDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'ProjectCode',
    'Project',
    'Address',
    'Status',
    'IsLocked',
    'Space'
  ];

  public projectDataSource: MatTableDataSource<MstProjectModel>;
  public projectData: MstProjectModel[] = []

  @ViewChild('projectPaginator') public projectPaginator: MatPaginator;
  @ViewChild('projectSort') public projectSort: MatSort;

  public isButtonAddProjectDisabled: boolean = false;

  constructor(
    private mstProjectService: MstProjectService,
    private router: Router,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public getProjectData(): void {
    this.projectData = [];
    this.projectDataSource = new MatTableDataSource(this.projectData);
    this.projectDataSource.paginator = this.projectPaginator;
    this.projectDataSource.sort = this.projectSort;

    this.mstProjectService.getProjectList().subscribe(
      data => {
        if (data.length > 0) {
          this.projectData = data;
          this.projectDataSource = new MatTableDataSource(this.projectData);
          this.projectDataSource.paginator = this.projectPaginator;
          this.projectDataSource.sort = this.projectSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public projectFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectDataSource.filter = filterValue.trim().toLowerCase();

    if (this.projectDataSource.paginator) {
      this.projectDataSource.paginator.firstPage();
    }
  }

  public buttonAddProject(): void {
    this.isButtonAddProjectDisabled = true;

    let mstProjectModel: MstProjectModel = {
      Id: 0,
      ProjectCode: "",
      Project: "",
      Address: "",
      Status: "OPEN",
      ProjectLogo: "NA",
      IsLocked: false
    };

    this.mstProjectService.addProject(mstProjectModel).subscribe(
      data => {

        if (data[0] == true) {
          if (data[1] > 0) {
            this.toastr.success('Project was successfully added!', 'Add Successful');

            setTimeout(() => {
              this.router.navigate(['/software/setup-project-detail/' + data[1]]);
            }, 500);
          } else {
            this.toastr.error('Somethings went wrong!', 'Add Failed');
            this.isButtonAddProjectDisabled = false;
          }
        } else {
          this.toastr.error(data[1], 'Add Failed');
          this.isButtonAddProjectDisabled = false;
        }

      }
    );
  }

  public buttonEditProject(currentData: any): void {
    let id = currentData.Id;
    this.router.navigate(['/software/setup-project-detail/' + id]);
  }

  public buttonDeleteProject(currentData: any): void {
    if (currentData.IsLocked == true) {
      this.toastr.error("Cannot delete a locked record.", 'Delete Failed');
    } else {
      let id = currentData.Id;

      const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
        width: '450px',
        data: {
          dialogDeleteTitle: "Delete Project",
          dialogDeleteMessage: "Are you sure you want to delete this project " + currentData.Project + "?",
          dialogDeleteId: id
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

        if (result != null) {
          this.isSpinnerShow = true;
          this.isContentShow = false;

          this.mstProjectService.deleteProject(result).subscribe(
            data => {

              if (data[0] == true) {
                this.toastr.success('Project was successfully deleted!', 'Delete Successful');
                this.getProjectData();
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
    this.getProjectData();
  }
}
