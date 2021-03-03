import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MstUserModel } from './../../model/mst-user.model';
import { MstUserService } from './../../service/mst-user/mst-user.service';

import { ToastrService } from 'ngx-toastr';

import { ConfirmationDeleteComponent } from './../confirmation-delete/confirmation-delete.component';
import { SystemUserRegisterComponent } from './../system-user-register/system-user-register.component';

@Component({
  selector: 'app-system-user-list',
  templateUrl: './system-user-list.component.html',
  styleUrls: ['./system-user-list.component.css']
})
export class SystemUserListComponent implements OnInit {

  public userDisplayedColumns: string[] = [
    'ButtonEdit',
    'Username',
    'FullName',
    'Status',
    'Space'
  ];

  public userDataSource: MatTableDataSource<MstUserModel>;
  public userData: MstUserModel[] = []

  @ViewChild('userPaginator') public userPaginator: MatPaginator;
  @ViewChild('userSort') public userSort: MatSort;

  public isButtonAddUserDisabled: boolean = false;

  constructor(private mstUserService: MstUserService,
    private router: Router,
    private toastr: ToastrService,
    private confirmationDeleteDialog: MatDialog,
    private systemUserRegisterDialog: MatDialog
  ) { }

  public isSpinnerShow: boolean = true;
  public isContentShow: boolean = false;

  public geUserData(): void {
    this.userData = [];
    this.userDataSource = new MatTableDataSource(this.userData);
    this.userDataSource.paginator = this.userPaginator;
    this.userDataSource.sort = this.userSort;

    this.mstUserService.getUserList().subscribe(
      data => {
        if (data.length > 0) {
          this.userData = data;
          this.userDataSource = new MatTableDataSource(this.userData);
          this.userDataSource.paginator = this.userPaginator;
          this.userDataSource.sort = this.userSort;
        }

        this.isSpinnerShow = false;
        this.isContentShow = true;
      }
    );
  }

  public userFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase();

    if (this.userDataSource.paginator) {
      this.userDataSource.paginator.firstPage();
    }
  }

  public buttonAddUser(): void {
    const openDialog = this.systemUserRegisterDialog.open(SystemUserRegisterComponent, {
      width: '550px',
      data: {
        dialogTitle: "Register"
      },
      disableClose: true
    });

    openDialog.afterClosed().subscribe(result => {
      if (result != null) {
        this.geUserData();
      }
    });
  }

  public buttonEditUser(currentData: any): void {
    let id = currentData.Id;
    this.router.navigate(['/software/system-user-detail/' + id]);
  }

  public buttonDeleteUser(currentData: any): void {
    let id = currentData.Id;

    const openDialog = this.confirmationDeleteDialog.open(ConfirmationDeleteComponent, {
      width: '450px',
      data: {
        dialogDeleteTitle: "Delete User",
        dialogDeleteMessage: "Are you sure you want to delete this user " + currentData.Username + "?",
        dialogDeleteId: id
      },
      disableClose: true
    });

    openDialog.afterClosed().subscribe(result => {

      if (result != null) {
        this.isSpinnerShow = true;
        this.isContentShow = false;

        this.mstUserService.deleteUser(result).subscribe(
          data => {

            if (data[0] == true) {
              this.toastr.success('User was successfully deleted!', 'Delete Successful');
              this.geUserData();
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

  ngOnInit(): void {
    this.geUserData();
  }
}
