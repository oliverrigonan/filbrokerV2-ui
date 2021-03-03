import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { SysUserRegisterModel } from './../../model/sys-user-register.model';

@Injectable({
  providedIn: 'root'
})
export class SysUserRegisterService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;
  public options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  };

  public registerUser(sysUserRegisterModel: SysUserRegisterModel): Observable<[boolean, any]> {
    return new Observable<[boolean, any]>((observer) => {
      let regObj = {
        FullName: sysUserRegisterModel.FullName,
        UserName: sysUserRegisterModel.Username,
        Email: sysUserRegisterModel.Username,
        Password: sysUserRegisterModel.Password,
        ConfirmPassword: sysUserRegisterModel.ConfirmPassword
      }

      this.httpClient.post(this.defaultAPIURLHost + "/api/account/register", JSON.stringify(regObj), this.options).subscribe(
        response => {
          let id = response;

          observer.next([true, id]);
          observer.complete();
        },
        error => {
          observer.next([false, error.error]);
          observer.complete();
        }
      );
    });
  }
}
