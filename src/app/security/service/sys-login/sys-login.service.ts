import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from "rxjs";
import { AppSettings } from './../../../app-settings';
import { SysLoginModel } from './../../model/sys-login.model';

@Injectable({
  providedIn: 'root'
})
export class SysLoginService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;
  public options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public login(sysLoginModel: SysLoginModel): Observable<[boolean, string]> {
    return new Observable<[boolean, string]>((observer) => {
      let url = this.defaultAPIURLHost + '/token';
      let body = "username=" + sysLoginModel.Username + "&password=" + sysLoginModel.Password + "&grant_type=password";
      let options = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };

      this.httpClient.post(url, body, options).subscribe(
        response => {
          let results = response;

          localStorage.setItem('access_token', results["access_token"]);
          localStorage.setItem('expires_in', results["expires_in"]);
          localStorage.setItem('token_type', results["token_type"]);
          localStorage.setItem('username', results["userName"]);

          observer.next([true, ""]);
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
