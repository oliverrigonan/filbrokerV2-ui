import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SysDropdownModel } from './../../model/sys-dropdown.model';
import { MstUserModel } from './../../model/mst-user.model';

import { SysDropdownService } from './../../service/sys-dropdown/sys-dropdown.service';
import { MstUserService } from './../../service/mst-user/mst-user.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-system-user-detail',
  templateUrl: './system-user-detail.component.html',
  styleUrls: ['./system-user-detail.component.css']
})
export class SystemUserDetailComponent implements OnInit {

  constructor(
    private mstUserService: MstUserService,
    private route: ActivatedRoute,
    private router: Router,
    private sysDropdownService: SysDropdownService,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog,
  ) { }


  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public mstUserModel: MstUserModel = new MstUserModel();
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
  ngOnInit(): void {
    this.getDropdownList();
  }
}
