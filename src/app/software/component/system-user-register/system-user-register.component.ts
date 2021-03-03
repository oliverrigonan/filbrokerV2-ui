import { Component, Inject, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SysUserRegisterModel } from './../../model/sys-user-register.model';
import { SysUserRegisterService } from './../../service/sys-user-register/sys-user-register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-system-user-register',
  templateUrl: './system-user-register.component.html',
  styleUrls: ['./system-user-register.component.css']
})
export class SystemUserRegisterComponent implements OnInit {

  constructor(
    private systemUserRegisterComponent: MatDialogRef<SystemUserRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) private systemUserRegisterComponentData: any,
    private sysUserRegisterService: SysUserRegisterService,
    private toastr: ToastrService,
  ) { }

  public dialogTitle: any = this.systemUserRegisterComponentData.dialogTitle;

  public sysUserRegisterModel: SysUserRegisterModel = new SysUserRegisterModel();
  public isButtonRegisterConfirmationDisabled: boolean = false;

  public buttonRegisterClick(): void {
    this.isButtonRegisterConfirmationDisabled = true;

    this.sysUserRegisterService.registerUser(this.sysUserRegisterModel).subscribe(
      data => {
        if (data[0] == true) {
          this.toastr.success('User was successfully registered!', 'Register Successful');
          this.systemUserRegisterComponent.close(200);
        } else {
          this.toastr.error(data[1], 'Add Failed');
          this.isButtonRegisterConfirmationDisabled = false;
        }
      }
    );
  }

  public buttonCloseClick(): void {
    this.systemUserRegisterComponent.close(null);
  }

  ngOnInit(): void {

  }

}
