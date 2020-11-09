import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { MstProjectModel } from './../../model/mst-project.model';
import { MstHouseModelModel } from './../../model/mst-house-model.model';

import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { MstProjectService } from './../../service/mst-project/mst-project.service';
import { MstHouseModelService } from './../../service/mst-house-model/mst-house-model.service';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationDeleteComponent } from './../confirmation-delete/confirmation-delete.component';
import { SetupHouseModelDetailComponent } from './../../component/setup-house-model-detail/setup-house-model-detail.component';

@Component({
  selector: 'app-setup-project-detail',
  templateUrl: './setup-project-detail.component.html',
  styleUrls: ['./setup-project-detail.component.css']
})
export class SetupProjectDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sysDropdownService: SysDropdownService,
    private mstProjectService: MstProjectService,
    private mstHouseModelService: MstHouseModelService,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog,
    private setupHouseModelDetailDialog: MatDialog
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public mstProjectModel: MstProjectModel = new MstProjectModel();
  public sysDropdownModel: SysDropdownModel[] = [];

  public isProjectSaveButtonDisabled: boolean = false;
  public isProjectLockButtonDisabled: boolean = false;
  public isProjectUnlockButtonDisabled: boolean = false;

  public houseModelDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'HouseModelCode',
    'HouseModel',
    'TFA',
    'Price'
  ];

  public houseModelDataSource: MatTableDataSource<MstHouseModelModel>;
  public houseModelData: MstHouseModelModel[] = []

  @ViewChild('houseModelPaginator') public houseModelPaginator: MatPaginator;
  @ViewChild('houseModelSort') public houseModelSort: MatSort;

  public isButtonAddHouseModelDisabled: boolean = false;

  public getDropdownList(): void {
    this.sysDropdownService.getDropdownList("PROJECT STATUS").subscribe(
      data => {
        this.sysDropdownModel = data;

        let id = this.route.snapshot.params['id'];
        this.getProjectDetail(id);
      }
    );
  }

  public getProjectDetail(id: number): void {
    this.mstProjectService.getProjectDetail(id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstProjectModel.Id = data.Id;
            this.mstProjectModel.ProjectCode = data.ProjectCode;
            this.mstProjectModel.Project = data.Project;
            this.mstProjectModel.Project = data.Project;
            this.mstProjectModel.Address = data.Address;
            this.mstProjectModel.Status = data.Status;
            this.mstProjectModel.ProjectLogo = data.ProjectLogo;
            this.mstProjectModel.IsLocked = data.IsLocked;

            this.isSpinnerShow = false;
            this.isContentShow = true;

            this.getHouseModelData();

            this.isLockedButtons(this.mstProjectModel.IsLocked);
          }
        }, 500);

      }
    );
  }

  public disabledButtons(): void {
    this.isProjectSaveButtonDisabled = true;
    this.isProjectLockButtonDisabled = true;
    this.isProjectUnlockButtonDisabled = true;
  }

  public isLockedButtons(isLocked: boolean): void {
    this.isProjectSaveButtonDisabled = isLocked;
    this.isProjectLockButtonDisabled = isLocked;
    this.isProjectUnlockButtonDisabled = !isLocked;
  }

  public buttonSaveProject(): void {
    this.disabledButtons();

    this.mstProjectService.saveProject(this.mstProjectModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Project was successfully saved!', 'Save Successful');
        } else {
          this.toastr.error(data[1], 'Save Failed');
        }

        this.isLockedButtons(this.mstProjectModel.IsLocked);
      }
    );
  }

  public buttonLockProject(): void {
    this.mstProjectModel.IsLocked = true;
    this.disabledButtons();

    this.mstProjectService.lockProject(this.mstProjectModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Project was successfully locked!', 'Lock Successful');
        } else {
          this.toastr.error(data[1], 'Lock Failed');
          this.mstProjectModel.IsLocked = false;
        }

        this.isLockedButtons(this.mstProjectModel.IsLocked);
      }
    );
  }

  public buttonUnlockProject(): void {
    this.disabledButtons();

    this.mstProjectService.unlockProject(this.mstProjectModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('Project was successfully unlocked!', 'Unlock Successful');
          this.mstProjectModel.IsLocked = false;
        } else {
          this.toastr.error(data[1], 'Unlock Failed');
          this.mstProjectModel.IsLocked = true;
        }

        this.isLockedButtons(this.mstProjectModel.IsLocked);
      }
    );
  }

  public getHouseModelData(): void {
    this.houseModelData = [];
    this.houseModelDataSource = new MatTableDataSource(this.houseModelData);
    this.houseModelDataSource.paginator = this.houseModelPaginator;
    this.houseModelDataSource.sort = this.houseModelSort;

    this.mstHouseModelService.getHouseModelListPerProject(this.mstProjectModel.Id).subscribe(
      data => {
        if (data.length > 0) {
          this.houseModelData = data;
          this.houseModelDataSource = new MatTableDataSource(this.houseModelData);
          this.houseModelDataSource.paginator = this.houseModelPaginator;
          this.houseModelDataSource.sort = this.houseModelSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public houseModelFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.houseModelDataSource.filter = filterValue.trim().toLowerCase();

    if (this.houseModelDataSource.paginator) {
      this.houseModelDataSource.paginator.firstPage();
    }
  }

  public buttonAddHouseModel(): void {
    if (this.mstProjectModel.IsLocked == true) {
      this.toastr.error("Cannot edit a locked record.", 'Edit Failed');
    } else {
      let mstHouseModelModel: MstHouseModelModel = {
        Id: 0,
        HouseModelCode: "",
        HouseModel: "",
        ProjectId: this.mstProjectModel.Id,
        Project: this.mstProjectModel.Project,
        TFA: 0,
        Price: 0,
        IsLocked: false
      };

      const openDialog = this.setupHouseModelDetailDialog.open(SetupHouseModelDetailComponent, {
        width: '550px',
        data: {
          dialogTitle: "Add House Model",
          dialogData: mstHouseModelModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {
        if (result != null) {
          this.getHouseModelData();
        }
      });
    }
  }

  public buttonEditHouseModel(currentData: any): void {
    if (this.mstProjectModel.IsLocked == true) {
      this.toastr.error("Cannot edit a locked record.", 'Edit Failed');
    } else {
      let id = currentData.Id;

      let mstHouseModelModel: MstHouseModelModel = {
        Id: id,
        HouseModelCode: "",
        HouseModel: "",
        ProjectId: this.mstProjectModel.Id,
        Project: this.mstProjectModel.Project,
        TFA: 0,
        Price: 0,
        IsLocked: false
      };

      const openDialog = this.setupHouseModelDetailDialog.open(SetupHouseModelDetailComponent, {
        width: '550px',
        data: {
          dialogTitle: "Edit House Model",
          dialogData: mstHouseModelModel
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {
        if (result != null) {
          this.getHouseModelData();
        }
      });
    }
  }

  public buttonDeleteHouseModel(currentData: any): void {
    if (this.mstProjectModel.IsLocked == true) {
      this.toastr.error("Cannot delete a locked record.", 'Delete Failed');
    } else {
      let id = currentData.Id;

      const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
        width: '450px',
        data: {
          dialogDeleteTitle: "Delete House Model",
          dialogDeleteMessage: "Are you sure you want to delete this house model " + currentData.HouseModel + "?",
          dialogDeleteId: id
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

        if (result != null) {
          this.mstHouseModelService.deleteHouseModel(result).subscribe(
            data => {

              if (data[0] == true) {
                this.toastr.success('House model was successfully deleted!', 'Delete Successful');
                this.getHouseModelData();
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
    this.getDropdownList();
  }
}
