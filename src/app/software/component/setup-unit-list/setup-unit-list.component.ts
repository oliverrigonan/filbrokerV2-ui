import { Component, OnInit, ViewChild, Inject, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MstProjectModel } from './../../model/mst-project.model';
import { MstUnitModel } from './../../model/mst-unit.model';

import { MstProjectService } from './../../service/mst-project/mst-project.service';
import { MstUnitService } from './../../service/mst-unit/mst-unit.service';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationDeleteComponent } from './../confirmation-delete/confirmation-delete.component';

import { MstUserRights } from './../../model/mst-user-rights.model';
import { MstUserRightsService } from './../../service/mst-user-rights/mst-user-rights.service';

@Component({
  selector: 'app-setup-unit-list',
  templateUrl: './setup-unit-list.component.html',
  styleUrls: ['./setup-unit-list.component.css']
})
export class SetupUnitListComponent implements OnInit {

  public unitDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'UnitCode',
    'HouseModel',
    'UnitPrice',
    'FloorArea',
    'Status',
    'IsLocked',
    'Space'
  ];

  public unitDataSource: MatTableDataSource<MstUnitModel>;
  public unitData: MstUnitModel[] = []

  @ViewChild('unitPaginator') public unitPaginator: MatPaginator;
  @ViewChild('unitSort') public unitSort: MatSort;

  public isButtonAddUnitDisabled: boolean = false;

  constructor(
    private mstProjectService: MstProjectService,
    private mstUnitService: MstUnitService,
    private router: Router,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog,
    public decimalPipe: DecimalPipe,
    private mstUserRightsService: MstUserRightsService,
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;
  public isPageForbidden: boolean = false;

  public selectedProjectId: number = 0;
  public mstProjectModel: MstProjectModel[] = [];
  public mstUserRights: MstUserRights = new MstUserRights();


  public getProjectList(): void {
    this.mstProjectService.getProjectList().subscribe(
      data => {
        this.selectedProjectId = data[0].Id;
        this.mstProjectModel = data;

        this.getUnitData();
      }
    );
  }

  public projectSelectionChange(event: EventEmitter<MatSelectChange>): void {
    this.getUnitData();
  }

  public getUnitData(): void {
    this.unitData = [];
    this.unitDataSource = new MatTableDataSource(this.unitData);
    this.unitDataSource.paginator = this.unitPaginator;
    this.unitDataSource.sort = this.unitSort;

    this.mstUnitService.getUnitListPerProject(this.selectedProjectId).subscribe(
      data => {
        if (data.length > 0) {
          this.unitData = data;
          this.unitDataSource = new MatTableDataSource(this.unitData);
          this.unitDataSource.paginator = this.unitPaginator;
          this.unitDataSource.sort = this.unitSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public unitFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.unitDataSource.filter = filterValue.trim().toLowerCase();

    if (this.unitDataSource.paginator) {
      this.unitDataSource.paginator.firstPage();
    }
  }

  public buttonAddUnit(): void {
    this.isButtonAddUnitDisabled = true;

    let mstUnitModel: MstUnitModel = {
      Id: 0,
      UnitCode: "",
      Block: "",
      Lot: "",
      ProjectId: this.selectedProjectId,
      Project: "NA",
      HouseModelId: 0,
      HouseModel: "NA",
      TLA: 0,
      TFA: 0,
      Price: 0,
      TSP: 0,
      MiscellaneousFeeRate: 5,
      MiscellaneousFeeAmount: 0,
      VATRate: 12,
      VATAmount: 0,
      Status: "OPEN",
      IsLocked: false
    };

    this.mstUnitService.addUnit(mstUnitModel).subscribe(
      data => {

        if (data[0] == true) {
          if (data[1] > 0) {
            this.toastr.success('Unit was successfully added!', 'Add Successful');

            setTimeout(() => {
              this.router.navigate(['/software/setup-unit-detail/' + data[1]]);
            }, 500);
          } else {
            this.toastr.error('Somethings went wrong!', 'Add Failed');
            this.isButtonAddUnitDisabled = false;
          }
        } else {
          this.toastr.error(data[1], 'Add Failed');
          this.isButtonAddUnitDisabled = false;
        }

      }
    );
  }

  public buttonEditUnit(currentData: any): void {
    let id = currentData.Id;
    this.router.navigate(['/software/setup-unit-detail/' + id]);
  }

  public buttonDeleteUnit(currentData: any): void {
    if (currentData.IsLocked == true) {
      this.toastr.error("Cannot delete a locked record.", 'Delete Failed');
    } else {
      let id = currentData.Id;

      const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
        width: '450px',
        data: {
          dialogDeleteTitle: "Delete Unit",
          dialogDeleteMessage: "Are you sure you want to delete this unit code " + currentData.UnitCode + "?",
          dialogDeleteId: id
        },
        disableClose: true
      });

      openDialog.afterClosed().subscribe(result => {

        if (result != null) {
          this.isSpinnerShow = true;
          this.isContentShow = false;

          this.mstUnitService.deleteUnit(result).subscribe(
            data => {

              if (data[0] == true) {
                this.toastr.success('Unit was successfully deleted!', 'Delete Successful');
                this.getUnitData();
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

    this.mstUserRightsService.getUserRightPerCurrentUser("CHECKLIST").subscribe(
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
              this.unitDisplayedColumns = [
                'UnitCode',
                'HouseModel',
                'UnitPrice',
                'FloorArea',
                'Status',
                'IsLocked',
                'Space'
              ];
            } else {
              if (data.CanEdit == false) {
                this.unitDisplayedColumns = [
                  'ButtonDelete',
                  'UnitCode',
                  'HouseModel',
                  'UnitPrice',
                  'FloorArea',
                  'Status',
                  'IsLocked',
                  'Space'
                ];
              } else if (data.CanDelete == false) {
                this.unitDisplayedColumns = [
                  'ButtonEdit',
                  'UnitCode',
                  'HouseModel',
                  'UnitPrice',
                  'FloorArea',
                  'Status',
                  'IsLocked',
                  'Space'
                ];
              } else {
                this.unitDisplayedColumns = [
                  'ButtonEdit',
                  'ButtonDelete',
                  'UnitCode',
                  'HouseModel',
                  'UnitPrice',
                  'FloorArea',
                  'Status',
                  'IsLocked',
                  'Space'
                ];
              }
            }
            this.getProjectList();
          } else {
            this.isSpinnerShow = false;
            this.isPageForbidden = true;
          }
        }, 500);
      }
    );
  }
}
