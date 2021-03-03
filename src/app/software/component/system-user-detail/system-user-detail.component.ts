import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { MstUserModel } from './../../model/mst-user.model';
import { MstUserRights } from './../../model/mst-user-rights.model';

import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { MstUserService } from './../../service/mst-user/mst-user.service';
import { MstUserRightsService } from './../../service/mst-user-rights/mst-user-rights.service';

import { ToastrService } from 'ngx-toastr';
import { ConfirmationDeleteComponent } from '../confirmation-delete/confirmation-delete.component';
import { SystemUserRightsDetailComponent } from '../system-user-rights-detail/system-user-rights-detail.component';

@Component({
  selector: 'app-system-user-detail',
  templateUrl: './system-user-detail.component.html',
  styleUrls: ['./system-user-detail.component.css']
})
export class SystemUserDetailComponent implements OnInit {

  constructor(
    private mstUserService: MstUserService,
    private mstUserRightsService: MstUserRightsService,
    private route: ActivatedRoute,
    private router: Router,
    private sysDropdownService: SysDropdownService,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog,
    private setupUserRightsDetailDialog: MatDialog
  ) { }

  public userRightsDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'Page',
    'CanEdit',
    'CanSave',
    'CanLock',
    'CanUnLock',
    'CanPrint',
    'CanDelete',
    'Space'
  ];

  public userRightsDataSource: MatTableDataSource<MstUserRights>;
  public userRightsData: MstUserRights[] = []

  @ViewChild('userRightsPaginator') public userRightsPaginator: MatPaginator;
  @ViewChild('userRightsSort') public userRightsSort: MatSort;

  public isButtonAddHouseModelDisabled: boolean = false;

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public mstUserModel: MstUserModel = new MstUserModel();
  public mstUserRightsModel: MstUserRights = new MstUserRights();
  public sysDropdownModel: SysDropdownModel[] = [];

  public isUserSaveButtonDisabled: boolean = false;
  public isUserLockButtonDisabled: boolean = false;
  public isUserUnlockButtonDisabled: boolean = false;

  public getDropdownList(): void {
    this.sysDropdownService.getDropdownList("USER STATUS").subscribe(
      data => {
        this.sysDropdownModel = data;

        let id = this.route.snapshot.params['id'];
        this.getUserDetail(id);
      }
    );
  }

  public getUserDetail(id: number): void {
    this.mstUserService.getUserDetail(id).subscribe(
      data => {

        setTimeout(() => {
          if (data != null) {
            this.mstUserModel.Id = data.Id;
            this.mstUserModel.Username = data.Username;
            this.mstUserModel.FullName = data.FullName;
            this.mstUserModel.Password = data.Password;
            this.mstUserModel.Status = data.Status;

            this.getUserRightsData();

            this.isSpinnerShow = false;
            this.isContentShow = true;

          }
        }, 500);
      }
    );
  }

  public disabledButtons(): void {
    this.isUserSaveButtonDisabled = true;
    this.isUserLockButtonDisabled = true;
    this.isUserUnlockButtonDisabled = true;
  }

  public isLockedButtons(isLocked: boolean): void {
    this.isUserSaveButtonDisabled = isLocked;
    this.isUserLockButtonDisabled = isLocked;
    this.isUserUnlockButtonDisabled = !isLocked;
  }

  public buttonSaveUser(): void {
    this.disabledButtons();

    this.mstUserService.saveUser(this.mstUserModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('User was successfully saved!', 'Save Successful');
        } else {
          this.toastr.error(data[1], 'Save Failed');
        }

        this.isUserSaveButtonDisabled = false;

        // this.isLockedButtons(this.mstUserModel.IsLocked);
      }
    );
  }
  public buttonLockUser(): void {
    // this.mstUserModel.IsLocked = true;
    this.disabledButtons();

    this.mstUserService.lockUser(this.mstUserModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('User was successfully locked!', 'Lock Successful');
        } else {
          this.toastr.error(data[1], 'Lock Failed');
          // this.mstUserModel.IsLocked = false;
        }

        // this.isLockedButtons(this.mstUserModel.IsLocked);
      }
    );
  }

  public buttonUnlockUser(): void {
    this.disabledButtons();

    this.mstUserService.unlockUser(this.mstUserModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success('User was successfully unlocked!', 'Unlock Successful');
          // this.mstUserModel.IsLocked = false;
        } else {
          this.toastr.error(data[1], 'Unlock Failed');
          // this.mstUserModel.IsLocked = true;
        }

        // this.isLockedButtons(this.mstUserModel.IsLocked);
      }
    );
  }

  public getUserRightsData(): void {
    this.userRightsData = [];
    this.userRightsDataSource = new MatTableDataSource(this.userRightsData);
    this.userRightsDataSource.paginator = this.userRightsPaginator;
    this.userRightsDataSource.sort = this.userRightsSort;

    this.mstUserRightsService.getUserRightsListPerUser(this.mstUserModel.Id).subscribe(
      data => {
        if (data.length > 0) {
          this.userRightsData = data;
          this.userRightsDataSource = new MatTableDataSource(this.userRightsData);
          this.userRightsDataSource.paginator = this.userRightsPaginator;
          this.userRightsDataSource.sort = this.userRightsSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public buttonAddUserRights(): void {
    // if (this.mstUserRightsModel.IsLocked == true) {
    //   this.toastr.error("Cannot edit a locked record.", 'Edit Failed');
    // } else {
    let mstUserRightsModel: MstUserRights = {
      Id: 0,
      UserId: this.mstUserModel.Id,
      Page: "",
      PageId: 0,
      PageURL: "",
      CanEdit: false,
      CanSave: false,
      CanLock: false,
      CanUnLock: false,
      CanPrint: false,
      CanDelete: false,
    };

    const openDialog = this.setupUserRightsDetailDialog.open(SystemUserRightsDetailComponent, {
      width: '550px',
      data: {
        dialogTitle: "Add User Rights",
        dialogData: mstUserRightsModel
      },
      disableClose: true
    });

    openDialog.afterClosed().subscribe(result => {
      if (result != null) {
        this.getUserRightsData();
      }
    });
  }
  // }

  public buttonEditUserRights(currentData: any): void {
    // if (this.mstUserRightsModel.IsLocked == true) {
    //   this.toastr.error("Cannot edit a locked record.", 'Edit Failed');
    // } else {
    let id = currentData.Id;

    let mstUserRightsModel: MstUserRights = {
      Id: id,
      UserId: this.mstUserRightsModel.UserId,
      Page: this.mstUserRightsModel.Page,
      PageId: this.mstUserRightsModel.PageId,
      PageURL: "",
      CanEdit: false,
      CanSave: false,
      CanLock: false,
      CanUnLock: false,
      CanPrint: false,
      CanDelete: false,
    };

    const openDialog = this.setupUserRightsDetailDialog.open(SystemUserRightsDetailComponent, {
      width: '550px',
      data: {
        dialogTitle: "Edit User Rights",
        dialogData: mstUserRightsModel
      },
      disableClose: true
    });

    openDialog.afterClosed().subscribe(result => {
      if (result != null) {
        this.getUserRightsData();
      }
    });
  }
  // }


  public buttonDeleteUserRights(currentData: any): void {
    // if (this.mstProjectModel.IsLocked == true) {
    //   this.toastr.error("Cannot delete a locked record.", 'Delete Failed');
    // } else {
    let id = currentData.Id;

    const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
      width: '450px',
      data: {
        dialogDeleteTitle: "Delete User Rights",
        dialogDeleteMessage: "Are you sure you want to delete this user rights " + currentData.Page + "?",
        dialogDeleteId: id
      },
      disableClose: true
    });

    openDialog.afterClosed().subscribe(result => {

      if (result != null) {
        this.mstUserRightsService.deleteUserRights(result).subscribe(
          data => {

            if (data[0] == true) {
              this.toastr.success('User Rights was successfully deleted!', 'Delete Successful');
              this.getUserRightsData();
            } else {
              this.toastr.error(data[1], 'Delete Failed');
            }

          }
        );
      }
    });
  }
  // }

  ngOnInit(): void {
    this.getDropdownList();
  }
}
