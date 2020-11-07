import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SysLoginService } from '../../service/sys-login/sys-login.service';
import { SysLoginModel } from './../../model/sys-login.model';
import { AppSettings } from './../../../app-settings';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-system-login',
  templateUrl: './system-login.component.html',
  styleUrls: ['./system-login.component.css']
})
export class SystemLoginComponent implements OnInit {

  constructor(
    private sysLoginService: SysLoginService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  public sysLoginModel: SysLoginModel = {
    Username: "",
    Password: ""
  };

  public disabled: boolean = false;

  public login(): void {
    this.disabled = true;

    this.sysLoginService.login(this.sysLoginModel).subscribe(
      data => {

        if (data[0] == true) {
          this.toastr.success("Login Successful", 'Login');
          setTimeout(() => {
            this.router.navigate(['/software']);
          }, 500);
        } else {
          this.toastr.error(data[1], 'Login');
          this.disabled = false;
        }

      }
    );
  }

  ngOnInit(): void {

  }

}
